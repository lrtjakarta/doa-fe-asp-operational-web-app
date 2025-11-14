import React from 'react';
import './DataTable.css';
import { Grid, Box, Stack, Typography } from '@mui/material';
import moment from 'moment';
import 'moment/locale/id';
import Typography14 from 'Component/Typography/Typography14';
import Typography12 from 'Component/Typography/Typography12';
import Typography16 from 'Component/Typography/Typography16';

function BodyPrint({ dataId }) {
	moment.locale('id');

	const _shift =
		dataId?.wscShift === 'S1'
			? 'Shift 1'
			: dataId?.wscShift === 'S2'
			? 'Shift 2'
			: '-';

	// const dataHeader = [
	// 	'No',
	// 	'Tanggal',
	// 	'Riwayat Pekerjaan / Gangguan',
	// 	'Lokasi Kejadian Gangguan',
	// 	'Waktu Kejadian Gangguan',
	// 	'Waktu Selesai Perbaikan Gangguan',
	// 	'Dilaporkan kpd & wkt lapor Gangguan',
	// 	'Keterangan Konfirmasi gangguan & SR',
	// 	'Nama Petugas Dinasan',
	// ];

	return (
		<Box sx={{ marginTop: '5px' }}>
			<Stack
				direction="row"
				alignItems="center"
				spacing={2}
				sx={{ mt: 1, mb: 1 }}
			>
				<Typography12
					title={
						'Hari / tanggal :' +
						' ' +
						moment(dataId?.wscDate).format('dddd, DD MMMM YYYY')
					}
				/>
				<Typography14 title={'(' + _shift + ')'} />
			</Stack>
			<table className="data-table">
				<tbody>
					<tr>
						<td rowSpan={3} style={{ textAlign: 'center' }}>
							<Typography14 title="Waktu Pengoperasian WSC" />
						</td>
						<td colSpan={4} style={{ textAlign: 'center' }}>
							<Typography14 title="Konfigurasi Switch (AA / DA)" />
						</td>
						<td rowSpan={3} style={{ textAlign: 'center' }}>
							<Typography14 title="Kondisi Switch WS (Sudah dinormalkan / Belum dinormalkan)" />
						</td>
						<td rowSpan={3} style={{ textAlign: 'center' }}>
							<Typography14 title="Waktu Penormalan Switch" />
						</td>
						<td rowSpan={3} style={{ textAlign: 'center' }}>
							<Typography14 title="Release Route OCC (Sudah direlease / Belum direlease)" />
						</td>
						<td rowSpan={3} style={{ textAlign: 'center' }}>
							<Typography14 title="Riwayat Pekerjaan atau Catatan" />
						</td>
						<td rowSpan={3} style={{ textAlign: 'center' }}>
							<Typography14 title="Nama Tim Sarana" />
						</td>
						<td rowSpan={3} style={{ textAlign: 'center' }}>
							<Typography14 title="Nama Dispatcher" />
						</td>
					</tr>
					<tr>
						<td colSpan={2} style={{ textAlign: 'center' }}>
							<Typography14 title="AA (Arrival)" />
						</td>
						<td colSpan={2} style={{ textAlign: 'center' }}>
							<Typography14 title="DA (Departure)" />
						</td>
					</tr>
					<tr>
						<td style={{ textAlign: 'center' }}>
							<Typography14 title="WS" />
						</td>
						<td style={{ textAlign: 'center' }}>
							<Typography14 title="Posisi Switch AA (ON / OFF)" />
						</td>
						<td style={{ textAlign: 'center' }}>
							<Typography14 title="WS" />
						</td>
						<td style={{ textAlign: 'center' }}>
							<Typography14 title="Posisi Switch DA (ON / OFF)" />
						</td>
					</tr>

					{dataId?.wscItems.length > 0 ? (
						dataId?.wscItems.map((item, i) => {
							return (
								<tr>
									<td style={{ textAlign: 'center' }}>
										<Typography14 title={item?.timeOperation} />
									</td>
									<td style={{ textAlign: 'center' }}>
										<Typography14 title={item?.arrivalWS} />
									</td>
									<td>
										<Typography14 title={item?.arrivalPosition} />
									</td>
									<td style={{ textAlign: 'center' }}>
										<Typography14 title={item?.departureWS} />
									</td>
									<td style={{ textAlign: 'center' }}>
										<Typography14 title={item?.depaturePosition} />
									</td>
									<td style={{ textAlign: 'center' }}>
										<Typography14 title={item?.conditionWS} />
									</td>
									<td style={{ textAlign: 'center' }}>
										<Typography14 title={item?.timeNormalization} />
									</td>
									<td style={{ textAlign: 'center' }}>
										<Typography14 title={item?.releaseRoute} />
									</td>
									<td style={{ textAlign: 'center' }}>
										<Typography14 title={item?.history} />
									</td>
									<td style={{ textAlign: 'center' }}>
										<Typography14 title={item?.timMeans} />
									</td>
									<td style={{ textAlign: 'center' }}>
										<Typography14 title={item?.createBy?.officerName} />
									</td>
								</tr>
							);
						})
					) : (
						<tr>
							<td colSpan={11}>
								<Typography16 title="Data Kosong" fontWeight={700} />
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</Box>
	);
}

export default BodyPrint;
