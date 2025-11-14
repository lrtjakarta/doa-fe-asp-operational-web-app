import React from 'react';
import './DataTable.css';
import moment from 'moment';
import 'moment/locale/id';

import Typography14 from 'Component/Typography/Typography14';
import { Typography } from '@mui/material';

function BodyView({ dataId }) {
	moment.locale('id');
	const shiftPagi =
		dataId?.createBy?.officerShift === 'S1'
			? 'Report Pagi (23.00 – 05.00)'
			: '-';
	const shiftSiang =
		dataId?.createBy?.officerShift === 'S2'
			? 'Report Siang (05.00 – 14.00)'
			: '-';
	const shiftMalam =
		dataId?.createBy?.officerShift === 'S3'
			? 'Report Malam (14.00 – 23.00)'
			: '-';
	const time = dataId?.startTime
		? dataId?.startTime + ' - ' + dataId?.endTime
		: '-';
	const shift =
		shiftPagi !== '-'
			? shiftPagi
			: shiftSiang !== '-'
			? shiftSiang
			: shiftMalam !== '-'
			? shiftMalam
			: null;
	const createBy = dataId?.createBy?.officerName;
	return (
		<>
			<table className="data-table">
				<tbody>
					<tr>
						<td>
							<Typography14
								title={shift + ' - ' + 'by' + ' ' + createBy}
								fontWeight={700}
							/>
						</td>
					</tr>
					<tr>
						<td>
							<Typography14
								title={
									'Tanggal:' +
									' ' +
									moment(dataId?.dateComplaint).format('dddd, DD MMMM YYYY')
								}
							/>
							{/* <Typography14
								title={'Jam Operasi:' + ' ' + dataId?.operationHours}
							/> */}
							<Typography14 title={'Periode Window Time:' + ' ' + time} />
							<Typography
								sx={{ fontSize: 14, fontWeight: 'normal', color: 'black' }}
								dangerouslySetInnerHTML={{
									__html: dataId?.information?.information,
								}}
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
}

export default BodyView;
