import { TableCell, TableRow } from '@mui/material'
import { styled, makeStyles, withStyles } from '@mui/styles'

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
  searchTxtButton: {
    width: '100%',
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      border: '3px',
      borderColor: '#A56C28',
      borderRadius: 5,
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#A56C28',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#A56C28',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },

  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  subTitle: {
    color: '#838383',
    fontSize: 11,
  },
}))

export const selectBoxStyles = {
  control: (styles) => ({
    ...styles,
    height: 32,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    border: '1px solid #6e6e6e',
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
}

export const noteStyles = {
  width: '100%',
  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    border: 1.5,
    borderColor: '#ababab',
    borderRadius: 2,
  },
  '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ababab',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ababab',
  },
}

export const TabStyle = {
  color: 'gray',
  bgcolor: '#DCDCDC',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#BB7E36',
    color: '#fff',
    textDecoration: 'none',
  },
  '&.Mui-selected': {
    backgroundColor: '#BB7E36',
    color: '#fff',
  },
}

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
  borderRight: '2px solid #F6F7FF',
  borderLeft: '2px solid #F6F7FF',
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
export const Styles = {
  fontSmallGray: { color: 'primary.greyFont', fontSize: 9, mr: 1 },
  fontBig: { fontSize: { md: 15, xs: 10 }, fontWeight: 600 },
}

export const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
})

export const textPaperStyle = {
  color: '#35405B',
  fontSize: '20px',
  ml: 1,
}

export const tableRowAwalStyle = {
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
  overflow: 'hidden',
  bgcolor: '#fff',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  padding: '20px',
  border: 'none',
  fontWeight: 300,
  mb: 1,
}
export const tableRowAkhirStyle = {
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
  overflow: 'hidden',
  bgcolor: '#fff',
  padding: '20px',
  border: 'none',
  fontWeight: 300,
}

export const border = {
  borderBottomLeftRadius: 5,
  borderBottomRightRadius: 5,
  borderTopRightRadius: 5,
  borderTopLeftRadius: 5,
  overflow: 'hidden',
}

export const StickyTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#F6F7FF',
    color: theme.palette.common.white,
    left: 0,
    position: 'sticky',
    zIndex: theme.zIndex.appBar + 2,
  },
  body: {
    backgroundColor: '#F6F7FF',
    left: 0,
    position: 'sticky',
    zIndex: theme.zIndex.appBar + 1,
  },
}))(TableCell)

export const StyledStickyTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

export const StyledStickyTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)
