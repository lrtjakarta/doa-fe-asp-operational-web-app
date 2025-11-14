import React, { useContext, useState } from 'react';
import {
	Box,
	Button,
	Container,
	Grid,
	TableRow,
	Typography,
	TableCell,
	Stack,
	Alert,
} from '@mui/material';
import { useLocation, useHistory } from 'react-router-dom';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

// style
import { judulTextStyle } from './Styles';

import CustomHeaderTable from './component/CustomHeaderTable';
import HeaderV1 from 'Component/CustomHeader/HeaderV1';

import moment from 'moment';

import StaticVar from 'Config/StaticVar';
import Typography14 from 'Component/Typography/Typography14';

import { UserProfilContext } from 'Context';
import ApiOperational from '../../Services/ApiOperational';

function View() {
	const history = useHistory();
	const location = useLocation();
	const { dataRow, type } = location.state;
	const _dataRow = dataRow?.dataRow;

	// context
	const { userById } = useContext(UserProfilContext);

	// state
	const [loading, setLoading] = useState(false);
	const [notifMsg, setNotifMsg] = useState('');

	const _statusPhoto =
		_dataRow?.photo !== undefined || _dataRow?.photo !== null;

	const _lrv =
		typeof _dataRow?.vehicleNumber === 'string'
			? _dataRow?.vehicleNumber
			: _dataRow?.vehicleNumber?.numberLrv;

	const dataHeader = [
		'NO',
		'UNSER NO GO ITEM',
		'BAIK',
		'RUSAK',
		'JUMLAH',
		'KETERANGAN',
	];

	const handleSave = () => {
		let _user; // tim pemeriksa
		let _status; // status
		if (userById) {
			const _role = userById?.role[0];
			_user = {
				officerId: userById?._id,
				officerName: userById?.name,
				officerIdPosition: _role?._id,
				officerPosition: _role?.name,
				officerDepartemen: '',
				officerNumber: '', // nipp/id profile
				date: new Date(),
			};
			_status = 'Konfirmasi';
		}
		const postData = {
			..._dataRow,
			dcSupervisor: _user,
			status: _status,
		};
		// console.log('konfirmasi data', postData);
		return ApiOperational.updateNoGoItem(dataRow?.dataRow?._id, postData);
	};

	const handleSubmit = async e => {
		await setLoading(true);

		const result = await handleSave(e);
		// return;
		if (result.statusText === 'OK') {
			// setOpenPrint(true);
			setLoading(false);
			history.goBack();
			// generateQrCode(idNumber);
		} else {
			setNotifMsg('Gagal!');
			setLoading(false);
		}
	};

	// console.log('dataRow', dataRow, type);

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Container maxWidth="xl">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} sx={{ mb: 3 }}>
						{/* <Typography sx={judulTextStyle}>View No Go Item</Typography> */}
						<HeaderV1
							title="Go No Go Item"
							sub1="Home -"
							sub2="Operasional -"
							sub3="Detail Go No Go Item"
						/>
					</Grid>

					<Grid item xs={12} sm={3}>
						<Typography>Hari/Tanggal</Typography>
					</Grid>
					<Grid item xs={12} sm={9}>
						<Typography>
							{': ' + ' ' + moment(_dataRow.date).format('DD/MM/yyyy')}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={3}>
						<Typography>Nomor Sarana</Typography>
					</Grid>
					<Grid item xs={12} sm={9}>
						<Typography>{': ' + ' ' + _lrv}</Typography>
					</Grid>
					<Grid item xs={12} sm={3}>
						<Typography>Dinas KA</Typography>
					</Grid>
					<Grid item xs={12} sm={9}>
						<Typography>{_dataRow?.kaService ? ': ' + ' ' + _dataRow?.kaService : ": Belum diatur"}</Typography>
					</Grid>
					<Grid item xs={12} sm={3}>
						<Typography>Masinis</Typography>
					</Grid>
					<Grid item xs={12} sm={9}>
						<Typography>{ _dataRow?.masinis?.name ? ': ' + ' ' + _dataRow?.masinis?.name : ": Belum diatur"}</Typography>
					</Grid>

					<Grid item xs={12} sm={3}>
						<Typography>Supervisor</Typography>
					</Grid>
					<Grid item xs={12} sm={9}>
						<Typography>
							{': ' +
								' ' +
								(_dataRow?.dcSupervisor
									? _dataRow?.dcSupervisor?.officerName
									: '-')}
						</Typography>
					</Grid>

					<Grid item xs={12} sm={12} sx={{ mb: 3 }}>
						<CustomHeaderTable
							dataHeader={dataHeader}
							dataBody={
								<>
									{_dataRow?.items.map((item, index) => {
										return (
											<TableRow>
												<TableCell>{index + 1}</TableCell>
												<TableCell>{item.element}</TableCell>
												<TableCell>
													{item.condition === 'Baik' && <CheckOutlinedIcon />}
												</TableCell>
												<TableCell>
													{item.condition === 'Rusak' && <CloseOutlinedIcon />}
												</TableCell>
												<TableCell>{item.amount}</TableCell>
												<TableCell>{item.note}</TableCell>
											</TableRow>
										);
									})}
								</>
							}
						/>
					</Grid>

					<Grid item xs={12} sm={12} sx={{ mb: 1 }}>
						<Typography14 title="Dokumen" fontWeight={700} />
					</Grid>

					{_dataRow?.files !== null ? (
						<>
							{_dataRow?.files?.uploadedFiles.map(item => {
								const fileName = item.uploadedName;
								const originalName = item.originalName;

								const filePath = _dataRow?.files?.path || '';
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

					{_dataRow?.photo?.uploadedFiles.map(item => {
						const photoFile = item.uploadedName;
						const photoPath = _statusPhoto ? _dataRow?.photo?.path : '';
						return (
							<Grid item xs={12} sm={6} md={4}>
								<Box
									sx={{
										width: '300px',
										height: '300px',
									}}
								>
									<img
										src={
											StaticVar.URL_API +
											'/uploads' +
											`/${photoPath}` +
											`/${photoFile}`
										}
										style={{
											width: '100%',
											height: '100%',
											objectFit: 'cover',
										}}
									/>
								</Box>
							</Grid>
						);
					})}

					{_dataRow?.status === 'Disetujui' &&
						userById?.role[0]?.name === 'Supervisor DC' && (
							<Grid
								item
								xs={12}
								sm={12}
								sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}
							>
								<Stack direction="row" spacing={2}>
									<Button
										variant="outlined"
										color="error"
										onClick={() => history.goBack()}
									>
										Kembali
									</Button>
									<Button variant="contained" onClick={handleSubmit}>
										Konfirmasi
									</Button>
								</Stack>
							</Grid>
						)}
				</Grid>
			</Container>
		</Box>
	);
}

export default View;
