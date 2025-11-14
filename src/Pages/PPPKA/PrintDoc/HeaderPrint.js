import { Box } from '@mui/material';
import './DataTable.css';
import Typography14 from 'Component/Typography/Typography14';

import Logo from 'Assets/logolrt.png';
import React, { useEffect, useState } from 'react';

function HeaderPrint({ title, number, revisi, page }) {
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
							<td colSpan={4}>
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
								<Typography14 title={number} />
							</td>
							<td style={{ borderTopColor: 'white' }}>
								<Typography14 title="Nomor Revisi" fontWeight={700} />
							</td>
							<td width="15%" style={{ borderTopColor: 'white' }}>
								<Typography14 title={revisi} />
							</td>
							<td style={{ borderTopColor: 'white' }}>
								<Typography14 title="Halaman" fontWeight={700} />
							</td>
							<td width="15%" style={{ borderTopColor: 'white' }}>
								<Typography14 title={page} />
							</td>
						</tr>
					</tbody>
				</table>
			</>
		</Box>
	);
}

export default HeaderPrint;
