import React, { useContext, useEffect, useState, useRef } from 'react';

import {
	Box,
	Container,
	Grid,
	TextField,
	InputAdornment,
	IconButton,
	Button,
	styled,
	TableRow,
	Typography,
	Alert,
	Stack,
	Dialog,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import { useReactToPrint } from 'react-to-print';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import CustomHeaderTable from 'Component/CustomTable/CustomHeaderTable';

import { WscContext } from 'Context';
import Typography12 from 'Component/Typography/Typography12';
import HeaderPrint from 'Component/CustomPrints/HeaderPrintV3';
import BodyPrint from './PrintDoc/BodyPrint';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: 'theme.palette.action.hover',
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: '#BB7E36',
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 12,
		fontWeight: 100,
	},
}));

function List() {
	const componentRef = useRef();

	// context
	const { listWsc, getDataWsc } = useContext(WscContext);

	// state
	const [allData, setAllData] = useState([]);

	const [dialogPrint, setDialogPrint] = useState(false);
	const [rowData, setRowData] = useState(null);

	const dataHeader = [
		'No',
		'Tanggal',
		'Riwayat Pekerjaan / Gangguan',
		'Lokasi Kejadian Gangguan',
		'Waktu Kejadian Gangguan',
		'Waktu Selesai Perbaikan Gangguan',
		'Dilaporkan kpd & wkt lapor Gangguan',
		'Keterangan Konfirmasi gangguan & SR',
		'Nama Petugas Dinasan',
	];

	const handleOpenPrint = () => {
		setDialogPrint(true);
	};

	const handlePrintDoc = useReactToPrint({
		content: () => componentRef.current,
	});

	useEffect(() => {
		getDataWsc();
	}, []);

	useEffect(() => {
		setAllData(listWsc);
	}, [listWsc]);

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Container maxWidth="xl">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} sx={{ mb: 3 }}>
						<HeaderV1
							title="Logbook Workshop Control (WSC)"
							sub1="Home -"
							sub2="Operasional -"
							sub3="Logbook Workshop Control"
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						sx={{ display: 'flex', justifyContent: 'flex-end' }}
					>
						<Button variant="contained" onClick={handleOpenPrint}>
							Cetak
						</Button>
					</Grid>
					{allData.length > 0 ? (
						<Grid item xs={12} sm={12}>
							<CustomHeaderTable
								dataHeader={dataHeader}
								dataBody={
									<>
										{allData.map((item, index) => {
											return (
												<StyledTableRow>
													<StyledTableCell>{index + 1}</StyledTableCell>
													<StyledTableCell>{item?.wscDate}</StyledTableCell>
													<StyledTableCell>{item?.wscHistory}</StyledTableCell>
													<StyledTableCell>{item?.wscLocation}</StyledTableCell>
													<StyledTableCell>{item?.wscTime}</StyledTableCell>
													<StyledTableCell>{item?.repairTime}</StyledTableCell>
													<StyledTableCell>
														<Typography12 title={item?.reportedTo?.name} />
														<Typography12
															title={item?.reportedTime}
															color="gray"
														/>
													</StyledTableCell>
													<StyledTableCell>{item?.description}</StyledTableCell>
													<StyledTableCell>
														{item?.createBy?.name}
													</StyledTableCell>
												</StyledTableRow>
											);
										})}
									</>
								}
							/>
						</Grid>
					) : null}
				</Grid>

				<Dialog open={dialogPrint} fullScreen>
					<Stack
						direction="row"
						justifyContent="flex-end"
						spacing={2}
						sx={{ m: 3 }}
					>
						<Button
							sx={{ width: '100px' }}
							variant="outlined"
							onClick={() => setDialogPrint(false)}
						>
							Kembali
						</Button>
						<Button
							sx={{ width: '100px' }}
							variant="contained"
							onClick={handlePrintDoc}
							startIcon={<PrintOutlinedIcon />}
						>
							Print
						</Button>
					</Stack>
					<div ref={componentRef} style={{ padding: '30px' }}>
						<HeaderPrint
							title="Form Logbook Workshop Control (WSP)"
							number="LRTJ-FR-POP-028"
							revisi="00"
							page="Page 5 of 6"
						/>
						<BodyPrint dataId={allData} />
						{/* <FooterPrint dataId={rowData} /> */}
					</div>
				</Dialog>
			</Container>
		</Box>
	);
}

export default List;
