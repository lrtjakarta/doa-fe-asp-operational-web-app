import React from 'react';

import { TableRow, styled, TableCell } from '@mui/material';

const HeadTableCell = styled(TableCell)(({ theme }) => ({
	fontSize: '15px',
	// fontWeight: 600,
	color: '#35405B',
	'&:first-of-type': {
		paddingLeft: 24,
	},
	'&:last-of-type': {
		paddingRight: 24,
		textAlign: 'left',
	},
}));

const BodyTableCell = styled(HeadTableCell)(({ theme }) => ({
	color: '#333333',
	fontSize: 14,
	fontWeight: 400,
	// borderBottom: `1px solid ${theme.palette.divider}`
}));

function CustomRow(props) {
	const {
		key,
		value1,
		value2,
		value3,
		value4,
		value5,
		value6,
		value7,
		value8,
		value9,
		value10,
		value11,
	} = props;
	return (
		<TableRow key={key}>
			<BodyTableCell>{value1}</BodyTableCell>
			<BodyTableCell>{value2}</BodyTableCell>
			<BodyTableCell>{value3}</BodyTableCell>
			<BodyTableCell>{value4}</BodyTableCell>
			<BodyTableCell>{value5}</BodyTableCell>
			<BodyTableCell>{value6}</BodyTableCell>
			<BodyTableCell>{value7}</BodyTableCell>
			<BodyTableCell>{value8}</BodyTableCell>
			<BodyTableCell>{value9}</BodyTableCell>
			<BodyTableCell>{value10}</BodyTableCell>
			<BodyTableCell>{value11}</BodyTableCell>
		</TableRow>
	);
}

export default CustomRow;
