import { Typography } from '@mui/material';
import React from 'react';

function Typography20(props) {
	const { fontWeight, color, title } = props;
	return (
		<Typography
			sx={{
				fontSize: 20,
				fontWeight: fontWeight ? fontWeight : 400,
				color: color,
				...props,
			}}
		>
			{title}
		</Typography>
	);
}

export default Typography20;
