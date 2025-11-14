import React, {useEffect, useState} from 'react'
import QrCode from 'qrcode';
import AppAvatar from 'Component/avatars/AppAvatar';

function GenerateQr({dataId}) {
    const [qrBase, setQrBase] = useState('');
    const generateQrCode = async idNumber => {
		const response = await QrCode.toDataURL(idNumber);
		setQrBase(response);
	};

	useEffect(() => {
		if (dataId !== null) {
			const _dataId= dataId.toString()
			generateQrCode(_dataId);
		}
	}, []);
  return (
    <>
    <AppAvatar
						src={qrBase}
						sx={{
							borderRadius: '5%',
							width: 100,
							height: 100,
						}}
					/>
    </>
  )
}

export default GenerateQr