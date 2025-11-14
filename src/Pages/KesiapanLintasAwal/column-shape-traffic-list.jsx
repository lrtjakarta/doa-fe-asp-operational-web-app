import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

import Typography14 from 'Component/Typography/Typography14';
import moment from 'moment';
const ColumnShapeTrafficList = callback => [
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
		Header: 'Dispatcher',
		accessor: 'createBy',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value?.name} />
				</Box>
			);
		},
	},
	{
		Header: 'Tim Jalbang',
		accessor: 'timName',
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
export default ColumnShapeTrafficList;
