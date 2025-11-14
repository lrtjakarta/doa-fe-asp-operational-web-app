import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

import Typography14 from 'Component/Typography/Typography14';
import moment from 'moment';
import Typography12 from 'Component/Typography/Typography12';
const ColumnShapeMasterOH = callback => [
	{
		Header: 'Shift',
		accessor: 'shift',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'Informasi',
		accessor: 'information',
		Cell: ({ value }) => {
			const truncateText = (text, wordLimit) => {
				const words = text.split(' ');
				return words.length > wordLimit
					? words.slice(0, wordLimit).join(' ') + '...'
					: text;
			};
			return (
				<Box>
					<Typography
						sx={{ m: '0px 0', fontSize: 14 }}
						dangerouslySetInnerHTML={{
							__html: truncateText(value, 30),
						}}
					/>
				</Box>
			);
		},
	},
	{
		Header: 'Aksi',
		accessor: '',
		Cell: ({ row }) => {
			const { onEdit } = callback;
			return (
				<Box>
					<Tooltip title="Edit">
						<IconButton onClick={() => onEdit(row.original)}>
							<EditOutlinedIcon sx={{ color: '#3E97FF' }} />
						</IconButton>
					</Tooltip>
				</Box>
			);
		},
	},
];
export default ColumnShapeMasterOH;
