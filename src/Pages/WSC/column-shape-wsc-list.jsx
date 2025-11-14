import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

import Typography14 from 'Component/Typography/Typography14';
import moment from 'moment';
import Typography12 from 'Component/Typography/Typography12';
const ColumnShapeWscList = callback => [
	{
		Header: 'Tanggal',
		accessor: 'wscDate',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={moment(value).format('DD-MM-YYYY')} />
				</Box>
			);
		},
	},
	{
		Header: 'Shift',
		accessor: 'wscShift',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},

	{
		Header: 'Nama Petugas',
		accessor: 'createBy',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value?.officerName} />
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
export default ColumnShapeWscList;
