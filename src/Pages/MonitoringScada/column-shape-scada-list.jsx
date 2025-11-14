import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

import Typography14 from 'Component/Typography/Typography14';
import moment from 'moment';
const ColumnShapeScadaList = callback => [
	{
		Header: 'Tanggal',
		accessor: 'date',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={moment(value).format('DD-MM-YYYY')} />
				</Box>
			);
		},
	},

	{
		Header: 'Power 3rd Rail West Bond',
		accessor: 'railWest',
		Cell: ({ value }) => {
			const resultsCount = value.reduce(
				(acc, item) => {
					if (item.results === 'OK') acc.OK += 1;
					else if (item.results === 'NOK') acc.NOK += 1;
					else if (item.results === 'N/A') acc.NA += 1;
					return acc;
				},
				{ OK: 0, NOK: 0, NA: 0 }
			);
			return (
				<Box>
					<Typography14 title={'OK :' + ' ' + resultsCount?.OK} />
					<Typography14 title={'NOK :' + ' ' + resultsCount?.NOK} />
					<Typography14 title={'N/A :' + ' ' + resultsCount?.NA} />
				</Box>
			);
		},
	},
	{
		Header: 'Power 3rd Rail East Bond',
		accessor: 'railEast',
		Cell: ({ value }) => {
			const resultsCount = value.reduce(
				(acc, item) => {
					if (item.results === 'OK') acc.OK += 1;
					else if (item.results === 'NOK') acc.NOK += 1;
					else if (item.results === 'N/A') acc.NA += 1;
					return acc;
				},
				{ OK: 0, NOK: 0, NA: 0 }
			);
			return (
				<Box>
					<Typography14 title={'OK :' + ' ' + resultsCount?.OK} />
					<Typography14 title={'NOK :' + ' ' + resultsCount?.NOK} />
					<Typography14 title={'N/A :' + ' ' + resultsCount?.NA} />
				</Box>
			);
		},
	},
	{
		Header: 'Power 3rd Rail Depo',
		accessor: 'railDepo',
		Cell: ({ value }) => {
			const resultsCount = value.reduce(
				(acc, item) => {
					if (item.results === 'OK') acc.OK += 1;
					else if (item.results === 'NOK') acc.NOK += 1;
					else if (item.results === 'N/A') acc.NA += 1;
					return acc;
				},
				{ OK: 0, NOK: 0, NA: 0 }
			);
			return (
				<Box>
					<Typography14 title={'OK :' + ' ' + resultsCount?.OK} />
					<Typography14 title={'NOK :' + ' ' + resultsCount?.NOK} />
					<Typography14 title={'N/A :' + ' ' + resultsCount?.NA} />
				</Box>
			);
		},
	},
	{
		Header: 'RTU',
		accessor: 'rtu',
		Cell: ({ value }) => {
			const resultsCount = value.reduce(
				(acc, item) => {
					if (item.results === 'OK') acc.OK += 1;
					else if (item.results === 'NOK') acc.NOK += 1;
					else if (item.results === 'N/A') acc.NA += 1;
					return acc;
				},
				{ OK: 0, NOK: 0, NA: 0 }
			);
			return (
				<Box>
					<Typography14 title={'OK :' + ' ' + resultsCount?.OK} />
					<Typography14 title={'NOK :' + ' ' + resultsCount?.NOK} />
					<Typography14 title={'N/A :' + ' ' + resultsCount?.NA} />
				</Box>
			);
		},
	},
	{
		Header: 'MBS Radio Tetra',
		accessor: 'mbs',
		Cell: ({ value }) => {
			const resultsCount = value.reduce(
				(acc, item) => {
					if (item.results === 'OK') acc.OK += 1;
					else if (item.results === 'NOK') acc.NOK += 1;
					else if (item.results === 'N/A') acc.NA += 1;
					return acc;
				},
				{ OK: 0, NOK: 0, NA: 0 }
			);
			return (
				<Box>
					<Typography14 title={'OK :' + ' ' + resultsCount?.OK} />
					<Typography14 title={'NOK :' + ' ' + resultsCount?.NOK} />
					<Typography14 title={'N/A :' + ' ' + resultsCount?.NA} />
				</Box>
			);
		},
	},

	{
		Header: 'Aksi',
		accessor: '',
		Cell: ({ row }) => {
			const { onEdit, onView } = callback;
			return (
				<Box>
					<Tooltip title="Edit">
						<IconButton onClick={() => onEdit(row.original)}>
							<EditOutlinedIcon sx={{ color: '#3E97FF' }} />
						</IconButton>
					</Tooltip>
					<Tooltip title="View">
						<IconButton onClick={() => onView(row.original)}>
							<ArticleOutlinedIcon sx={{ color: '#3E97FF' }} />
						</IconButton>
					</Tooltip>
				</Box>
			);
		},
	},
];
export default ColumnShapeScadaList;
