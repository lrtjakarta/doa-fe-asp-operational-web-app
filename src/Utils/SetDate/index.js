import React from 'react';

const getCurrentDate = data => {
	const today = data ? data : new Date();
	return today.toISOString().split('T')[0]; // Mengambil bagian tanggal saja
};

export default getCurrentDate;
