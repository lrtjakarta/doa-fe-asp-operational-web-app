import { Box } from '@mui/material';
import './DataTable.css';
import Typography14 from 'Component/Typography/Typography14';

import Logo from 'Assets/logolrt.png';
import React, { useEffect, useState } from 'react';

function HeaderPrintV2({ title, pemilik }) {
	return (
		<Box sx={{ mb: 2 }}>
			<>
				<table className="data-table">
					<tbody>
						<tr>
							<td colSpan={2} width="50%" height="50">
								<Box sx={{ display: 'flex', justifyContent: 'center' }}>
									<img
										src={Logo}
										alt="logo lrt"
										style={{
											width: '40%',
											height: 'auto',
											textAlign: 'center',
										}}
									/>
								</Box>
							</td>
							<td colSpan={2}>
								<Box sx={{ display: 'flex', justifyContent: 'center' }}>
									<Typography14
										title={title}
										fontWeight={700}
										textAlign="center"
									/>
								</Box>
							</td>
						</tr>
						<tr>
							<td style={{ borderTopColor: 'white' }}>
								<Typography14 title="Nomor Dokumen" fontWeight={700} />
							</td>
							<td style={{ borderTopColor: 'white' }}>
								<Typography14 title='LRTJ-FR-PRP-001' />
							</td>
							<td style={{ borderTopColor: 'white' }}>
								<Typography14 title="Dokumen Departemen" fontWeight={700} />
							</td>
							<td width="15%" style={{ borderTopColor: 'white' }}>
								<Typography14 title='PRP' />
							</td>
							
						</tr>
						<tr>
							<td style={{ borderTopColor: 'white' }}>
								<Typography14 title="Tipe Dokumen" fontWeight={700} />
							</td>
							<td style={{ borderTopColor: 'white' }}>
								<Typography14 title="Formulir" />
							</td>
							<td style={{ borderTopColor: 'white' }}>
								<Typography14 title="Pemilik Dokumen" fontWeight={700} />
							</td>
							<td width="15%" style={{ borderTopColor: 'white' }}>
								<Typography14 title={pemilik} />
							</td>
							
						</tr>
						<tr>
							<td style={{ borderTopColor: 'white' }}>
								<Typography14 title="Nomor Revisi" fontWeight={700} />
							</td>
							<td style={{ borderTopColor: 'white' }}>
								<Typography14 title='00' />
							</td>
							<td style={{ borderTopColor: 'white' }}>
								<Typography14 title="Kategori Dokumen" fontWeight={700} />
							</td>
							<td width="15%" style={{ borderTopColor: 'white' }}>
								<Typography14 title='Perawatan' />
							</td>
						</tr>
						<tr>
							<td style={{ borderTopColor: 'white' }}>
								<Typography14 title="Tanggal Efektif" fontWeight={700} />
							</td>
							<td style={{ borderTopColor: 'white' }}>
								<Typography14 title='30-September-2019' />
							</td>
							<td style={{ borderTopColor: 'white' }}>
								<Typography14 title="Halaman" fontWeight={700} />
							</td>
							<td width="15%" style={{ borderTopColor: 'white' }}>
								<Typography14 title='Page 1 of 1' />
							</td>
							
						</tr>
					</tbody>
				</table>
			</>
		</Box>
	);
}

export default HeaderPrintV2;
