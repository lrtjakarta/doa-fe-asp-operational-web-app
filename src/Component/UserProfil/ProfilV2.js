import React, { useState, useEffect, useContext } from 'react';

import { Box, Hidden, Stack } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

import QrCode from 'qrcode';

import Typography20 from 'Component/Typography/Typography20';
import Typography14 from 'Component/Typography/Typography14';

import PhotoProfil from 'Assets/avatar.png';
import Typography16 from 'Component/Typography/Typography16';

function ProfilV2(props) {
	const { userProfile } = props;
	const _role = userProfile?.role[0];
	// console.log('user untuk admin', userProfile);

	// state
	const [qrBase, setQrBase] = useState('');

	const generateQrCode = async idNumber => {
		const response = await QrCode.toDataURL(idNumber);
		setQrBase(response);
	};

	// useEffect
	useEffect(() => {
		if (userProfile) {
			generateQrCode(userProfile?._id);
		}
	}, [userProfile]);

	// console.log('data profile', userProfilById);

	return (
		<>
			{/* versi destop */}
			<Hidden only={['xs']}>
				<Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
					<img
						src={PhotoProfil}
						style={{ width: '112px', height: '112px', objectFit: 'cover' }}
					/>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}
					>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: 1,
							}}
						>
							<Typography20 fontWeight={600} title={userProfile?.name} />
							<Box sx={{ display: 'flex', gap: 1 }}>
								<AccountCircleOutlinedIcon sx={{ color: '#7E8299' }} />
								<Typography14 title={_role?.name} />
							</Box>
						</Box>
					</Box>
					<img
						src={qrBase}
						style={{
							width: '100px',
							height: '100px',
							objectFit: 'cover',
							marginLeft: '50px',
						}}
					/>
				</Box>
			</Hidden>

			{/* versi mobile */}
			<Hidden only={['sm', 'md', 'lg', 'xl']}>
				{/* <Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<img
						src={PhotoProfil}
						style={{ width: '112px', height: '112px', objectFit: 'cover' }}
					/>
					<Typography20 fontWeight={600} title={userProfilById?.name} />
					<Typography14 title={userProfilById?.jobPosition?.name} />
					<Stack
						direction={{ xs: 'column', sm: 'row' }}
						justifyContent="space-between"
						spacing={2}
						sx={{ mt: 2 }}
					>
						<Stack direction="row" spacing={1}>
							<AccessTimeOutlinedIcon style={{ color: '#ED1C24' }} />
							<Typography16
								fontWeight={700}
								title={
									userWorkorder?.workOrder?.start +
									' - ' +
									userWorkorder?.workOrder?.end
								}
							/>
						</Stack>
						<Stack direction="row" spacing={1}>
							<TimerOutlinedIcon style={{ color: '#ED1C24' }} />
							<Typography16 title="Shift" color="#A1A5B7" />
							<Typography16 fontWeight={700} title={shift} />
						</Stack>
						<Stack direction="row" spacing={1}>
							<BadgeOutlinedIcon style={{ color: '#ED1C24' }} />
							<Typography16 title="Kode Dinas" color="#A1A5B7" />
							<Typography16
								fontWeight={700}
								title={userWorkorder?.workOrder?.code}
							/>
						</Stack>
					</Stack>
				</Box> */}
			</Hidden>
		</>
	);
}

export default ProfilV2;
