import { styled } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

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

export const form = {
  boxShadow: 'inset -2px 2px 4px 0px #d9d9d9',
  width: '100%',
  height: 36,
  marginBottom: 1,
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

export default makeStyles((theme) => ({
  root: {
    flex: 1,
    marginTop: 60,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  littleTxt: {
    fontWeight: 450,
    fontSize: 13,

    color: '#b3b3b3',
    [theme.breakpoints.down('sm')]: {
      fontSize: 8,
    },
  },
  bigTxt: {
    fontSize: 15,
    color: '#000',
    [theme.breakpoints.down('sm')]: {
      fontSize: 11,
    },
  },
  boxTxt: {
    fontSize: 35,
    color: '#fff',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: 13,
    },
  },
  boxIcon: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
  },
}))

export const noteStyles = {
  width: 260,
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

export const infoStyles = {
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
}

export const submitBtnStyle = {
  color: '#fff',
  bgcolor: '#BB7E36',
  border: 'none',
  borderRadius: 2,
  textDecoration: 'none',
  textTransform: 'none',
  mr: 2,
  width: 150,
  '&:hover': {
    backgroundColor: '#BB7E36',
    color: '#fff',
  },
}

export const textFormStyle = {
  fontSize: '16px',
  mt: 2,
}

export const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
})
export const paperContent = {
  p: 2,
  boxShadow: ' 0px 0px 10px grey',
  maxWidth: '100%',
  padding: '20px 16px',
  flexGrow: 1,
  backgroundColor: (theme) =>
    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  borderRadius: 3,
  overflow: 'hidden',
}
export const boxIcon = {
  fontSize: 55,
  color: '#fff',
  textAlign: 'center',
}
