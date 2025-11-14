import {
	Box,
	Button,
	Container,
	Grid,
	TableRow,
	Typography,
	styled,
} from '@mui/material';
import React, {
	useContext,
	useEffect,
	useState,
	useRef,
	Dialog,
	Stack,
} from 'react';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useHistory } from 'react-router-dom';

// style
import { judulTextStyle } from './Styles';

import CustomHeaderTable from './component/CustomHeaderTable';
import HeaderV1 from 'Component/CustomHeader/HeaderV1';

import { DinasanContext, StamformasiContext } from 'Context';
import { UserProfilContext } from 'Context';
import { StasiunContext } from 'Context';
import { NoGoItemContext } from 'Context';
import moment from 'moment';
import BoxStatus from 'Component/BoxStatus/BoxStatus';

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

function ListDinasan() {
	const history = useHistory();

	// context
	const { listDinasan, listAllDinasan, getDataGoNoGo, getDataDinas, getDataAllDinas } =
		useContext(DinasanContext);
	const { userProfile, userWorkorder, userById } =
		useContext(UserProfilContext);
	const { dataStasiun, getAllStasiun } = useContext(StasiunContext);
	const { listNoGoItem, getDataNoGoItem } = useContext(NoGoItemContext);
	const { dataStamformasi, getDataStamformasi} = useContext(StamformasiContext)

	// state
	const [dataHeader, setDataHeader] = useState([
		'No',
		'LRV',
		'Nama',
		'Jabatan',
		'Dinasan',
		'Jam Dinasan',
		'Nomor KA',
		'Status',
		'Aksi',
	]);
	const [allData, setAllData] = useState([]);

	// handle
	const handleAdd = row => {
		history.push('/app/operational/nogoitem/form', {
			dataRow: row,
			type: 'Add',
		});
	};

	const handleEdit = row => {
		history.push('/app/operational/nogoitem/form', {
			dataRow: row,
			type: 'Edit',
		});
	};

	const handleApprove = row => {
		history.push('/app/operational/nogoitem/form', {
			dataRow: row,
			type: 'Approve',
		});
	};

	const handleKonfirmasi = row => {
		history.push('/app/operational/nogoitem/detail', {
			dataRow: row,
			type: 'Konfirmasi',
		});
	};

	const handleView = row => {
		history.push('/app/operational/nogoitem/detail', {
			dataRow: row,
		});
	};

	// useEffect
	useEffect(() => {
		getDataStamformasi({operationDate: moment().format("YYYY-MM-DD")})
		getAllStasiun();
		getDataNoGoItem({
			searchDate: moment().format('YYYY-MM-DD'),
		});
		
	}, []);

	useEffect(() => {
		if (
			(userProfile?.officerPosition === 'Penyelia' &&
				userProfile?.officerCode) ||
			(userProfile?.officerPosition === 'Masinis' && userProfile?.officerCode)
		) {
			getDataAllDinas({
				date: moment().format('YYYY-MM-DD'),
				profileId: userProfile?.officerId,
			});
		} else {
			getDataAllDinas({
				date: moment().format('YYYY-MM-DD'),
			});
		}
	}, [userProfile]);

	useEffect(() => {
		const _allDinas = listAllDinasan
			// .map((item, index) => {
			// 	const _filterStasiun = dataStasiun
			// 		.filter(x => x._id === item.workOrder?.location)
			// 		.map(item => {
			// 			return {
			// 				id: item._id,
			// 				name: item.stationName,
			// 				code: item.stationCode,
			// 			};
			// 		});
			// 	const matchingData = listNoGoItem.find(
			// 		xy =>
			// 			xy.informationService?.code === item.workOrder?.code &&
			// 			xy.masinis?._id === item.profile?._id && xy?.kaService === item?.operationalData?.kaNumber
			// 	);
			// 	console.log('matchingData', listNoGoItem, item, matchingData)
			// 	return {
			// 		...item,
			// 		station: _filterStasiun[0],
			// 		status: matchingData ? matchingData.status : 'Belum Diisi',
			// 		dataRow: matchingData,
			// 		lrv: matchingData ? matchingData?.vehicleNumber : null,
			// 	};
			// })
			// .sort((a, b) => {
			// 	const startA = new Date(
			// 		`1970-01-01T${a.workOrder?.start || '00:00:00'}Z`
			// 	);
			// 	const startB = new Date(
			// 		`1970-01-01T${b.workOrder?.start || '00:00:00'}Z`
			// 	);
			// 	return startA - startB;
			// });
		console.log('_allDinas', _allDinas);
		setAllData(_allDinas);
	}, [listAllDinasan]);

	// console.log('listDinasan', userById);

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Container maxWidth="xl">
				<Grid container justifyContent="space-between" alignItems={'center'}>
					<Grid item xs={12} sm={12}>
						{/* <Typography sx={judulTextStyle}>List No Go Item</Typography> */}
						<HeaderV1
							title="Go No Go Item"
							sub1="Home -"
							sub2="Operasional -"
							sub3="List Go No Go Item"
						/>
					</Grid>

					<Grid item xs={12} sm={12}>
						<CustomHeaderTable
							dataHeader={dataHeader}
							dataBody={
								<>

									{ dataStamformasi.length > 0
										? [...dataStamformasi[0]?.readyOperationList, ...dataStamformasi[0]?.standByList].map((item, index) => {
												const loop  = dataStamformasi[0]?.lrvList ? dataStamformasi[0]?.lrvList.find(x => x.numberLrv?.includes(item.numberLrv))?.loop : null;
												let workOrder = allData.find(x=>"Loop "+ x?.operationalData?.Loop === loop)
												const _listNoGoItem = listNoGoItem.find(x=>x?.vehicleNumber?.numberLrv === item.numberLrv)
												if(_listNoGoItem){
													workOrder = {...workOrder, 
														lrv: _listNoGoItem?.vehicleNumber,
														dataRow:_listNoGoItem
													}
												}
												let showData = false
												if(workOrder){
													if(userProfile?.officerPosition === 'Masinis')
													{
														if(workOrder?.profile?._id === userProfile?.officerId)
														{
															console.log('workOrder.profile?._id', workOrder.profile)
															console.log('userProfile?._id', userProfile)
															showData = true
														}
														else{
															showData = false
														}
													}
													else{
														showData = true
													}
												}
												return (
													<>
													{/* {JSON.stringify(showData)} */}
													{/* Profile : {JSON.stringify(workOrder?.profile)} 
													User : {JSON.stringify(userProfile)} */}
														{/* {
															showData && */}
															<StyledTableRow>
																<StyledTableCell>{index + 1}</StyledTableCell>
																<StyledTableCell>
																	{item?.numberLrv}
																</StyledTableCell>
																<StyledTableCell>
																	{workOrder?.profile?.name || <i>--Belum diatur--</i>}
																</StyledTableCell>
																<StyledTableCell>
																	{workOrder?.profile?.jobRole || "-"}
																</StyledTableCell>
																<StyledTableCell>{workOrder?.workOrder?.code || "-"}</StyledTableCell>
																<StyledTableCell>
																	{workOrder?.workOrder ? workOrder?.workOrder?.start + ' - ' + workOrder?.workOrder?.end : "-"}
																</StyledTableCell>
																<StyledTableCell>
																	{workOrder?.operationalData?.kaNumber || "-"}
																</StyledTableCell>
																<StyledTableCell>
																	<BoxStatus title={_listNoGoItem? _listNoGoItem?.status : "Belum Diisi"} />
																</StyledTableCell>
																<StyledTableCell>
																	{userProfile?.officerPosition === 'Masinis' &&
																		userProfile?.officerCode ? (
																			<>
																				{(_listNoGoItem?.status === 'Disetujui' && showData) ? (
																					<Button
																						variant="outlined"
																						onClick={() => handleView(workOrder)}
																					>
																						Detail
																					</Button>
																				) : (_listNoGoItem?.status === 'Belum Disetujui' && showData) ? (
																					<Button
																						variant="contained"
																						onClick={() => handleApprove(workOrder)}
																					>
																						Disetujui
																					</Button>
																				) : null}
																			</>
																		) : userById?.role[0]?.name ===
																		'Supervisor DC' ? (
																			<>
																				{_listNoGoItem?.status === 'Disetujui' ||
																					(_listNoGoItem?.status === 'Konfirmasi' && (
																						<Button
																							variant="outlined"
																							onClick={() => handleKonfirmasi(workOrder)}
																						>
																							Detail
																						</Button>
																					))}
																			</>
																		) : (
																			<>
																				{_listNoGoItem?.status === 'Belum Disetujui' ? (
																					<>
																						<Button
																							variant="outlined"
																							onClick={() => handleEdit(workOrder)}
																							color="warning"
																							sx={{ mr: 1 }}
																						>
																							Edit
																						</Button>
																						<Button
																							variant="outlined"
																							onClick={() => handleView(workOrder)}
																						>
																							Detail
																						</Button>
																					</>
																				) : _listNoGoItem?.status && showData === 'Disetujui' ||
																				_listNoGoItem?.status && showData=== 'Konfirmasi' ? (
																					<Button
																						variant="outlined"
																						onClick={() => handleView(workOrder)}
																					>
																						Detail
																					</Button>
																				) : (
																					<Button
																						variant="contained"
																						onClick={() => handleAdd({...item, dataWorkOrder: workOrder})}
																					>
																						Tambah
																					</Button>
																				)}
																			</>
																		)}
																</StyledTableCell>
															</StyledTableRow>
														{/* } */}
													</>
													
												);
										  })
										: null}
								</>
							}
						/>

						{/* <CustomHeaderTable
							dataHeader={dataHeader}
							dataBody={
								<>
									{allData.length > 0
										? allData.map((item, index) => {
												const _listData = item?.workOrder;
												let loop =  "Loop "+item?.operationalData?.Loop
												const lrvList = dataStamformasi[0]?.lrvList.filter(x=>x.loop === loop)
												return (
													<StyledTableRow>
														<StyledTableCell>{index + 1}</StyledTableCell>
														<StyledTableCell>
															{lrvList[0]?.numberLrv}
														</StyledTableCell>
														<StyledTableCell>
															{item?.profile?.name}
														</StyledTableCell>
														<StyledTableCell>
															{item?.profile?.jobRole}
														</StyledTableCell>
														<StyledTableCell>{_listData?.code}</StyledTableCell>
														<StyledTableCell>
															{_listData?.start + ' - ' + _listData?.end}
														</StyledTableCell>
														<StyledTableCell>
															{item?.station?.name}
														</StyledTableCell>
														<StyledTableCell>
															<BoxStatus title={item.status} />
														</StyledTableCell>
														<StyledTableCell>
															{userProfile?.officerPosition === 'Masinis' &&
															userProfile?.officerCode ? (
																<>
																	{item?.status === 'Disetujui' ? (
																		<Button
																			variant="outlined"
																			onClick={() => handleView(item)}
																		>
																			Detail
																		</Button>
																	) : item?.status === 'Belum Disetujui' ? (
																		<Button
																			variant="contained"
																			onClick={() => handleApprove(item)}
																		>
																			Disetujui
																		</Button>
																	) : null}
																</>
															) : userById?.role[0]?.name ===
															  'Supervisor DC' ? (
																<>
																	{item?.status === 'Disetujui' ||
																		(item?.status === 'Konfirmasi' && (
																			<Button
																				variant="outlined"
																				onClick={() => handleKonfirmasi(item)}
																			>
																				Detail
																			</Button>
																		))}
																</>
															) : (
																<>
																	{item?.status === 'Belum Disetujui' ? (
																		<>
																			<Button
																				variant="outlined"
																				onClick={() => handleEdit(item)}
																				color="warning"
																				sx={{ mr: 1 }}
																			>
																				Edit
																			</Button>
																			<Button
																				variant="outlined"
																				onClick={() => handleView(item)}
																			>
																				Detail
																			</Button>
																		</>
																	) : item?.status === 'Disetujui' ||
																	  item?.status === 'Konfirmasi' ? (
																		<Button
																			variant="outlined"
																			onClick={() => handleView(item)}
																		>
																			Detail
																		</Button>
																	) : (
																		<Button
																			variant="contained"
																			onClick={() => handleAdd(item)}
																		>
																			Tambah
																		</Button>
																	)}
																</>
															)}
														</StyledTableCell>
													</StyledTableRow>
												);
										  })
										: null}
								</>
							}
						/> */}
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default ListDinasan;
