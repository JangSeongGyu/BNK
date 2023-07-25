import { red, grey, pink, yellow } from '@mui/material/colors';

const SuperMarketDesign = (data) => {
    switch (data) {
        case 'BorderOption':
            return {
                border: 1,
                boxShadow: 1,
                p: 1,
                borderRadius: 2,
            };
        case 'calendarBoxTypo':
            return {
                fontSize: 24,
                fontWeight: 'bold',
            };
        case 'BtnOption':
            return {
                width: '100%',
                height: 50,
                border: 1,
                borderColor: 'primary.font',
                color: 'primary.font',
                fontWeight: 500,
                fontSize: 18,
                fontWeight: 'bold',
                fontFamily: '游ゴシック',
                backgroundColor: 'white',
                '&:hover': {
                    backgroundColor: 'primary.font',
                    color: 'white',
                },
            };
        case 'insListOption':
            return {
                minWidth: 350,
                borderRadius: 2,
                height: '100%',
                boxShadow: 5,
                width: '100%',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            };
        case 'insListResultOption':
            return {
                height: '40%',
                marginTop: 'auto',
                width: '100%',
                display: 'flex',
                borderRadius: 2,
                backgroundColor: grey[300],
            };
        case 'insListResultTypoOption':
            return {
                fontSize: 20,
                alignSelf: 'center',
                mx: 'auto',

                fontWeight: 'bold',
            };
        case 'insOutputOption':
            return {
                px: 1,
                py: 1,
                height: 50,
                fontSize: 20,
                border: 1,
                borderColor: grey[400],
                backgroundColor: grey[100],
            };
        case 'insTFOption':
            return {
                variant: 'filled',
                backgroundColor: 'white',
                width: '90%',
            };

        default:
            '';
    }
};

export default SuperMarketDesign;
