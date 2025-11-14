import React from 'react';
import { Box, Grid, Alert } from '@mui/material';

import Typography16 from 'Component/Typography/Typography16';

import StaticVar from 'Config/StaticVar';

function DokumenPrint({ dataId }) {
	// console.log('data dokumenPrint', dataId);
	const _information = dataId?.information;
	const _photo = _information?.photo;
	const _path = _photo?.path;
	const _file = _information?.photo?.uploadedFiles;

	return (
		<Box>
			<Grid container spacing={1}>
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
				) : null}
			</Grid>
		</Box>
	);
}

export default DokumenPrint;
