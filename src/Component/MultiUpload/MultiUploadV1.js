import React, { useState } from 'react';
import { Button, IconButton, Grid, Typography, Box } from '@mui/material';
import { PhotoCamera, Delete } from '@mui/icons-material';

function MultiUpload({
	images,
	errors,
	handleImageChange,
	handleDeleteImage,
	handleUpload,
	status,
}) {
	return (
		<Box>
			<Typography
				sx={{ fontSize: 16, fontWeight: 700, color: '#011E3D', mb: 2 }}
			>
				Upload Images
			</Typography>
			{status === false && (
				<>
					<input
						accept="image/jpeg,image/jpg,image/png"
						style={{ display: 'none' }}
						id="upload-multiple-images"
						multiple
						type="file"
						onChange={handleImageChange}
					/>
					<label htmlFor="upload-multiple-images">
						<Button
							variant="contained"
							color="primary"
							component="span"
							startIcon={<PhotoCamera />}
						>
							Choose Images
						</Button>
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
				{images.map((image, index) => (
					<Grid item xs={12} sm={6} md={4} key={index}>
						<Box position="relative">
							<img
								src={image.preview}
								alt="preview"
								style={{ width: '100%', height: 'auto' }}
							/>
							{status === false && (
								<IconButton
									color="secondary"
									aria-label="delete"
									onClick={() => handleDeleteImage(index)}
									sx={{
										position: 'absolute',
										top: 8,
										right: 8,
										backgroundColor: 'rgba(255, 255, 255, 0.7)',
									}}
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

export default MultiUpload;
