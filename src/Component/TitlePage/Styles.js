import { makeStyles } from '@mui/styles';
// import Colors from 'themes/Colors'

export default makeStyles((theme) => ({
    container: {
        flex:1,
        marginTop:40,
        width: '100%',
        [theme.breakpoints.down('sm')]: {
        marginTop:0
        }
    },
    backgroundTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '0px 100px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        marginTop:110,
        height: 150,
        width: '100%',
        backgroundPosition: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            background: 'red',
            marginTop:60,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '0px 20px',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '70px',
            width: '100%',
            backgroundPosition: 'center',
        }
    },
    titleBanner: {
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 36,
        textAlign: 'center',
        color: '#fff',
        [theme.breakpoints.down('sm')]: {
            fontSize: 18,
            lineHeight: 2,
        }
    }
}))