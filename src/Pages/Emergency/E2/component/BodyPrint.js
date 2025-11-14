import React from 'react';
import '../DataTable.css';

import { Box, Grid, Stack, Typography } from '@mui/material';

import Typography14 from 'Component/Typography/Typography14';
import GenerateQr from 'Component/GenerateQRCode/GenerateQr';
import moment from 'moment';

function BodyPrint({ dataId, dataUser }) {
	// console.log("dataId", dataId)

	return (
		<Box>
			<Grid container spacing={1}>
				<Grid item xs={12} sm={4}>
					<Typography14 title="No. urut dibuku Dispatcher/Masinis" />
				</Grid>
				<Grid item xs={12} sm={8}>
					<Typography14 title={':' + ' ' + dataId?.serialNumber} />
				</Grid>
				<Grid item xs={12} sm={4}>
					<Typography14 title="Nama Masinis" />
				</Grid>
				<Grid item xs={12} sm={8}>
					<Typography14
						title={
							':' + ' ' + (dataId?.masinis ? dataId?.masinis?.officerName : '-')
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
							(dataId?.dispatcher ? dataId?.dispatcher?.officerName : '-')
						}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Typography14 title="Hari, Tanggal" />
				</Grid>
				<Grid item xs={12} sm={8}>
					<Typography14
						title={':' + ' ' + moment(dataId?.date).format('DD/MM/YYYY')}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Typography14 title="Pukul" />
				</Grid>
				<Grid item xs={12} sm={8}>
					<Typography14 title={':' + ' ' + dataId?.time} />
				</Grid>
				<Grid item xs={12} sm={4}>
					<Typography14 title="KA No." />
				</Grid>
				<Grid item xs={12} sm={8}>
					<Typography14 title={':' + ' ' + dataId?.trainNumber} />
				</Grid>
				<Grid item xs={12} sm={12} sx={{ mt: 2 }}>
					<table className="data-table">
						<tbody>
							<tr>
								<td colSpan={2}>
									<Typography14 title="Harus berjalan hati - hati, karena :" />
								</td>
							</tr>
							{dataId?.information.length > 0 && (
								<>
									{dataId?.information.map((item, index) => {
										return (
											<tr>
												<td width="10px">
													<Typography14 title={index + 1 + '.'} />
												</td>
												<td>
													<Typography
														sx={{ fontSize: 13, mt: '10px', mb: '10px' }}
														dangerouslySetInnerHTML={{
															__html: item?.information,
														}}
													/>
												</td>
											</tr>
										);
									})}
								</>
							)}
						</tbody>
					</table>
				</Grid>

				<Grid item xs={12} sm={6} sx={{ mt: 2 }}>
					<table className="data-table">
						<tbody>
							<tr>
								<td colSpan={2}>
									<Typography14 title="Instruksi Khusus :" />
								</td>
							</tr>
							{dataId?.specialInstructions.length > 0 && (
								<>
									{dataId?.specialInstructions.map((item, index) => {
										return (
											<tr>
												<td width="10px">
													<Typography14 title={index + 1} />
												</td>
												<td>
													<Typography14 title={item.title} />
												</td>
											</tr>
										);
									})}
								</>
							)}
						</tbody>
					</table>
				</Grid>
				<Grid item xs={12} sm={6} sx={{ mt: 2 }}>
					<table className="data-table">
						<tbody>
							<tr>
								<td colSpan={2}>
									<Typography14 title="Sebab - sebab perintah ini :" />
								</td>
							</tr>
							{dataId?.reasons.length > 0 && (
								<>
									{dataId?.reasons.map((item, index) => {
										return (
											<tr>
												<td width="10px">
													<Typography14 title={index + 1} />
												</td>
												<td>
													<Typography14 title={item.title} />
												</td>
											</tr>
										);
									})}
								</>
							)}
						</tbody>
					</table>
				</Grid>
				{dataId?.masinis && dataId?.dispatcher ? (
					<>
						<Grid
							item
							xs={12}
							sm={12}
							sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}
						>
							<Stack direction="column" alignItems="center">
								<Typography14 title="Masinis	" />
								<Box sx={{ minHeight: '70px' }}>
									{dataId?.masinis?.officerNumber !== '' && (
										<GenerateQr dataId={dataId?.masinis?.officerNumber} />
									)}
								</Box>
								<Typography14 title={dataId?.masinis?.officerName} />
							</Stack>
						</Grid>
						<Grid item xs={12} sm={12} sx={{ mt: 2 }}>
							<Box sx={{ p: '0px 10px' }}>
								<Typography
									sx={{ fontSize: 13, mt: '10px', mb: '10px' }}
									dangerouslySetInnerHTML={{
										__html: dataId?.note?.information,
									}}
								/>
							</Box>
						</Grid>
					</>
				) : null}

				{/* {(dataUser?.officerPosition === 'Masinis' && dataId?.masinis) ||
				(dataId.createdBy && dataId?.masinis && dataId?.dispatcher) ? (
					<>
						<Grid
							item
							xs={12}
							sm={12}
							sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}
						>
							<Stack direction="column" alignItems="center">
								<Typography14 title="Masinis	" />
								<Box sx={{ minHeight: '70px' }}>
									{dataId?.masinis?.officerNumber !== '' && (
										<GenerateQr dataId={dataId?.masinis?.officerNumber} />
									)}
								</Box>
								<Typography14 title={dataId?.masinis?.officerName} />
							</Stack>
						</Grid>
						<Grid item xs={12} sm={12} sx={{ mt: 2 }}>
							<Box sx={{ p: '0px 10px' }}>
								<Typography
									sx={{ fontSize: 13, mt: '10px', mb: '10px' }}
									dangerouslySetInnerHTML={{
										__html: dataId?.note?.information,
									}}
								/>
							</Box>
						</Grid>
					</>
				) : dataUser?.officerPosition === 'Dispatcher' && dataId?.dispatcher ? (
					<>
						<Grid
							item
							xs={12}
							sm={12}
							sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}
						>
							<Stack direction="column" alignItems="center">
								<Typography14 title="Dispatcher" />
								<Box sx={{ minHeight: '70px' }}>
									{dataId?.dispatcher?.officerNumber !== '' && (
										<GenerateQr dataId={dataId?.dispatcher?.officerNumber} />
									)}
								</Box>
								<Typography14 title={dataId?.dispatcher?.officerName} />
							</Stack>
						</Grid>
						<Grid item xs={12} sm={12} sx={{ mt: 2 }}>
							<Box sx={{ p: '0px 10px' }}>
								<Typography
									sx={{ fontSize: 13, mt: '10px', mb: '10px' }}
									dangerouslySetInnerHTML={{
										__html: dataId?.note?.information,
									}}
								/>
							</Box>
						</Grid>
					</>
				) : null} */}
			</Grid>
		</Box>
	);
}

export default BodyPrint;
