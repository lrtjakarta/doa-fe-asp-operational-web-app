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

function CustomRG(props) {
	const { value, onChange, dataGroup } = props;
	return (
		<FormControl>
			<RadioGroup
				sx={{
					'& .MuiFormControlLabel-root': {
						marginBottom: '-5px', // Mengatur jarak antar radio button
					},
				}}
				value={value}
				onChange={onChange}
			>
				{dataGroup.map(item => {
					return (
						<FormControlLabel
							value={item}
							control={<Radio />}
							label={item}
							sx={{
								'& .MuiFormControlLabel-label': {
									fontSize: '12px',
									fontWeight: 'normal',
								},
							}}
						/>
					);
				})}
			</RadioGroup>
		</FormControl>
	);
}

export default CustomRG;
