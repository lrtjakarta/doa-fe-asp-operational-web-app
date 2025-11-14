import React from 'react';
import { Button, IconButton, Grid, Typography, Box } from '@mui/material';
import { AttachFile, Delete } from '@mui/icons-material';

function MultiUploadFile({
	files,
	errors,
	handleFileChange,
	handleDeleteFile,
	status,
}) {
	return (
		<Box>
			<Typography
				sx={{ fontSize: 16, fontWeight: 700, color: '#011E3D', mb: 2 }}
			>
				Upload Documents
			</Typography>
			{status === false && (
				<>
					<input
						accept=".pdf"
						style={{ display: 'none' }}
						id="upload-multiple-files"
						multiple
						type="file"
						onChange={handleFileChange}
					/>
					<label
						htmlFor="upload-multiple-files"
						style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
					>
						<Button
							variant="contained"
							color="primary"
							component="span"
							startIcon={<AttachFile />}
						>
							Choose Files
						</Button>
						<Typography sx={{ fontSize: 12, color: 'gray' }}>
							Max file size: 1MB (PDF)
						</Typography>
					</label>
				</>
			)}
			{errors.length > 0 && (
				<Box sx={{ mt: 2 }}>
					{errors.map((error, index) => (
						<Typography key={index} color="error">
							{error}
						</Typography>
					))}
				</Box>
			)}
			<Grid container spacing={2} sx={{ mt: 2 }}>
				{files.map((file, index) => (
					<Grid item xs={12} sm={6} md={4} key={index}>
						<Box
							display="flex"
							alignItems="center"
							justifyContent="space-between"
							p={1}
							border={1}
							borderRadius={1}
						>
							<Typography variant="body2" noWrap>
								{file.name}
							</Typography>
							{status === false && (
								<IconButton
									color="secondary"
									aria-label="delete"
									onClick={() => handleDeleteFile(index)}
								>
									<Delete sx={{ color: 'red' }} />
								</IconButton>
							)}
						</Box>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

export default MultiUploadFile;
