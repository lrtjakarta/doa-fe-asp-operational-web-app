import { Typography } from '@mui/material';
import React from 'react';

function Typography16(props) {
	const { fontWeight, color, title } = props;
	return (
		<Typography
			sx={{
				fontSize: 16,
				fontWeight: fontWeight ? fontWeight : 400,
				color: color,
				...props,
			}}
		>
			{title}
		</Typography>
	);
}

export default Typography16;
