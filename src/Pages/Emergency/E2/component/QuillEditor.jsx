import { alpha, Box, styled } from '@mui/material';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const EditorWrapper = styled(Box)(({ theme }) => {
	return {
		'& .ql-toolbar.ql-snow': {
			borderRadius: '8px 8px 0px 0px',
			border: `1px solid ${theme.palette.divider}`,
		},
		'& .ql-container.ql-snow': {
			borderRadius: '0px 0px 8px 8px',
			border: `1px solid ${theme.palette.divider}`,
		},
		'& .ql-editor': {
			fontSize: 12,
			minHeight: 200,
			fontWeight: 500,
			lineHeight: 1.5,
			color: theme.palette.text.primary,
			fontFamily: theme.typography.fontFamily,
		},
		'.ql-editor.ql-blank::before': {
			color: alpha(theme.palette.text.primary, 0.38),
			fontStyle: 'normal',
			lineHeight: 1.5,
		},
	};
}); // ------------------------------------------------

// ------------------------------------------------
const QuillEditor = ({ value, onChange }) => {
	return (
		<EditorWrapper>
			<ReactQuill
				theme="snow"
				value={value || ''}
				onChange={onChange}
				placeholder="Masukkan Informasi Anda ...."
			/>
		</EditorWrapper>
	);
};

export default QuillEditor;
