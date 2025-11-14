import { Box, Stack } from '@mui/material';
import GenerateQr from 'Component/GenerateQRCode/GenerateQr';
import Typography14 from 'Component/Typography/Typography14';
import React, { useEffect, useContext } from 'react';

import { UserProfilContext } from 'Context';

function Footer({ dataId }) {
	const _supervisorId = '68d4f7b1070a5e15f4de82c3';

	// context
	const { profileDataId, getProfilId, userProfile, getUserProfilById } =
		useContext(UserProfilContext);

	const _masinis = dataId?.masinis;
	const _sarana = dataId?.dcInspector;
	const _supervisor = dataId?.dcSupervisor;

	useEffect(() => {
		getProfilId(_supervisorId);
	}, []);

	useEffect(() => {
		if (dataId) {
			getUserProfilById(dataId?.dcInspector?.officerId);
		}
	}, [dataId]);
	return (
		<Stack direction="row" justifyContent="space-around" sx={{ mt: 3 }}>
			<Stack direction="column" alignItems="center">
				<Typography14 title="MASINIS" />
				<Box sx={{ minHeight: '100px' }}>
					{_masinis ? <GenerateQr dataId={_masinis?._id} /> : null}
				</Box>
				<Typography14 title={'(' + (_masinis ? _masinis?.name : '-') + ')'} />
			</Stack>
			<Stack direction="column" alignItems="center">
				<Typography14 title="PEMERIKSA DC" />
				{userProfile && (
					<>
						<Box sx={{ minHeight: '100px' }}>
							{_sarana ? <GenerateQr dataId={userProfile?.officerId} /> : null}
						</Box>
						<Typography14
							title={'(' + (_sarana ? userProfile?.officerName : '-') + ')'}
						/>
					</>
				)}
			</Stack>
			<Stack direction="column" alignItems="center">
				<Typography14 title="SUPERVISOR DC" />
				{dataId?.status === 'Disetujui' && (
					<>
						<Box sx={{ minHeight: '100px' }}>
							{_supervisorId ? <GenerateQr dataId={_supervisorId} /> : null}
						</Box>
						<Typography14
							title={'(' + (profileDataId ? profileDataId?.name : '-') + ')'}
						/>
					</>
				)}
			</Stack>
		</Stack>
	);
}

export default Footer;
