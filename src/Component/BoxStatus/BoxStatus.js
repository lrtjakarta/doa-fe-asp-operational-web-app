import React from 'react';
import { Box } from '@mui/material';
import Typography12 from 'Component/Typography/Typography12';

function BoxStatus(props) {
	const { title } = props;
	const getStatusStyles = status => {
		switch (status) {
			case 'Belum Diisi':
				return {
					backgroundColor: '#FFF5F8',
					color: '#F1416C',
				};
			case 'Belum Disetujui':
				return {
					backgroundColor: '#FFF8DD',
					color: '#F6C000',
				};
			case 'Disetujui':
				return {
					backgroundColor: '#EEF6FF',
					color: '#3E97FF',
				};
			case 'Konfirmasi':
				return {
					backgroundColor: '#E8FFF3',
					color: '#50CD89',
				};
			default:
				return null; // Mengembalikan null jika status tidak ditemukan
		}
	};
	const statusStyles = getStatusStyles(title);
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: statusStyles
					? statusStyles.backgroundColor
					: 'transparent',
				height: '35px',
				borderRadius: '8px',
			}}
		>
			<Typography12
				color={statusStyles ? statusStyles.color : 'black'}
				title={title}
			/>
		</Box>
	);
}

export default BoxStatus;
