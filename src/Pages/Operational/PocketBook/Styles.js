import { styled, useTheme } from '@mui/material/styles'

export const form = {
  boxShadow: 'inset -2px 2px 4px 0px #d9d9d9',
  width: '100%',
  height: 36,
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
export const searchBorderStyle = {
  width: '100%',
  marginRight: 2,
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

export const alamatStyle = {
  boxShadow: 'inset -2px 2px 4px 0px #d9d9d9',
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

export const justify = {
  m: 'auto',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
}

export const border = {
  borderBottomLeftRadius: 5,
  borderBottomRightRadius: 5,
  borderTopRightRadius: 5,
  borderTopLeftRadius: 5,
  overflow: 'hidden',
}

export const profileImageStyle = {
  height: 130,
  width: 130,
  borderRadius: '100%',
  backgroundColor: '#fff',
  marginBottom: -10,
  border: '#BB7E36',
}

export const tanggalStyle = {
  boxShadow: 'inset -2px 2px 4px 0px #d9d9d9',
  width: '100%',
  height: 36,
  bgcolor: '#fff',
  '& .MuiInputBase-root': {
    fontSize: 12,
    height: 34.5,
  },
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
  '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: '#fff',
  },
  '& svg': {
    color: '#BB7E36',
  },
}

export const textFormStyle = {
  fontSize: '16px',
  mt: 2,
}

export const formControlStyle = {
  '& .MuiFormLabel-root': {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  '& .MuiFormLabel-root.Mui-focused': {
    color: '#f2f2f2',
  },
}

export const formControlSelectStyle = {
  m: 1,
  minWidth: 120,
  boxShadow: 'inset -2px 2px 4px 0px #d9d9d9',
  width: '100%',
  height: 36,
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

export const buttonStyle = {
  width: { xs: '100%', lg: '70%', md: '80%' },
  shadow: 'none',
  color: '#BB7E36',
  border: 'none !important',
  bgcolor: '#f2f2f2',
  border: 0.5,
  borderRadius: 2,
  textDecoration: 'none',
  width: '30%',
  mr: 3,
  mt: 3,
  '&:hover': {
    backgroundColor: '#BB7E36',
    color: '#fff',
  },
}

export const judulStyle = {
  color: '#464748',
  fontWeight: 'bold',
  fontSize: '24px',
  ml: 0,
  mt: 1.5,
}

export const imageUploadStyle = {
  width: '100%',
  height: '100%',
  border: 'none',
  borderRadius: '100%',
  objectFit: 'cover',
}

export const iconImageUploadStyle = {
  width: 20,
  height: 20,
  color: '#BB7E36',
  ml: 6,
  mt: -5,
  backgroundColor: '#fff',
  borderRadius: '100%',
}

export const radioFormStyle = {
  '& svg': {
    width: 17,
    height: 17,
    color: '#BB7E36',
  },
}

export const centerStyle = {
  justifyContent: 'space-between',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
}

export const judulTextStyle = {
  color: '#464748',
  fontWeight: 'bold',
  fontSize: '24px',
  textAlign: 'left',
}

export const tableHeadStyle = {
  color: '#35405B',
  fontWeight: 'bold',
  fontSize: '16px',
}

export const tableStyle = {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '3px 3px',
  borderRadius: 3,
}

export const buttonTodayStyle = {
  bgcolor: '#fff',
  color: '#BB7E36',
  textTransform: 'none',
  fontWeight: 'bold',
  border: '1px solid #BB7E36',
  '&:hover': {
    backgroundColor: '#fff',
    border: '1px solid #BB7E36',
  },
}

export const buttonDownloadStyle = {
  bgcolor: '#BB7E36',
  textTransform: 'none',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#BB7E36',
    border: 'none',
  },
}

export const buttonAddStyle = {
  bgcolor: '#BB7E36',
  textTransform: 'none',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#fff',
    border: 'none',
  },
}

export const tableRowAwalStyle = {
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
  overflow: 'hidden',
  border: 'none',
  fontWeight: 300,
}

export const tableRowStyle = {
  border: 'none',
  fontWeight: 300,
}

export const tableRowAkhirStyle = {
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
  overflow: 'hidden',
  border: 'none',
}

export const textPaginationStyle = {
  bgcolor: 'none',
  border: 'none',
  color: '#86868C',
  mt: 1.5,
}

export const textKeteranganStyle = {
  color: '#35405B',
  fontWeight: 'bold',
  fontSize: '10px',
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

export const appBarStyle = {
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  borderTopRightRadius: 10,
  borderTopLeftRadius: 10,
  overflow: 'hidden',
}

export const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
})

export const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
})

export const tableRowAbsensiStyle = {
  border: 'none',
  fontWeight: 300,
  fontSize: '12px',
}

export const tableHeadAbsensiStyle = {
  color: '#35405B',
  fontWeight: 'bold',
  fontSize: '14px',
}

// export const tableStyle = {
//   minWidth: 250,
//   borderCollapse: "separate",
//   borderSpacing: "0px 10px",
//   borderRadius: 3,
//   "& .MuiTableCell-sizeSmall": {
//     padding: "6px 0px 6px 16px", // <-- arbitrary value
//   },
// }

export const tableLeftStyle = {
  // color: "#fff",
  fontWeight: 'bold',
  fontSize: '16px',
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
  overflow: 'hidden',
}

export const tableTextCellStyle = {
  color: '#000',
  fontWeight: 'bold',
  fontSize: '16px',
  // borderRight: '2px solid #F6F7FF',
  // borderLeft: '2px solid #F6F7FF',
}

export const tableRightStyle = {
  color: '#000',
  fontWeight: 'bold',
  fontSize: '16px',
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
  overflow: 'hidden',
}

export const tableLeftIsiStyle = {
  fontSize: '16px',
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
  overflow: 'hidden',
  fontWeight: 400,
  border: 'none',
  color: '#000',
}

export const tableTextIsiStyle = {
  fontSize: '16px',
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
