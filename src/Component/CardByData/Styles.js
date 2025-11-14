import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  root: {
    flex: 1,
    marginTop: 60,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  mainTxt: {
    fontWeight: 600,
    color: '#000',
    mt: 14,
    fontSize: 24,
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },
  },
  secondTxt: {
    fontWeight: 500,
    fontSize: 16,
    color: '#000',
    [theme.breakpoints.down('sm')]: {
      fontSize: 6,
    },
  },
  littleTxt: {
    width: 170,
    fontWeight: 450,
    fontSize: 13,

    color: '#b3b3b3',
    [theme.breakpoints.down('sm')]: {
      fontSize: 8,
    },
  },
  bigTxt: {
    width: 175,
    fontSize: 15,
    color: '#000',
    [theme.breakpoints.down('sm')]: {
      fontSize: 11,
    },
  },
  qr: {
    mt: 10,
    fontSize: 14,
    color: '#000',
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  buttonImg: {
    width: 128,
    height: 128,

    color: '#000',
    [theme.breakpoints.down('sm')]: {
      width: 108,
      height: 108,
    },
  },
  qrImg: {
    align: 'right',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'right',
    },
  },
}));

export const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export const paperContent = {
  p: 2,
  height: '100%',
  width: '100%',
  boxShadow: ' 0px 0px 10px grey',
  maxWidth: '100%',
  flexGrow: 1,
  backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
  borderRadius: 3,
  overflow: 'hidden',
};

export const boxTittle = {
  flexGrow: 1,
};

export const kode = {
  mt: 4,
};
