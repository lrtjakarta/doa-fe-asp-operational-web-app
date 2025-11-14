import {
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	styled,
	Paper,
	TableFooter,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import React from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		// backgroundColor: '#BB7E36',
		color: theme.palette.common.white,
		fontSize: 14,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 12,
		fontWeight: 100,
	},
}));

function CustomHeaderTable(props) {
	const { dataHeader, dataBody, dataFooter } = props;

	return (
		<>
			<TableContainer sx={{ padding: '10px' }} component={Paper}>
				<Table
					aria-label="customized table"
					sx={{
						minWidth: 250,
						borderCollapse: 'separate',
						borderSpacing: '0px 5px',
					}}
				>
					<TableHead>
						<TableRow
							sx={{
								'&:last-child td, &:last-child th': { border: 0 },
								bgcolor: '#464748',
								color: '#fff',
								borderRadius: '10px',
								pt: '10px',
							}}
						>
							{dataHeader.map(item => {
								return <StyledTableCell>{item}</StyledTableCell>;
							})}
						</TableRow>
					</TableHead>
					<TableBody>{dataBody}</TableBody>
					<TableFooter>{dataFooter}</TableFooter>
				</Table>
			</TableContainer>
		</>
	);
}

export default CustomHeaderTable;
