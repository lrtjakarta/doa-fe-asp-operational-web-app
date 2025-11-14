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
import AppPagination from 'Component/Paginations/AppPagination';

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

function CustomNewTableList(props) {
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
					minWidth: 650,
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
			<Stack alignItems="center" marginTop={3}>
				<AppPagination
					count={pageOptions.length}
					onChange={handleChange}
					shape="rounded"
				/>
			</Stack>
		</TableContainer>
	);
}

export default CustomNewTableList;
