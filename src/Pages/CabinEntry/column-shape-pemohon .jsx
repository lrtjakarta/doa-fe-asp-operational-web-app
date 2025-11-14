import { Box, IconButton, Typography } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import Typography14 from 'Component/Typography/Typography14';
const ColumnShapePemohon
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
		Header: 'Nama',
		accessor: 'officerName',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'NIK',
		accessor: 'idNumber',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'Jabatan',
		accessor: 'officerPosition',
		Cell: ({ value }) => {
			return (
				<Box>
					<Typography14 title={value} />
				</Box>
			);
		},
	},
	{
		Header: 'Departemen',
		accessor: 'officerDepartemen',
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
export default ColumnShapePemohon
;
