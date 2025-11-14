import { Box, IconButton, Typography } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import Typography14 from 'Component/Typography/Typography14';
const ColumnShapeCpa = callback => [
	{
		Header: 'Loop',
		accessor: 'loop',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'Indikator Sinyal',
		accessor: 'signalIndicator',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'Indikator PSD',
		accessor: 'psdIndicator',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'Radio Tetra',
		accessor: 'radioTetra',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'TRN',
		accessor: 'trn',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'ATS',
		accessor: 'ats',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'TCMS',
		accessor: 'tcms',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'CCTV Sarana',
		accessor: 'cctvFacility',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'CTM',
		accessor: 'ctm',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'PEI',
		accessor: 'pei',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'Reservasi Schedule',
		accessor: 'reservationSchedule',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'Track Mainline',
		accessor: 'trackMainline',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'Power',
		accessor: 'power',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},

	{
		Header: 'Aksi',
		accessor: '',
		Cell: ({ row }) => {
			const { onDelete } = callback;
			return (
				<Box>
					<IconButton onClick={() => onDelete(row.original)}>
						<DeleteOutlineOutlinedIcon sx={{ color: '#ED1C24' }} />
					</IconButton>
				</Box>
			);
		},
	},
];
export default ColumnShapeCpa;
