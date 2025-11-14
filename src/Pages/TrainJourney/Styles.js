import { Switch } from '@mui/material';
import { styled, makeStyles } from '@mui/styles';

export default makeStyles(theme => ({
	root: {
		flex: 1,
		marginTop: 60,
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
	},
	table: {
		minWidth: 650,
		borderRadius: 3,
		[theme.breakpoints.down('sm')]: {
			display: 'flex',
		},
	},
	tableHead: {
		[theme.breakpoints.down('sm')]: {
			display: 'flex',
			flexDirection: 'column',
			textAlign: 'left',
			border: 'none',
		},
	},
	tableBody: {
		[theme.breakpoints.down('sm')]: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
	},
	buttonBase: {
		width: 100,
		height: 100,
	},

	searchTxt: {
		width: '100%',
		'& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
			border: 1.5,
			borderColor: '#fff',
			borderRadius: 5,
		},
		'&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
			borderColor: '#fff',
		},
		'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
			borderColor: '#fff',
		},
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},

	tableCellTxt: {
		padding: 0,
		fontSize: 12,
		[theme.breakpoints.down('md')]: {
			fontSize: 10,
			display: 'flex',
			flexDirection: 'column',
		},
	},
	tableLeftTxt: {
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		overflow: 'hidden',
		border: 'none',
		padding: 1,
		fontSize: 20,
		[theme.breakpoints.down('sm')]: {
			fontSize: 20,
			borderTopLeftRadius: 'none',
			borderBottomLeftRadius: 'none',
		},
	},

	tableRightTxt: {
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		overflow: 'hidden',
		border: 'none',
		[theme.breakpoints.down('sm')]: {
			borderTopRightRadius: 0,
			borderBottomRightRadius: 0,
		},
	},
	dateTxt: {
		width: '25%',
		[theme.breakpoints.down('md')]: {
			width: '25%',
		},
	},
}));

export const button = {
	height: '100%',
	width: '100%',
	bgcolor: '#BB7E36',
	borderRadius: 2,
	'&:hover': {
		backgroundColor: '#BB7E36',
		border: 'none',
	},
};

export const textJudulStyle = {
	fontWeight: 'bold',
	fontSize: '24px',
	color: '#BB7E36',
};

export const paperStyle = {
	margin: 'auto',
	paddingRight: 40,
	maxwidth: 350,
};

export const buttonBaseStyle = {
	ml: 2,
	mr: -3,
	m: 1,
};

export const buttonBaseDuaStyle = {
	width: 100,
	height: 100,
	ml: 2,
	mr: -5,
	mt: 1,
};

export const textPaperStyle = {
	cursor: 'pointer',
	color: '#35405B',
	fontSize: '40px',
	ml: 3,
};

export const textPaperSatuStyle = {
	color: '#fff',
	m: 'auto',
	ml: 0,
	mb: 5,
	fontSize: 20,
};

export const tableCellStyle = {
	padding: 1,
	color: '#35405B',
	fontWeight: 'bold',
	fontSize: '20px',
};

export const tableLeftStyle = {
	borderTopLeftRadius: 10,
	borderBottomLeftRadius: 10,
	overflow: 'hidden',
	border: 'none',
};

export const tableRightStyle = {
	borderTopRightRadius: 10,
	borderBottomRightRadius: 10,
	overflow: 'hidden',
	border: 'none',
};

export const Img = styled('img')({
	margin: 'auto',
	display: 'block',
	maxWidth: '100%',
	maxHeight: '100%',
});

export const List = styled('ul')({
	listStyle: 'none',
	padding: 0,
	margin: 0,
	display: 'flex',
});

// from switch
export const IOSSwitch = styled(props => (
	<Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
	borderRadius: 26 / 2,
	width: 200,
	height: 100,
	padding: 0,

	'& .MuiSwitch-switchBase': {
		padding: 0,
		marginLeft: 0,
		transitionDuration: '200ms',
		color: '#28A745',
		'&.Mui-checked': {
			transform: 'translateX(100px)',
			color: '#28A745',
			'& + .MuiSwitch-track': {
				backgroundColor: '#fff',
				opacity: 1,
				border: 0,
			},
			'&.Mui-disabled + .MuiSwitch-track': {
				opacity: 0.5,
			},
		},
		'&.Mui-focusVisible .MuiSwitch-thumb': {
			color: '#28A745',
			border: '6px solid #fff',
		},
		'&.Mui-disabled .MuiSwitch-thumb': {
			color: '#28A745',
		},
		'&.Mui-disabled + .MuiSwitch-track': {
			opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
		},
	},
	'& .MuiSwitch-thumb': {
		boxSizing: 'border-box',
		width: 100,
		height: 100,
	},
	'& .MuiSwitch-track': {
		borderRadius: 50,
		color: 'green',
		backgroundColor: '#fff',
		content: '"Tiba"',
		opacity: 1,
		transition: theme.transitions.create(['background-color'], {
			duration: 300,
		}),
	},
	'&:after, &:before': {
		color: ' #999999',
		fontSize: '17px',
		position: 'absolute',
		top: '35px',
	},
	'&:after': {
		content: "'Tiba'",
		left: '30px',
	},
	'&:before': {
		content: "'Berangkat'",
		right: '7px',
	},
}));

export const selectBoxStyles = {
	control: styles => ({
		...styles,
		height: 32,
		width: '100%',
		backgroundColor: '#ffffff',
		borderRadius: 5,
		border: '1px solid #6e6e6e',
	}),
	menuPortal: base => ({ ...base, zIndex: 9999 }),
};
