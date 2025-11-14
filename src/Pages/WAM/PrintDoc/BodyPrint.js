import React from 'react';
import './DataTable.css';
import { Grid, Box, Stack, Typography } from '@mui/material';
import moment from 'moment';
import 'moment/locale/id';
import Typography14 from 'Component/Typography/Typography14';

function BodyPrint({ dataId }) {
	moment.locale('id');

	// console.log('data row', dataId);

	return (
		<Box sx={{ marginTop: '5px' }}>
			<table className="data-table">
				<tbody>
					<tr>
						<td>
							<Typography14 title="Nomor WAM" fontWeight={700} />
						</td>
						<td>
							<Typography14 title={dataId?.wamNumber} />
						</td>
						<td>
							<Typography14
								title="Permintaan Divisi/Departemen"
								fontWeight={700}
							/>
						</td>
						<td>
							<Typography14 title={dataId?.requestFrom} />
						</td>
					</tr>
					<tr>
						<td>
							<Typography14 title="Tanggal" fontWeight={700} />
						</td>
						<td>
							<Typography14 title={dataId?.wamDate} />
						</td>
						<td>
							<Typography14 title="Perihal" fontWeight={700} />
						</td>
						<td>
							<Typography14 title={dataId?.regardingNote} />
						</td>
					</tr>
				</tbody>
			</table>
			<Stack direction="row" justifyContent="center" sx={{ mt: 1, mb: 1 }}>
				<Typography14 title="Menetapkan dan mengumumkan perjalanan kereta api dengan rincian sebagai berikut:" />
			</Stack>
			<table className="data-table">
				<tbody>
					<tr>
						<td>
							<Typography14 title="Dasar" />
						</td>
						<td>
							<Typography14 title={dataId?.wamBackground} />
						</td>
					</tr>

					<tr>
						<td>
							<Typography14 title="Perihal keperluan" />
						</td>
						<td>
							<Typography14 title={dataId?.wamFor} />
						</td>
					</tr>

					<tr>
						<td>
							<Typography14 title="Tanggal berlaku/Jam Keberangkatan" />
						</td>
						<td>
							<Typography14 title={dataId?.wamApplicableDate} />
						</td>
					</tr>

					<tr>
						<td>
							<Typography14 title="Lintas yang dilalui" />
						</td>
						<td>
							<Typography14 title={dataId?.wamRoute} />
						</td>
					</tr>

					<tr>
						<td>
							<Typography14 title="Batas kecepatan" />
						</td>
						<td>
							<Typography14 title={dataId?.wamSpeedLimit} />
						</td>
					</tr>

					<tr>
						<td>
							<Typography14 title="Susunan rangkaian" />
						</td>
						<td>
							<Typography14 title={dataId?.wamLRV} />
						</td>
					</tr>

					<tr>
						<td>
							<Typography14 title="Perubahan jadwal perjalanan" />
						</td>
						<td>
							<Typography
								sx={{
									m: '0px 0',
									fontSize: 14,
									fontWeight: 'normal',
									color: 'black',
								}}
								dangerouslySetInnerHTML={{
									__html: dataId?.wamNote,
								}}
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</Box>
	);
}

export default BodyPrint;
