import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

import Typography14 from 'Component/Typography/Typography14';
import moment from 'moment';
const ColumnShapeCpaList = callback => [
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
		Header: 'LRV',
		accessor: '',
		Cell: ({ row: { original } }) => {
			return (
				<Box>
					{original?.loops.map((item, i) => {
						return <Typography14 title={item.lrv?.numberLrv} />;
					})}
				</Box>
			);
		},
	},
	{
		Header: 'Daftar Loop',
		accessor: 'loops',
		Cell: ({ value }) => {
			return (
				<Box>
					{value?.map((item, i) => {
						return <Typography14 title={'Loop:' + ' ' + item.loop} />;
					})}
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
export default ColumnShapeCpaList;
