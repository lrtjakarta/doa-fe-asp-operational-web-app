import React from 'react';
import './DataTable.css';
import { Grid, Box, Stack, Typography } from '@mui/material';
import moment from 'moment';
import 'moment/locale/id';
import Typography14 from 'Component/Typography/Typography14';

function BodyPrint({ dataId }) {
	moment.locale('id');

	const dataHeader = [
		'No',
		'Tanggal',
		'Riwayat Pekerjaan / Gangguan',
		'Lokasi Kejadian Gangguan',
		'Waktu Kejadian Gangguan',
		'Waktu Selesai Perbaikan Gangguan',
		'Dilaporkan kpd & wkt lapor Gangguan',
		'Keterangan Konfirmasi gangguan & SR',
		'Nama Petugas Dinasan',
	];

	return (
		<Box sx={{ marginTop: '5px' }}>
			<Stack direction="row" sx={{ mt: 1, mb: 1 }}>
				<Typography14 title="A. Form" />
			</Stack>
			<Stack direction="row" justifyContent="center" sx={{ mt: 1, mb: 1 }}>
				<Typography14 fontWeight={700} title="Logbook Workshop Control Room" />
			</Stack>
			<table className="data-table">
				<tbody>
					<tr>
						{dataHeader.map(item => {
							return (
								<td style={{ textAlign: 'center' }}>
									<Typography14 title={item} />
								</td>
							);
						})}
					</tr>

					{dataId.map((item, i) => {
						return (
							<tr>
								<td style={{ textAlign: 'center' }}>
									<Typography14 title={i + 1} />
								</td>
								<td style={{ textAlign: 'center' }}>
									<Typography14 title={item?.wscDate} />
								</td>
								<td>
									<Typography14 title={item?.wscHistory} />
								</td>
								<td style={{ textAlign: 'center' }}>
									<Typography14 title={item?.wscLocation} />
								</td>
								<td style={{ textAlign: 'center' }}>
									<Typography14 title={item?.wscTime} />
								</td>
								<td style={{ textAlign: 'center' }}>
									<Typography14 title={item?.repairTime} />
								</td>
								<td style={{ textAlign: 'center' }}>
									<Typography14 title={item?.reportedTo?.name} />
									<Typography14 title={item?.reportedTime} />
								</td>
								<td style={{ textAlign: 'center' }}>
									<Typography14 title={item?.description} />
								</td>
								<td style={{ textAlign: 'center' }}>
									<Typography14 title={item?.createBy?.name} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</Box>
	);
}

export default BodyPrint;
