import { makeStyles } from '@mui/styles'
import { styled, useTheme } from '@mui/material/styles'
// import BadgeUnstyled, { badgeUnstyledClasses } from "@mui/base/BadgeUnstyled";

export default makeStyles((theme) => ({
  root: {
    flex: 1,
    marginTop: 60,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  tableLeftTxt: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: '17px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
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
  answerTxt: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  questionTxt: {
    fontSize: 16,
    color: '#000',
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  additionalTxt: {
    color: '#b3b3b3',
    fontWeight: 'bold',
    fontSize: 16,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  noteTxt: {
    color: '#000',
    fontSize: 16,
    fontWeight: 300,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  boxTxt: {
    mt: 3,
    width: '100%',
    height: 60,
    backgroundColor: 'green',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  textBoxTxt: {
    color: '#fff',
    margin: 'auto',
    alignItems: 'center',
    fontSize: 30,
    align: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },
  textGridTxt: {
    fontSize: 18,
    color: '#000',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  imgGridTxt: {
    width: 150,
    height: 150,
    [theme.breakpoints.down('sm')]: {
      width: 100,
      height: 100,
    },
  },
  customTable: {
    '& .MuiTableCell-sizeSmall': {
      padding: '6px 0px 6px 16px', // <-- arbitrary value
    },
  },
}))

export const tableLeftStyle = {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '17px',
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
  overflow: 'hidden',
}

export const tableTextCellStyle = {
  color: '#000',
  fontWeight: 'bold',
  fontSize: '17px',
  // borderRight: '2px solid #F6F7FF',
  // borderLeft: '2px solid #F6F7FF',
}

export const tableRightStyle = {
  color: '#000',
  fontWeight: 'bold',
  fontSize: '17px',
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
  overflow: 'hidden',
}

export const tableLeftIsiStyle = {
  fontSize: '17px',
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
  overflow: 'hidden',
  fontWeight: 400,
  border: 'none',
  color: '#000',
}

export const tableTextIsiStyle = {
  fontSize: '17px',
  border: 'none',
  fontWeight: 400,
  color: '#000',
  // display: "flex",
}

export const tableRightIsiStyle = {
  color: '#000',
  fontSize: '17px',
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
  overflow: 'hidden',
  border: 'none',
}

export const alamatStyle = {
  mb: 10,
  width: '100%',
  bgcolor: '#fff',
  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    border: 'none',
    borderColor: '#fff',
  },
  '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: '#fff',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#fff',
  },
}

export const border = {
  borderBottomLeftRadius: 5,
  borderBottomRightRadius: 5,
  borderTopRightRadius: 5,
  borderTopLeftRadius: 5,
  overflow: 'hidden',
}

export const tableStyle = {
  minWidth: 250,
  borderCollapse: 'separate',
  borderSpacing: '0px 10px',
  borderRadius: 3,
  '& .MuiTableCell-sizeSmall': {
    padding: '6px 0px 6px 16px', // <-- arbitrary value
  },
}

// const StyledTableCell = styled(TableCell)({
//   padding: 0,
// });

export const searchBorderStyle = {
  width: '100%',
  borderRadius: '7px',
  boxShadow: ' 0px -3px 3px grey',
  // ml: -4,
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
}
