import React, { useContext, useEffect, useState, useRef } from 'react';
import { Box, Button, Grid, Stack, Dialog, Container } from '@mui/material';
import { useHistory } from 'react-router-dom';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import { useReactToPrint } from 'react-to-print';

import HeaderV1 from 'Component/CustomHeader/HeaderV1';
import Typography18 from 'Component/Typography/Typography18';
import HeaderPrintV2 from 'Component/CustomPrints/HeaderPrintV2';
import BodyPrint from './BodyPrintV1';

import TableEmergency from '../CustomTable';

import { EmergencyContext } from 'Context';
import { UserProfilContext } from 'Context';
import ApiOperational from 'Services/ApiOperational';

function List() {
	const history = useHistory();
	const componentRef = useRef();

	// context
	const { listEmergency7, getEmergency7 } = useContext(EmergencyContext);
	const { userProfile } = useContext(UserProfilContext);

	// state
	const [allData, setAllData] = useState([]);
	const [dialogDelete, setDialogDelete] = useState(false);
	const [dataRow, setDataRow] = useState(null);
	const [dialogPrint, setDialogPrint] = useState(false);

	// handle
	const handleForm = () => {
		const dataRow = null;
		history.push('form', { state: { dataRow: dataRow, type: 'Add' } });
	};

	const handleView = (row, user) => {
		history.push('view', { dataRow: row, userData: user });
	};

	const handleEdit = row => {
		history.push('form', { state: { dataRow: row, type: 'Edit' } });
	};

	const handleDelete = row => {
		setDialogDelete(true);
		setDataRow(row);
	};
	const handleDeleteData = async () => {
		const respon = await ApiOperational.deleteEmergency7(dataRow._id);
		if (respon) {
			setDialogDelete(false);
			getEmergency7();
		}
	};

	const handleOpenPrint = (row, user) => {
		setDialogPrint(true);
		setDataRow(row);
	};

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	// useEffect
	useEffect(() => {
		getEmergency7();
	}, []);

	useEffect(() => {
		setAllData(listEmergency7);
	}, [listEmergency7]);

	return (
		<Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={12}>
					<HeaderV1
						title="Emergency"
						sub1="Home -"
						sub2="Operasional -"
						sub3="List Emergency 7"
					/>
				</Grid>
				<Grid item xs={12} sm={12}>
					<TableEmergency
						allData={allData}
						userProfile={userProfile}
						handleForm={handleForm}
						handleView={handleView}
						handleOpenPrint={handleOpenPrint}
						handleEdit={handleEdit}
						handleDelete={handleDelete}
					/>
				</Grid>
			</Grid>

			{/* Dialog Delete */}
			<Dialog fullWidth={true} maxWidth="sm" open={dialogDelete}>
				<Box sx={{ p: 3 }}>
					<Box
						sx={{
							height: '150px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Typography18
							fontWeight={700}
							title="Apa Anda Yakin untuk menghapus data ini?"
						/>
					</Box>
					<Stack direction="row" justifyContent="center" spacing={1}>
						<Button
							variant="outlined"
							color="error"
							onClick={() => setDialogDelete(false)}
						>
							Close
						</Button>
						<Button
							variant="contained"
							color="error"
							onClick={handleDeleteData}
						>
							Delete
						</Button>
					</Stack>
				</Box>
			</Dialog>

			{/* Dialog Print */}
			<Dialog open={dialogPrint} fullScreen>
				<Container maxWidth="xl">
					<Stack
						direction="row"
						justifyContent="flex-end"
						spacing={2}
						sx={{ m: 3 }}
					>
						<Button
							sx={{ width: '100px' }}
							variant="outlined"
							onClick={() => setDialogPrint(false)}
						>
							Kembali
						</Button>
						<Button
							sx={{ width: '100px' }}
							variant="contained"
							onClick={handlePrint}
							startIcon={<PrintOutlinedIcon />}
						>
							Print
						</Button>
					</Stack>

					<div ref={componentRef}>
						<Box sx={{ p: 3 }}>
							<HeaderPrintV2
								title1="Emergency Form E.7"
								title2="Pemberian Izin Melaksanakan"
								title3="Perawatan Prasarana"
								number="LRTJ-FR-POP-007-g"
								revisi="01"
								page="Page 3 of 3"
							/>
							<BodyPrint dataId={dataRow} />
						</Box>
					</div>
				</Container>
			</Dialog>
		</Box>
	);
}

export default List;
