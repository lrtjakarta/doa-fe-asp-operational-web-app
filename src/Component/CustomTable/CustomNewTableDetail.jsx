import {
	Box,
	Table,
	TableRow,
	styled,
	TableCell,
	TableHead,
	TableBody,
	Stack,
	useTheme,
	TableContainer,
} from '@mui/material';
import React, { useMemo } from 'react';
import {
	useGlobalFilter,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable,
} from 'react-table';

const HeadTableCell = styled(TableCell)(({ theme }) => ({
	fontSize: '15px',
	// fontWeight: 600,
	color: '#35405B',
	'&:first-of-type': {
		paddingLeft: 24,
	},
	'&:last-of-type': {
		paddingRight: 24,
		textAlign: 'left',
	},
}));

const BodyTableCell = styled(HeadTableCell)(({ theme }) => ({
	color: '#333333',
	fontSize: 14,
	fontWeight: 400,
	// borderBottom: `1px solid ${theme.palette.divider}`
}));

function CustomNewTable(props) {
	const theme = useTheme();
	const { data, rowClick, showFooter, columnShape, hidePagination, status } =
		props;
	const tableData = useMemo(() => data, [data]);
	const columns = useMemo(() => columnShape, [columnShape]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		pageOptions,
		gotoPage,
	} = useTable(
		{
			columns,
			data: tableData,
		},
		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect
	);

	const handleChange = (_e, currentPageNo) => {
		gotoPage(currentPageNo - 1);
	};

	return (
		<TableContainer>
			<Table
				sx={{
					minWidth: 690,
					borderCollapse: 'separate',
					borderSpacing: '0px 10px',
					borderRadius: 3,
				}}
			>
				<TableHead>
					{headerGroups.map((headerGroup, index) => (
						<TableRow
							key={index}
							// {...headerGroup.getHeaderGroupProps()}
						>
							{headerGroup.headers.map((column, index) => (
								<HeadTableCell
									key={index}
									// {...column.getHeaderProps(column.getSortByToggleProps())}
								>
									{column.render('Header')}
								</HeadTableCell>
							))}
						</TableRow>
					))}
				</TableHead>

				<TableBody>
					{page.map((row, index) => {
						prepareRow(row);

						return (
							<TableRow key={index}>
								{row?.cells?.map((cell, index) => (
									<BodyTableCell key={index}>
										{cell.render('Cell')}
									</BodyTableCell>
								))}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default CustomNewTable;
