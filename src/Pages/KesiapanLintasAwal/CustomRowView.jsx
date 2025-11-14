import React from 'react';

import {
	TableRow,
	styled,
	TableCell,
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio,
} from '@mui/material';

import AppTextField from 'Component/input-fields/AppTextField';

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

function CustomRowView(props) {
	const { value1, value2, value31, value32, value41, value42 } = props;
	return (
		<TableRow>
			<BodyTableCell>{value1}</BodyTableCell>
			<BodyTableCell>{value2}</BodyTableCell>
			<BodyTableCell>{value31}</BodyTableCell>
			<BodyTableCell>{value32}</BodyTableCell>
			<BodyTableCell>{value41}</BodyTableCell>
			<BodyTableCell>{value42}</BodyTableCell>
		</TableRow>
	);
}

export default CustomRowView;
