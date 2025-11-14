import React from 'react';
import './DataTable.css';
import { Grid, Box, Stack } from '@mui/material';
import moment from 'moment';
import 'moment/locale/id';
import Typography14 from 'Component/Typography/Typography14';

function BodyPrint({ dataId }) {
	moment.locale('id');

	const totalValue = dataId?.cabinRide?.reduce((total, item) => {
		const desc = item.desc ? item.desc : item.description;
		const sumDescValues = desc?.reduce(
			(sum, descItem) =>
				sum + parseInt(descItem?.value ? descItem?.value : descItem?.weight),
			0
		);
		return total + sumDescValues;
	}, 0);

	const totalrealization = dataId?.cabinRide?.reduce((total, item) => {
		const desc = item.desc ? item.desc : item.description;
		const sumDescValues = desc?.reduce(
			(sum, descItem) => sum + parseInt(descItem.realization),
			0
		);
		return total + sumDescValues;
	}, 0);

	//   console.log("data", dataId);
	return (
		<Box sx={{ marginTop: '5px' }}>
			<Grid container spacing={1} sx={{ mb: '10px' }}>
				<Grid item xs={12} sm={2}>
					<Typography14 title="Nama ASP" fontWeight={700} />
				</Grid>
				<Grid item xs={12} sm={4}>
					<Typography14
						title={':' + ' ' + dataId?.driverProfile?.officerName}
					/>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Typography14 title="No. LRV" fontWeight={700} />
				</Grid>
				<Grid item xs={12} sm={4}>
					<Typography14
						title={':' + ' ' + dataId?.driverProfile?.vehicleNumber}
					/>
				</Grid>

				<Grid item xs={12} sm={2}>
					<Typography14 title="NIK" fontWeight={700} />
				</Grid>
				<Grid item xs={12} sm={4}>
					<Typography14
						title={':' + ' ' + dataId?.driverProfile?.officerNumber}
					/>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Typography14 title="No. KA" fontWeight={700} />
				</Grid>
				<Grid item xs={12} sm={4}>
					<Typography14 title={':' + ' ' + dataId?.driverProfile?.kaService} />
				</Grid>

				<Grid item xs={12} sm={2}>
					<Typography14 title="Tanggal" fontWeight={700} />
				</Grid>
				<Grid item xs={12} sm={4}>
					<Typography14 title={':' + ' ' + dataId?.monthly} />
				</Grid>
				<Grid item xs={12} sm={2}>
					<Typography14 title="Jam Mulai" fontWeight={700} />
				</Grid>
				<Grid item xs={12} sm={4}>
					<Typography14
						title={':' + ' ' + dataId?.driverProfile?.officerStart}
					/>
				</Grid>

				<Grid item xs={12} sm={6}></Grid>
				<Grid item xs={12} sm={2}>
					<Typography14 title="Jam Selesai" fontWeight={700} />
				</Grid>
				<Grid item xs={12} sm={4}>
					<Typography14 title={':' + ' ' + dataId?.driverProfile?.officerEnd} />
				</Grid>
			</Grid>

			<table className="data-table">
				<tbody>
					<tr>
						<td width="20px" rowSpan={2}>
							<Stack direction="row" justifyContent="center">
								<Typography14 title="NO" fontWeight={700} />
							</Stack>
						</td>
						<td rowSpan={2}>
							<Stack direction="row" justifyContent="center">
								<Typography14 title="CABIN RIDE" fontWeight={700} />
							</Stack>
						</td>
						<td rowSpan={2}>
							<Stack direction="row" justifyContent="center">
								<Typography14 title="URAIAN" fontWeight={700} />
							</Stack>
						</td>
						<td colSpan={2}>
							<Stack direction="row" justifyContent="center">
								<Typography14 title="NILAI" fontWeight={700} />
							</Stack>
						</td>
						<td rowSpan={2}>
							<Stack direction="row" justifyContent="center">
								<Typography14 title="KETERANGAN" fontWeight={700} />
							</Stack>
						</td>
					</tr>
					<tr>
						<td>
							<Stack direction="row" justifyContent="center">
								<Typography14 title="BOBOT" fontWeight={700} />
							</Stack>
						</td>
						<td>
							<Stack direction="row" justifyContent="center">
								<Typography14 title="REALISASI" fontWeight={700} />
							</Stack>
						</td>
					</tr>

					{dataId?.cabinRide.map((item, index) => {
						const desc = item.desc ? item.desc : item.description;
						const descLength = desc.length;
						return (
							<>
								<tr>
									<td rowSpan={descLength}>
										<Stack direction="row" justifyContent="center">
											<Typography14 title={index + 1} />
										</Stack>
									</td>
									<td rowSpan={descLength}>
										<Typography14
											title={item?.question ? item?.question : item?.name}
										/>
									</td>
									{desc.slice(0, 1).map((yy, i) => {
										return (
											<>
												<td>
													<Typography14
														title={yy?.label ? yy?.label : yy?.name}
													/>
												</td>
												<td>
													<Stack direction="row" justifyContent="center">
														<Typography14
															title={yy?.value ? yy?.value : yy?.weight}
														/>
													</Stack>
												</td>
												<td>
													<Stack direction="row" justifyContent="center">
														<Typography14 title={yy?.realization} />
													</Stack>
												</td>
												<td>
													<Typography14 title={yy?.note} />
												</td>
											</>
										);
									})}
								</tr>
								{desc.slice(1).map((xy, i) => {
									return (
										<tr>
											<td>
												<Typography14
													title={xy?.label ? xy?.label : xy?.name}
												/>
											</td>
											<td>
												<Stack direction="row" justifyContent="center">
													<Typography14
														title={xy?.value ? xy?.value : xy?.weight}
													/>
												</Stack>
											</td>
											<td>
												<Stack direction="row" justifyContent="center">
													<Typography14 title={xy?.realization} />
												</Stack>
											</td>
											<td>
												<Typography14 title={xy?.note} />
											</td>
										</tr>
									);
								})}
							</>
						);
					})}

					<tr>
						<td colSpan={3}>
							<Stack direction="row" justifyContent="center">
								<Typography14 title="JUMLAH NILAI" fontWeight={700} />
							</Stack>
						</td>
						<td>
							<Stack direction="row" justifyContent="center">
								<Typography14 title={totalValue} fontWeight={700} />
							</Stack>
						</td>
						<td>
							<Stack direction="row" justifyContent="center">
								<Typography14 title={totalrealization} fontWeight={700} />
							</Stack>
						</td>
						<td></td>
					</tr>
				</tbody>
			</table>

			<Box sx={{ mt: 2 }}>
				<Typography14 title="CATATAN :" />
				<table className="data-table">
					<tbody>
						<tr>
							<td>
								<Box sx={{ minHeight: '50px' }}>
									<Typography14 title={dataId?.note} />
								</Box>
							</td>
						</tr>
					</tbody>
				</table>
			</Box>
		</Box>
	);
}

export default BodyPrint;
