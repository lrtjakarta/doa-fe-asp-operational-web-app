import { Box, IconButton, Typography } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import Typography14 from 'Component/Typography/Typography14';
const ColumnShapeInfo
 = callback => [
	{
		Header: 'No',
		accessor: '',
		Cell: ({ row }) => {
			return (
				<Box>
					<Typography14 title={row.index + 1} />
				</Box>
			);
		},
	},
	{
		Header: 'Informasi',
		accessor: 'information',
		Cell: ({ value }) => {
			return (
				<Box>
					 <Typography
            sx={{ fontSize: 13, mt: "10px", mb: "10px" }}
            dangerouslySetInnerHTML={{
              __html: value,
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
export default ColumnShapeInfo
;
