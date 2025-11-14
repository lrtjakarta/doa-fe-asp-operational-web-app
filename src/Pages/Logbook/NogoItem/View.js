import React, { useState, useRef } from 'react';
import {
	Box,
	Button,
	Container,
	Grid,
	Stack,
	Dialog,
	Typography,
	Alert,
} from '@mui/material';
import { useLocation, useHistory } from 'react-router-dom';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import { useReactToPrint } from 'react-to-print';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import HeaderPrintV2 from './component/HeaderPrintV2';
import BodyPrint from './component/BodyPrint';
import Footer from './component/Footer';

import StaticVar from 'Config/StaticVar';
import Typography14 from 'Component/Typography/Typography14';

function View() {
	const location = useLocation();
	const { dataRow } = location.state.state;
	const componentRef = useRef();

	const _statusPhoto = dataRow?.photo !== undefined || dataRow?.photo !== null;

	const [dialogPrint, setDialogPrint] = useState(false);

	const handleOpenPrint = () => {
		setDialogPrint(true);
	};

	const handlePrintDoc = useReactToPrint({
		content: () => componentRef.current,
	});

	// console.log(dataRow)

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Container maxWidth="xl">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} sx={{ mb: 3 }}>
						<HeaderV1
							title="Logbook No Go Item"
							sub1="Home -"
							sub2="Operasional -"
							sub3="Logbook No Go Item"
						/>
					</Grid>

					<Grid item xs={12} sm={12}>
						<BodyPrint dataId={dataRow} />
					</Grid>

					<Grid item xs={12} sm={12} sx={{ mb: 1 }}>
						<Typography14 title="Dokumen" fontWeight={700} />
					</Grid>

					{dataRow?.files !== null ? (
						<>
							{dataRow?.files?.uploadedFiles.map(item => {
								const fileName = item.uploadedName;
								const originalName = item.originalName;

								const filePath = dataRow?.files?.path || '';
								const fileUrl = `${StaticVar.URL_API}/uploads/${filePath}/${fileName}`;

								// Menentukan ikon berdasarkan ekstensi file
								const getFileIcon = fileName => {
									const ext = fileName.split('.').pop().toLowerCase();
									if (['pdf'].includes(ext)) return '📄'; // PDF
									return '📁'; // Default
								};

								return (
									<Grid item xs={12} sm={6} md={4} key={fileName}>
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												gap: 1,
												p: 2,
												border: '1px solid #ddd',
												borderRadius: 2,
												width: '100%',
												maxWidth: '300px',
												backgroundColor: '#f9f9f9',
											}}
										>
											<Typography sx={{ fontSize: 30 }}>
												{getFileIcon(fileName)}
											</Typography>
											<Box sx={{ flexGrow: 1 }}>
												<Typography
													sx={{
														fontSize: 14,
														fontWeight: 'bold',
														wordBreak: 'break-word',
													}}
												>
													{originalName}
												</Typography>
												<a
													href={fileUrl}
													download={originalName}
													target="_blank"
													rel="noopener noreferrer"
												>
													<Typography sx={{ fontSize: 12, color: 'blue' }}>
														Lihat Dokumen
													</Typography>
												</a>
											</Box>
										</Box>
									</Grid>
								);
							})}
						</>
					) : (
						<Grid item xs={12} sm={12}>
							<Alert severity="info" sx={{ maxWidth: '500px' }}>
								Data dokumen kosong
							</Alert>
						</Grid>
					)}

					<Grid item xs={12} sm={12} sx={{ mb: 1 }}>
						<Typography14 title="Dokumentasi" fontWeight={700} />
					</Grid>

					{dataRow?.photo?.uploadedFiles.map(item => {
						const photoFile = item.uploadedName;
						const photoPath = _statusPhoto ? dataRow?.photo?.path : '';
						return (
							<Grid item xs={12} sm={6} md={4}>
								<img
									src={
										StaticVar.URL_API +
										'/uploads' +
										`/${photoPath}` +
										`/${photoFile}`
									}
									style={{ width: '300px' }}
								/>
							</Grid>
						);
					})}

					<Grid
						item
						xs={12}
						sm={12}
						sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}
					>
						<Button variant="contained" onClick={handleOpenPrint}>
							Cetak
						</Button>
					</Grid>
				</Grid>
			</Container>

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
					<HeaderPrintV2
						title="Kehadiran Dinasan Stasiun"
						pemilik={dataRow?.masinis?.name}
					/>
					<BodyPrint dataId={dataRow} />
					<Footer dataId={dataRow} />
				</div>
			</Dialog>
		</Box>
	);
}

export default View;
