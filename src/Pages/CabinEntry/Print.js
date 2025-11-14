import { Box, Divider, Grid, Stack } from '@mui/material';
import moment from 'moment';

import './DataTable.css';

import HeaderPrint from 'Component/CustomPrints/HeaderPrint';
import Typography12 from 'Component/Typography/Typography12';
import Typography14 from 'Component/Typography/Typography14';

import React, { useRef } from 'react';
import GenerateQr from 'Component/GenerateQRCode/GenerateQr';

function Print({ dataId }) {
	const _start = moment(dataId?.startDate).format('DD/MM/YYYY');
	const _end = moment(dataId?.endDate).format('DD/MM/YYYY');

	return (
		<Box sx={{ p: 3, mb: 7 }}>
			<HeaderPrint
				title="IZIN MASUK KABIN MASINIS"
				number="LRTJ-FR-ASP-006"
				revisi="02"
				page="Page 4 of 4"
			/>
			<Box sx={{ mt: 3 }}>
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Typography14 title="HH / IMK / ASP / BB / TTTT" fontWeight={700} />
				</Box>

				<Box sx={{ mt: 2 }}>
					<Typography14 title="Bersama ini mengajukan permohonan izin memasuki kabin masinis kepada:" />
				</Box>

				<Box sx={{ mt: 1, p: '5px 20px' }}>
					<table className="data-table">
						<tbody>
							<tr>
								<td>
									<Stack direction="row" justifyContent="center">
										<Typography14 title="No" />
									</Stack>
								</td>
								<td>
									<Stack direction="row" justifyContent="center">
										<Typography14 title="NAMA" />
									</Stack>
								</td>
								<td>
									<Stack direction="row" justifyContent="center">
										<Typography14 title="NIK" />
									</Stack>
								</td>
								<td>
									<Stack direction="row" justifyContent="center">
										<Typography14 title="JABATAN" />
									</Stack>
								</td>
								<td>
									<Stack direction="row" justifyContent="center">
										<Typography14 title="DEPARTEMEN/INSTANSI" />
									</Stack>
								</td>
							</tr>

							{dataId?.participants?.map((item, index) => {
								return (
									<tr>
										<td>
											<Stack direction="row" justifyContent="center">
												<Typography14 title={index + 1} />
											</Stack>
										</td>
										<td>
											<Stack direction="row" justifyContent="center">
												<Typography14 title={item.officerName} />
											</Stack>
										</td>
										<td>
											<Stack direction="row" justifyContent="center">
												<Typography14 title={item.idNumber} />
											</Stack>
										</td>
										<td>
											<Stack direction="row" justifyContent="center">
												<Typography14 title={item.officerPosition} />
											</Stack>
										</td>
										<td>
											<Stack direction="row" justifyContent="center">
												<Typography14 title={item.officerDepartemen} />
											</Stack>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</Box>

				<Box sx={{ mt: 3 }}>
					<Grid container>
						<Grid item xs={12} sm={3}>
							<Typography14 title="Kepentingan" />
						</Grid>
						<Grid item xs={12} sm={9}>
							<Typography14 title={':' + ' ' + dataId?.priority} />
						</Grid>
						<Grid item xs={12} sm={3}>
							<Typography14 title="Waktu" />
						</Grid>
						<Grid item xs={12} sm={9}>
							<Typography14 title={':' + ' ' + dataId?.time + ' ' + 'WIB'} />
						</Grid>
						<Grid item xs={12} sm={3}>
							<Typography14 title="Kegiatan Berlansung" />
						</Grid>
						<Grid item xs={12} sm={9}>
							<Typography14
								title={':' + ' ' + _start + ' ' + 's/d' + ' ' + _end}
							/>
						</Grid>
					</Grid>
				</Box>

				<Box sx={{ mt: 2 }}>
					<Typography14 title="Syarat memasuki kabin masinis sebagai berikut :" />
					<Box sx={{ p: '5px 30px' }}>
						<Typography14 title="1. Memiliki Surat Izin Masuk Kabin Masinis dan menunjukkan kepada ASP yang berdinas." />
						<Typography14 title="2. Mencantumkan nama, jabatan dan keperluan memasuki kabin di Surat Tugas Masinis." />
						<Typography14 title="3. Pengawai atau seseorang yang turut serta didalam kabin tidak boleh melakukan sesuatu kegiatan yang dapat mengganggu ASP dalam melakukan tugasnya, serta mengikuti petunjuk yang diberikan ASP saat berada didalam kabin." />
						<Typography14 title="4. Pegawai atau seseorang yang turut serta didalam kabin harus selalu mentaati peraturan serta larangan yang berlaku saat berada didalam kabin." />
					</Box>
				</Box>

				<Box sx={{ mt: 2 }}>
					<Typography14 title="Apabila ketentuan dalam butir 1 s/d 4 tersebut diatas tidak dipenuhi, maka ASP berhak dan wajib menolak memberikan izin memasuki kabin kepada pegawai atau petugas yang dimaksud." />
				</Box>

				<Box sx={{ mt: 4 }}>
					<Stack
						direction="row"
						spacing={2}
						sx={{
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Stack
							direction="column"
							sx={{
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Typography14 title="Dibuat Oleh," />
							<Typography14 title="Pemohon" />
							<Box sx={{ minHeight: '70px' }}></Box>
							<Typography14 title={dataId?.requester?.officerName} />
							<Typography14
								title={
									'Tanggal :' +
									' ' +
									moment(dataId?.requester?.date).format('DD/MM/YYYY')
								}
							/>
						</Stack>

						<Stack
							direction="column"
							sx={{
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Typography14 title="Diperiksa Oleh," />
							<Typography14 title="Penanggung Jawab Kegiatan" />
							<Box sx={{ minHeight: '70px' }}></Box>
							<Typography14 title={dataId?.responsiblePerson?.officerName} />
							<Typography14
								title={
									'Tanggal :' +
									' ' +
									moment(dataId?.responsiblePerson?.dateUpdate).format(
										'DD/MM/YYYY'
									)
								}
							/>
						</Stack>
					</Stack>
				</Box>

				<Box sx={{ mt: 2 }}>
					<Stack
						direction="row"
						spacing={2}
						sx={{
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Stack
							direction="column"
							sx={{
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Typography14 title="Disetujui Oleh," />
							<Typography14 title="Departemen ASP" />
							<Box sx={{ minHeight: '70px' }}>
								{dataId?.approver?.officerId !== '' && (
									<GenerateQr dataId={dataId?.approver?.officerId} />
								)}
							</Box>
							<Typography14 title={dataId?.approver?.officerName} />
							<Typography14
								title={
									'Tanggal :' +
									' ' +
									moment(dataId?.approver?.date).format('DD/MM/YYYY')
								}
							/>
						</Stack>
					</Stack>
				</Box>
			</Box>
		</Box>
	);
}

export default Print;
