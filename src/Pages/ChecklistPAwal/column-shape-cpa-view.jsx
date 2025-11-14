import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

import Typography14 from 'Component/Typography/Typography14';
import moment from 'moment';
const ColumnShapeCpaView = callback => [
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
		Header: 'LRV',
		accessor: 'lrv',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value?.numberLrv} />
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
];
export default ColumnShapeCpaView;
