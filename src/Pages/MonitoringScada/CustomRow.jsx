import React from 'react';
import { TableRow, TableCell } from '@mui/material';

function CustomRow(props) {
	const { index, value1, value2, value3, value4 } = props;
	return (
		<TableRow key={index}>
			<TableCell>{value1}</TableCell>
			<TableCell>{value2}</TableCell>
			<TableCell>{value3}</TableCell>
			<TableCell>{value4}</TableCell>
		</TableRow>
	);
}

export default CustomRow;
