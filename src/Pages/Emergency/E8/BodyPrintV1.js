import React from 'react';
import './DataTable.css';

import { Box, Grid, Stack, Typography } from '@mui/material';

import Typography14 from 'Component/Typography/Typography14';
import GenerateQr from 'Component/GenerateQRCode/GenerateQr';
import moment from 'moment';

function BodyPrintV1({ dataId }) {
	// console.log("dataId", dataId);

	const _info1 = dataId?.information?.name1?.information;
	const _footer = dataId?.information?.footer?.information;

	return (
		<Box>
			<Grid container spacing={1}>
				<Grid item xs={12} sm={12} sx={{ mt: 2 }}>
					<table className="data-table">
						<tbody>
							<tr>
								<td colSpan={2}>
									<Box sx={{ p: '0px 5px' }}>
										<Grid container spacing={0}>
											<Grid item xs={12} sm={4}>
												<Typography14 title="Hari, Tanggal" />
											</Grid>
											<Grid item xs={12} sm={8}>
												<Typography14
													title={
														':' +
														' ' +
														moment(dataId?.date).format('DD/MM/YYYY')
													}
												/>
											</Grid>
											<Grid item xs={12} sm={4}>
												<Typography14 title="Pukul" />
											</Grid>
											<Grid item xs={12} sm={8}>
												<Typography14 title={':' + ' ' + dataId?.time} />
											</Grid>
											<Grid item xs={12} sm={4}>
												<Typography14 title="Nama Masinis" />
											</Grid>
											<Grid item xs={12} sm={8}>
												<Typography14
													title={
														':' +
														' ' +
														(dataId?.masinis
															? dataId?.masinis?.officerName
															: '-')
													}
												/>
											</Grid>
											<Grid item xs={12} sm={4}>
												<Typography14 title="Nama Dispatcher" />
											</Grid>
											<Grid item xs={12} sm={8}>
												<Typography14
													title={
														':' +
														' ' +
														(dataId?.dispatcher
															? dataId?.dispatcher?.officerName
															: '-')
													}
												/>
											</Grid>
											<Grid item xs={12} sm={4}>
												<Typography14 title="Petak Jalan" />
											</Grid>
											<Grid item xs={12} sm={8}>
												<Typography14
													title={':' + ' ' + dataId?.trackSection}
												/>
											</Grid>
											<Grid item xs={12} sm={4}>
												<Typography14 title="KM" />
											</Grid>
											<Grid item xs={12} sm={8}>
												<Typography14
													title={':' + ' ' + dataId?.trainDistance}
												/>
											</Grid>
										</Grid>
									</Box>
								</td>
							</tr>
							<tr>
								<td colSpan={2}>
									<Box sx={{ p: '0px 5px' }}>
										<Typography14 title="Petak Blok kosong/petak blok terisi" />
									</Box>
								</td>
							</tr>
							<tr>
								<td colSpan={2}>
									<Typography
										sx={{ fontSize: 13, mt: '0px', mb: '10px', pl: 1 }}
										dangerouslySetInnerHTML={{
											__html: _info1,
										}}
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</Grid>

				{dataId?.masinis && dataId.dispatcher ? (
					<>
						<Grid
							item
							xs={12}
							sm={12}
							sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}
						>
							<Stack direction="column" alignItems="center">
								<Typography14 title={dataId?.createdBy?.officerPosition} />
								<Box sx={{ minHeight: '70px' }}>
									{dataId?.createdBy?.officerNumber !== '' && (
										<GenerateQr dataId={dataId?.createdBy?.officerNumber} />
									)}
								</Box>
								<Typography14 title={dataId?.createdBy?.officerName} />
							</Stack>
						</Grid>
						<Grid item xs={12} sm={12} sx={{ mt: 2 }}>
							<Box sx={{ p: '0px 10px' }}>
								<Typography
									sx={{ fontSize: 13, mt: '10px', mb: '10px' }}
									dangerouslySetInnerHTML={{
										__html: _footer,
									}}
								/>
							</Box>
						</Grid>
					</>
				) : null}
			</Grid>
		</Box>
	);
}

export default BodyPrintV1;
