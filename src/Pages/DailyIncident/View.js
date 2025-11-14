import React, { useEffect, useState } from 'react';
import {
	Box,
	Grid,
	Typography,
	Paper,
	Table,
	TableRow,
	TableCell,
	Button,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import StaticVar from 'Config/StaticVar';

import UseDailyIncident from 'Hooks/DailyIncident/useDailyIncident';

import useQuery from 'Utils/QueryParams';

function View() {
	const history = useHistory();
	let query = useQuery();
	const id = query.get('id');

	const { getDataDailyIncident } = UseDailyIncident();

	const [dataById, setDataById] = useState(null);

	const fetchData = async id => {
		const response = await getDataDailyIncident({ id });
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

	useEffect(() => {
		if (id) {
			fetchData(id);
		}
	}, [id]);

	return (
		<Box>
			<Paper sx={{ padding: '20px 50px 50px 50px', minHeight: '100vh' }}>
				<Grid container spacing={1}>
					<Grid item md={12}>
						<Typography variant="h4" align="center" sx={{ my: 3 }}>
							KEJADIAN HARIAN
						</Typography>
					</Grid>
					<Grid item md={12}>
						<Table style={{ width: '100%' }}>
							<TableRow>
								<TableCell style={{ width: '25%' }}>
									<Typography>Nama Pelapor</Typography>
								</TableCell>
								<TableCell style={{ width: 15 }}>:</TableCell>
								<TableCell>
									<Typography>{dataById?.reporterName || '-'}</Typography>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ width: '25%' }}>
									<Typography>File</Typography>
								</TableCell>
								<TableCell style={{ width: 15 }}>:</TableCell>

								<TableCell>
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
								<TableCell style={{ width: '25%' }}>
									<Typography>Waktu Kejadian</Typography>
								</TableCell>
								<TableCell style={{ width: 15 }}>:</TableCell>
								<TableCell>
									{moment(dataById?.timeIncident).format('YYYY-MM-DDTHH:mm') ||
										'-'}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ width: '25%' }}>
									<Typography>Lokasi</Typography>
								</TableCell>
								<TableCell style={{ width: 15 }}>:</TableCell>
								<TableCell>
									{Array.isArray(dataById?.location)
										? dataById?.location.length > 0
											? dataById?.location.map(loc => loc.name).join(', ')
											: '-'
										: dataById?.location?.trim()
										? dataById?.location
										: '-'}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ width: '25%' }}>
									<Typography>Lokasi Spesifik</Typography>
								</TableCell>
								<TableCell style={{ width: 15 }}>:</TableCell>
								<TableCell>
									{Array.isArray(dataById?.locationSpecific)
										? dataById?.locationSpecific.length > 0
											? dataById?.locationSpecific
													.map(loc => loc.name)
													.join(', ')
											: '-'
										: dataById?.locationSpecific?.trim()
										? dataById?.locationSpecific
										: '-'}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ width: '25%' }}>
									<Typography>Equipment</Typography>
								</TableCell>
								<TableCell style={{ width: 15 }}>:</TableCell>
								<TableCell>
									{Array.isArray(dataById?.equipment)
										? dataById?.equipment.length > 0
											? dataById?.equipment.map(loc => loc.name).join(', ')
											: '-'
										: dataById?.equipment?.trim()
										? dataById?.equipment
										: '-'}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ width: '25%' }}>
									<Typography>Tagging No</Typography>
								</TableCell>
								<TableCell style={{ width: 15 }}>:</TableCell>
								<TableCell>{dataById?.taggingNumber || '-'}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ width: '25%' }}>
									<Typography>No. Service</Typography>
								</TableCell>
								<TableCell style={{ width: 15 }}>:</TableCell>
								<TableCell>{dataById?.serviceRequestNumber || '-'}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ width: '35%' }}>
									<Typography>Deskripsi</Typography>
								</TableCell>
								<TableCell style={{ width: 15 }}>:</TableCell>
								<TableCell>{dataById?.description || '-'}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ width: '25%' }}>
									<Typography>Status</Typography>
								</TableCell>
								<TableCell style={{ width: 15 }}>:</TableCell>
								<TableCell>
									{Array.isArray(dataById?.status)
										? dataById?.status.length > 0
											? dataById?.status.map(loc => loc.name).join(', ')
											: '-'
										: dataById?.status?.trim()
										? dataById?.status
										: '-'}
								</TableCell>
							</TableRow>
						</Table>
					</Grid>
					<Grid item md={12}>
						<Button
							variant="contained"
							onClick={() => history.goBack()}
							sx={{
								color: '#A56C28',
								bgcolor: '#fff',
								border: '2px solid #A56C28',
								width: 300,
								fontSize: 18,
								mr: 3,
								mt: 3,
								'&:hover': {
									backgroundColor: '#BB7E36',
									color: '#fff',
									border: 'none',
								},
							}}
						>
							<ArrowBackIosNewIcon sx={{ mr: 1 }} /> Kembali
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
}

export default View;
