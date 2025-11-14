import React from 'react';
import { Box, Grid, Alert } from '@mui/material';

import Typography16 from 'Component/Typography/Typography16';

import StaticVar from 'Config/StaticVar';

function Dokumentasi({ dataId }) {
	// console.log('data dokumentasi', dataId);
	const _information = dataId?.information;
	const _photo = _information?.photo;
	const _path = _photo?.path;
	const _file = _information?.photo?.uploadedFiles;

	return (
		<Box>
			<Grid container spacing={1}>
				<Grid item xs={12} sm={12}>
					<Typography16 fontWeight={700} title="Dokumentasi" />
				</Grid>
				{_photo && _file?.length > 0 ? (
					<>
						{_file?.map(item => {
							return (
								<Grid item xs={12} sm={4}>
									<img
										src={`${StaticVar.URL_API}/uploads/${_path}/${item.uploadedName}`}
										style={{ width: '300px' }}
									/>
								</Grid>
							);
						})}
					</>
				) : (
					<Grid item xs={12} sm={4}>
						<Alert variant="filled" severity="warning">
							Data Kosong
						</Alert>
					</Grid>
				)}
			</Grid>
		</Box>
	);
}

export default Dokumentasi;
