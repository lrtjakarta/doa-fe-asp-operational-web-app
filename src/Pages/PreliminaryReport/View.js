import React, { useState, useEffect, useRef } from 'react';
import {
	Box,
	Paper,
	Grid,
	Typography,
	Table,
	TableRow,
	TableCell,
	TableHead,
	TableBody,
	Button,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import html2pdf from 'html2pdf.js';

import useQuery from 'Utils/QueryParams';
import StaticVar from 'Config/StaticVar';
import UsePreliminaryReport from 'Hooks/PreliminaryReport/usePreliminaryReport';

function View() {
	const history = useHistory();
	let query = useQuery();
	const id = query.get('id');
	const { getDataPreliminaryReport } = UsePreliminaryReport();
	const previewRef = React.useRef();

	const [dataById, setDataById] = useState(null);

	const fetchData = async id => {
		const response = await getDataPreliminaryReport({ id });
		if (response.status === 'OK' && response.result.length > 0) {
			const data = response.result[0];
			setDataById(data);
		}
	};

	let fileContent = '-';
	let filePath;
	let fileUpload;

	if (id && dataById) {
		if (Array.isArray(dataById.file)) {
			fileContent = dataById.file.length ? dataById.file : [];
		} else if (dataById.file) {
			const dataFile = dataById.file;
			fileContent = dataFile ? [dataFile] : [];
			filePath = dataFile?.path;
			fileUpload = dataFile?.uploadedFiles;
		}
	}

	var opt = {
		margin: [0, 10, 0, 10],
		filename: `Preliminary Incident Report ${moment().format(
			'dddd, D MMMM YYYY'
		)}.pdf`,
		html2canvas: {
			dpi: 360,
			letterRendering: true,
			useCORS: true,
			scale: 2,
		},
		pagebreak: { mode: ['css'], avoid: ['tr'] },
		jsPDF: {
			unit: 'mm',
			orientation: 'portrait',
			format: [220, 410],
		},
	};

	useEffect(() => {
		if (id) {
			fetchData(id);
		}
	}, [id]);

	return (
		<Box>
			<Paper sx={{ padding: '20px 50px 50px 50px', minHeight: '100vh' }}>
				<div ref={previewRef}>
					<Grid container spacing={1}>
						<Grid item md={12}>
							<Typography variant="h4" align="center" sx={{ my: 3 }}>
								Preliminary Incident Report
							</Typography>
						</Grid>
						<Grid item md={12}>
							<Table style={{ width: '100%' }}>
								<TableRow>
									<TableCell style={{ width: '35%' }}>
										<Typography>Accident</Typography>
									</TableCell>
									<TableCell sx={{ width: '2%' }}>:</TableCell>
									<TableCell>
										<Typography>{dataById?.accident || '-'}</Typography>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell style={{ width: '35%' }}>
										<Typography>
											Accident/Incident Location/ Lokasi Kejadian Kecelakaan
										</Typography>
									</TableCell>
									<TableCell sx={{ width: '2%' }}>:</TableCell>
									<TableCell>
										<Typography>{dataById?.location || '-'}</Typography>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell style={{ width: '35%' }}>
										<Typography>
											Department & Business Unit ( Kontraktor )/ Bagian & Unit
											Bisnis ( Kontraktor )
										</Typography>
									</TableCell>
									<TableCell sx={{ width: '2%' }}>:</TableCell>
									<TableCell>
										<Typography>{dataById?.department || '-'}</Typography>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell style={{ width: '35%' }}>
										<Typography>
											Date & Time Occurence / Tanggal & Waktu Kejadian
										</Typography>
									</TableCell>
									<TableCell sx={{ width: '2%' }}>:</TableCell>
									<TableCell>
										<Typography>
											{moment(dataById?.dateOccurence).format('DD-MM-YYYY') ||
												'-'}
										</Typography>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell style={{ width: '35%' }}>
										<Typography>
											Date of Report Created/ Tanggal Laporan dibuat
										</Typography>
									</TableCell>
									<TableCell sx={{ width: '2%' }}>:</TableCell>
									<TableCell>
										<Typography>
											{moment(dataById?.dateReport).format('DD-MM-YYYY') || '-'}
										</Typography>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell style={{ width: '35%' }}>
										<Typography>
											Loss Information / Informasi Kerugian
										</Typography>
									</TableCell>
									<TableCell sx={{ width: '2%' }}>:</TableCell>
									<TableCell>
										<Typography>{dataById?.lossInformation || '-'}</Typography>
									</TableCell>
								</TableRow>

								<TableRow>
									<TableCell style={{ width: '100%' }} colSpan={3}>
										<Typography>File Gambar</Typography>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell colSpan={3}>
										{Array.isArray(dataById?.file) ? (
											'-'
										) : (
											<Box sx={{ display: 'flex', gap: '10px' }}>
												{fileUpload?.map(item => {
													return (
														<Box sx={{ width: '250px' }}>
															<img
																src={
																	StaticVar.URL_API +
																	'/uploads' +
																	`/${filePath}` +
																	`/${item?.uploadedName}`
																}
																style={{
																	objectFit: 'cover',
																	height: '220px',
																	width: '100%',
																}}
															/>
														</Box>
													);
												})}
											</Box>
										)}
									</TableCell>
								</TableRow>

								<TableRow>
									<TableCell style={{ width: '35%' }}>
										<Typography>Keterangan Kejadian</Typography>
									</TableCell>
									<TableCell sx={{ width: '2%' }}>:</TableCell>
									<TableCell>
										<Typography
											dangerouslySetInnerHTML={{
												__html: dataById?.description || '-',
											}}
										/>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell colSpan={3}>
										<Typography sx={{ mb: 1 }}>Kronologis Kejadian</Typography>
										<Table
											sx={{ minWidth: 650, borderRadius: 3, mb: 3 }}
											aria-label="simple table"
										>
											<TableHead>
												<TableRow style={{ backgroundColor: '#C4C4C4' }}>
													<TableCell
														style={{
															color: '#ffffff',
															width: '5%',
															fontWeight: 'bold',
														}}
														align="center"
													>
														No
													</TableCell>
													<TableCell
														style={{
															color: '#ffffff',
															width: '25%',
															fontWeight: 'bold',
														}}
														align="left"
													>
														Waktu
													</TableCell>
													<TableCell
														style={{
															color: '#ffffff',
															width: '55%',
															fontWeight: 'bold',
														}}
														align="left"
													>
														Kronologi
													</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{dataById?.chronology.map((item, index) => (
													<TableRow>
														<TableCell style={{ width: '5%' }}>
															{index + 1}
														</TableCell>
														<TableCell style={{ width: '25%' }}>
															<Typography>{item.time}</Typography>
														</TableCell>
														<TableCell style={{ width: '55%' }}>
															<Typography>{item.value}</Typography>
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</TableCell>
								</TableRow>
							</Table>
						</Grid>
					</Grid>
				</div>
				<Grid container spacing={1}>
					<Grid
						item
						md={12}
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
							gap: '10px',
							mt: 3,
						}}
					>
						<Button
							variant="outlined"
							color="error"
							onClick={() => history.goBack()}
						>
							Kembali
						</Button>
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								html2pdf().from(previewRef.current).set(opt).save();
							}}
						>
							Download PDF
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
}

export default View;
