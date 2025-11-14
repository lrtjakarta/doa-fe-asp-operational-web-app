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

function CustomRow(props) {
	const {
		key,
		value1,
		value2,
		valueRF,
		onChangeRF,
		valueRA,
		onChangeRA,
		valueNF,
		onChangeNF,
		valueNA,
		onChangeNA,
	} = props;
	return (
		<TableRow key={key}>
			<BodyTableCell>{value1}</BodyTableCell>
			<BodyTableCell>{value2}</BodyTableCell>
			<BodyTableCell>
				<FormControl>
					<RadioGroup row value={valueRF} onChange={onChangeRF}>
						<FormControlLabel
							value="Fungsi"
							control={<Radio />}
							label="Fungsi"
							sx={{
								'& .MuiFormControlLabel-label': {
									fontSize: '14px',
									fontWeight: 'normal',
								},
							}}
						/>
						<FormControlLabel
							value="Tdk Fungsi"
							control={<Radio />}
							label="Tdk Fungsi"
							sx={{
								'& .MuiFormControlLabel-label': {
									fontSize: '14px',
									fontWeight: 'normal',
								},
							}}
						/>
					</RadioGroup>
				</FormControl>
			</BodyTableCell>
			<BodyTableCell>
				<FormControl>
					<RadioGroup row value={valueRA} onChange={onChangeRA}>
						<FormControlLabel
							value="Ada"
							control={<Radio />}
							label="Ada"
							sx={{
								'& .MuiFormControlLabel-label': {
									fontSize: '14px',
									fontWeight: 'normal',
								},
							}}
						/>
						<FormControlLabel
							value="Tdk Ada"
							control={<Radio />}
							label="Tdk Ada"
							sx={{
								'& .MuiFormControlLabel-label': {
									fontSize: '14px',
									fontWeight: 'normal',
								},
							}}
						/>
					</RadioGroup>
				</FormControl>
			</BodyTableCell>
			<BodyTableCell>
				<AppTextField
					size="small"
					fullWidth
					sx={{ mt: '0px' }}
					value={valueNF}
					onChange={onChangeNF}
				/>
			</BodyTableCell>
			<BodyTableCell>
				<AppTextField
					size="small"
					fullWidth
					sx={{ mt: '0px' }}
					value={valueNA}
					onChange={onChangeNA}
				/>
			</BodyTableCell>
		</TableRow>
	);
}

export default CustomRow;
