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
							<HeadTableCell>Loop</HeadTableCell>
							<HeadTableCell>LRV</HeadTableCell>
							<HeadTableCell>Indikator Sinyal</HeadTableCell>
							<HeadTableCell>Indokator PSD</HeadTableCell>
							<HeadTableCell>Radio Tetra</HeadTableCell>
							<HeadTableCell>TRN</HeadTableCell>
							<HeadTableCell>ATS</HeadTableCell>
							<HeadTableCell>TCMS</HeadTableCell>
							<HeadTableCell>CCTV Sarana</HeadTableCell>
							<HeadTableCell>CTM</HeadTableCell>
							<HeadTableCell>PEI</HeadTableCell>
							<HeadTableCell>Reservasi Schedule</HeadTableCell>
							<HeadTableCell>Track Mainline</HeadTableCell>
							<HeadTableCell>Power</HeadTableCell>
						</TableRow>
					</TableHead>
					<TableBody>{dataBody}</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}

export default CustomHeader;
