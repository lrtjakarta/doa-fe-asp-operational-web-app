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

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
// 	[`&.${tableCellClasses.head}`]: {
// 		// backgroundColor: '#BB7E36',
// 		color: theme.palette.common.white,
// 		fontSize: 14,
// 	},
// 	[`&.${tableCellClasses.body}`]: {
// 		fontSize: 12,
// 		fontWeight: 100,
// 	},
// }));

const HeadTableCell = styled(TableCell)(({ theme }) => ({
	fontSize: '14px',
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
							<HeadTableCell rowSpan={3}>Waktu Pengoperasian WSC</HeadTableCell>
							<HeadTableCell colSpan={4}>
								Konfigurasi Switch (AA / DA)
							</HeadTableCell>
							<HeadTableCell rowSpan={3}>
								Kondisi Switch WS (Sudah dinormalkan / Belum dinormalkan)
							</HeadTableCell>
							<HeadTableCell rowSpan={3}>Waktu Penormalan Switch</HeadTableCell>
							<HeadTableCell rowSpan={3}>
								Release Route OCC (Sudah direlease / Belum direlease)
							</HeadTableCell>
							<HeadTableCell rowSpan={3}>
								Riwayat Pekerjaan atau Catatan
							</HeadTableCell>
							<HeadTableCell rowSpan={3}>Nama Tim Sarana</HeadTableCell>
							<HeadTableCell rowSpan={3}>Aksi</HeadTableCell>
						</TableRow>
						<TableRow>
							<HeadTableCell colSpan={2}>AA (Arrival)</HeadTableCell>
							<HeadTableCell colSpan={2}>DA (Departure)</HeadTableCell>
						</TableRow>
						<TableRow>
							<HeadTableCell>WS</HeadTableCell>
							<HeadTableCell>Posisi Switch AA (ON / OFF)</HeadTableCell>
							<HeadTableCell>WS</HeadTableCell>
							<HeadTableCell>Posisi Switch DA (ON / OFF)</HeadTableCell>
						</TableRow>
					</TableHead>
					<TableBody>{dataBody}</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}

export default CustomHeader;
