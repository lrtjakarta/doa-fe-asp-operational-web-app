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

const HeadTableCell = styled(TableCell)(({ theme }) => ({
	fontSize: '14px',
	fontWeight: 600,
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

function CustomHeader(props) {
	const { dataHeader, dataBody, dataFooter } = props;

	return (
		<>
			<TableContainer>
				<Table
					sx={{
						minWidth: 650,
						borderCollapse: 'separate',
						borderSpacing: '0px 10px',
						borderRadius: 3,
						border: 'solid 1px #E4E0E1',
					}}
				>
					<TableHead>
						<TableRow>
							<HeadTableCell rowSpan={2}>No.</HeadTableCell>
							<HeadTableCell rowSpan={2}>Item Pemeriksaan</HeadTableCell>
							<HeadTableCell colSpan={2}>Hasil Pemeriksaan</HeadTableCell>
							<HeadTableCell colSpan={2}>Catatan</HeadTableCell>
						</TableRow>
						<TableRow>
							<HeadTableCell>Fungsi</HeadTableCell>
							<HeadTableCell>Halang Rintang</HeadTableCell>
							<HeadTableCell>Fungsi</HeadTableCell>
							<HeadTableCell>Halang Rintang</HeadTableCell>
						</TableRow>
					</TableHead>
					<TableBody>{dataBody}</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}

export default CustomHeader;
