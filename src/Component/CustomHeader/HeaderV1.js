import { Box } from '@mui/material';
import Typography14 from 'Component/Typography/Typography14';
import Typography18 from 'Component/Typography/Typography18';
import React from 'react';

function HeaderV1(props) {
	const { title, sub1, sub2, sub3, sub4, status } = props;
	return (
		<Box>
			<Typography18 fontWeight={700} color="#181C32" title={title} />
			<Box sx={{ display: 'flex' }}>
				<Typography14 fontWeight={500} color="#333333" title={sub1} />
				<Typography14 fontWeight={500} color="#333333" title={sub2} pl="5px" />
				{status === 'Aktif' ? (
					<Typography14
						fontWeight={500}
						color="#333333"
						title={sub4}
						pl="5px"
					/>
				) : null}

				<Typography14 fontWeight={500} color="#7E8299" title={sub3} pl="5px" />
			</Box>
		</Box>
	);
}

export default HeaderV1;
