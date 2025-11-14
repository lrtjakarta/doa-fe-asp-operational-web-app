import React from 'react';
import { Box, Grid, Stack } from '@mui/material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import moment from 'moment';

import './DataTable.css';

import Typography14 from 'Component/Typography/Typography14';

function BodyPrint({ dataId }) {
	const _lrv =
		typeof dataId?.vehicleNumber === 'string'
			? dataId?.vehicleNumber // Jika vehicleNumber adalah string, ambil numberLrv dari dataId
			: dataId?.vehicleNumber?.numberLrv;
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={12} sx={{ mt: 1 }}>
				<table className="data-table">
					<tbody>
						<tr>
							<td style={{ width: '20%' }}>
								<Typography14 title="NAMA FORMULIR " fontWeight={700} />
							</td>
							<td>
								<Typography14 title="SERAH TERIMA LRV" fontWeight={700} />
							</td>
						</tr>
					</tbody>
				</table>
			</Grid>

			<Grid item xs={12} sm={12}>
				<Box sx={{ p: 2 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={3}>
							<Typography14 title="HARI/TANGGAL" />
						</Grid>
						<Grid item xs={12} sm={9}>
							<Typography14
								title={': ' + ' ' + moment(dataId?.date).format('DD/MM/yyyy')}
							/>
						</Grid>
						<Grid item xs={12} sm={3}>
							<Typography14 title="NOMOR SARANA" />
						</Grid>
						<Grid item xs={12} sm={9}>
							<Typography14 title={': ' + ' ' + _lrv} />
						</Grid>
						<Grid item xs={12} sm={3}>
							<Typography14 title="DINAS KA" />
						</Grid>
						<Grid item xs={12} sm={9}>
							<Typography14 title={': ' + ' ' + dataId?.kaService} />
						</Grid>
						<Grid item xs={12} sm={3}>
							<Typography14 title="MASINIS" />
						</Grid>
						<Grid item xs={12} sm={9}>
							<Typography14 title={': ' + ' ' + dataId?.masinis?.name} />
						</Grid>
						<Grid item xs={12} sm={3}>
							<Typography14 title="SUPERVISOR" />
						</Grid>
						<Grid item xs={12} sm={9}>
							<Typography14
								title={
									': ' +
									' ' +
									(dataId?.dcSupervisor
										? dataId?.dcSupervisor?.officerName
										: '-')
								}
							/>
						</Grid>

						<Grid item xs={12} sm={12}>
							<Typography14 title="* KONDISI NO GO ITEM" />
						</Grid>

						<Grid item xs={12} sm={12}>
							<table className="data-table">
								<tbody>
									<tr>
										<td>
											<Stack direction="row" justifyContent="center">
												<Typography14 title="NO" fontWeight={700} />
											</Stack>
										</td>
										<td>
											<Typography14 title="USER NO GO ITEM" fontWeight={700} />
										</td>
										<td>
											<Stack direction="row" justifyContent="center">
												<Typography14 title="BAIK" fontWeight={700} />
											</Stack>
										</td>
										<td>
											<Stack direction="row" justifyContent="center">
												<Typography14 title="RUSAK" fontWeight={700} />
											</Stack>
										</td>
										<td>
											<Stack direction="row" justifyContent="center">
												<Typography14 title="JUMLAH" fontWeight={700} />
											</Stack>
										</td>
										<td>
											<Stack direction="row" justifyContent="center">
												<Typography14 title="KETERANGAN" fontWeight={700} />
											</Stack>
										</td>
									</tr>

									{dataId?.items.map((item, index) => {
										return (
											<tr>
												<td>
													<Stack direction="row" justifyContent="center">
														<Typography14 title={index + 1} />
													</Stack>
												</td>
												<td>
													<Typography14 title={item.element} />
												</td>
												<td>
													<Stack direction="row" justifyContent="center">
														{item.condition === 'Baik' && <CheckOutlinedIcon />}
													</Stack>
												</td>
												<td>
													<Stack direction="row" justifyContent="center">
														{item.condition === 'Rusak' && (
															<CloseOutlinedIcon />
														)}
													</Stack>
												</td>
												<td>
													<Stack direction="row" justifyContent="center">
														<Typography14 title={item.amount} />
													</Stack>
												</td>
												<td>
													<Stack direction="row" justifyContent="center">
														<Typography14 title={item.note} />
													</Stack>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</Grid>
					</Grid>
				</Box>
			</Grid>
		</Grid>
	);
}

export default BodyPrint;
