import { Typography } from '@mui/material';
import React from 'react';

function Typography18(props) {
	const { fontWeight, color, title } = props;
	return (
		<Typography
			sx={{
				fontSize: 18,
				fontWeight: fontWeight ? fontWeight : 400,
				color: color,
			}}
		>
			{title}
		</Typography>
	);
}

export default Typography18;
