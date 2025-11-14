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
};

export const appBarStyle = {
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  borderTopRightRadius: 10,
  borderTopLeftRadius: 10,
  overflow: 'hidden',
};

export const buttonStyle = {
  color: '#BB7E36',
  bgcolor: '#f2f2f2',
  border: 1,
  width: '30%',

  '&:hover': {
    backgroundColor: '#BB7E36',
    color: '#fff',
    border: 'none',
  },
  fontWeight: 'bold',
};
