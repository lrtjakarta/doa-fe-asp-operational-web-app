import React, { useContext, useEffect } from 'react';

import {
	TableRow,
	styled,
	TableCell,
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio,
	Box,
} from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';

import AppTextField from 'Component/input-fields/AppTextField';
import CustomRG from 'Component/CustomRadioGroup/CustomRG';

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
	fontSize: 12,
	fontWeight: 400,
	padding: '0px 16px',
	// borderBottom: `1px solid ${theme.palette.divider}`
}));

function CustomRow(props) {
	const {
		key,
		loop,
		dataLrv,
		valueLrv,
		onChangeLrv,
		value1,
		onChange1,
		value2,
		onChange2,
		value3,
		onChange3,
		value4,
		onChange4,
		value5,
		onChange5,
		value6,
		onChange6,
		value7,
		onChange7,
		value8,
		onChange8,
		value9,
		onChange9,
		value10,
		onChange10,
		value11,
		onChange11,
		value12,
		onChange12,
	} = props;

	const group1 = ['Merah', 'Kuning', 'Hijau'];
	const group2 = ['Fungsi', 'Tdk Fungsi'];
	const group3 = ['Aman', 'Tdk Aman'];

	return (
		<TableRow key={key}>
			<BodyTableCell>{loop}</BodyTableCell>
			<BodyTableCell>
				<Box sx={{ width: '100px' }}>
					<AppTextField
						fullWidth
						size="small"
						select
						sx={{ mt: '0px' }}
						SelectProps={{
							native: true,
							IconComponent: KeyboardArrowDown,
						}}
						value={valueLrv}
						onChange={onChangeLrv}
					>
						<option value=""></option>
						{dataLrv.map(item => {
							return <option value={item?._id}>{item?.numberLrv}</option>;
						})}
					</AppTextField>
				</Box>
			</BodyTableCell>
			<BodyTableCell>
				<CustomRG value={value1} onChange={onChange1} dataGroup={group1} />
			</BodyTableCell>

			<BodyTableCell>
				<CustomRG value={value2} onChange={onChange2} dataGroup={group1} />
			</BodyTableCell>

			<BodyTableCell>
				<CustomRG value={value3} onChange={onChange3} dataGroup={group2} />
			</BodyTableCell>

			<BodyTableCell>
				<CustomRG value={value4} onChange={onChange4} dataGroup={group2} />
			</BodyTableCell>

			<BodyTableCell>
				<CustomRG value={value5} onChange={onChange5} dataGroup={group2} />
			</BodyTableCell>

			<BodyTableCell>
				<CustomRG value={value6} onChange={onChange6} dataGroup={group2} />
			</BodyTableCell>

			<BodyTableCell>
				<CustomRG value={value7} onChange={onChange7} dataGroup={group2} />
			</BodyTableCell>

			<BodyTableCell>
				<CustomRG value={value8} onChange={onChange8} dataGroup={group2} />
			</BodyTableCell>

			<BodyTableCell>
				<CustomRG value={value9} onChange={onChange9} dataGroup={group2} />
			</BodyTableCell>

			<BodyTableCell>
				<AppTextField
					size="small"
					fullWidth
					sx={{ mt: '0px' }}
					value={value10}
					onChange={onChange10}
				/>
			</BodyTableCell>

			<BodyTableCell>
				<CustomRG value={value11} onChange={onChange11} dataGroup={group3} />
			</BodyTableCell>

			<BodyTableCell>
				<CustomRG value={value12} onChange={onChange12} dataGroup={group2} />
			</BodyTableCell>
		</TableRow>
	);
}

export default CustomRow;
