import { Box, Typography } from '@mui/material';
import React from 'react';

function CustomStatus({ statusStyles, status }) {
	// console.log('statusStyles', statusStyles);
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: statusStyles
					? statusStyles.backgroundColor
					: 'transparent',
				height: '35px',
				width: '200px',
				borderRadius: '8px',
			}}
		>
			<Typography
				sx={{
					fontSize: 13,
					fontWeight: 400,
					color: statusStyles ? statusStyles.color : 'black',
				}}
			>
				{status}
			</Typography>
		</Box>
	);
}

export default CustomStatus;
