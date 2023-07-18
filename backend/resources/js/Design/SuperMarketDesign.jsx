import { red, grey, pink } from '@mui/material/colors';

const SuperMarketDesign = (data) => {
    switch (data) {
        case 'BorderOption':
            return {
                border: 1,
                p: 1,
                backgroundColor: 'white',
                borderRadius: 2,
            };
        case 'calendarBoxTypo':
            return {
                fontSize: 24,
                color: pink[500],
            };
        case 'BtnOption':
            return {
                width: '100%',
                height: 50,
                border: 1,
                borderColor: pink[500],
                color: pink[500],
                backgroundColor: 'white',
                '&:hover': {
                    backgroundColor: pink[500],
                    color: 'white',
                    // boxShadow: 'none',
                },
            };
        case 'insListOption':
            return {
                minWidth: 300,
                borderRadius: 3,
                height: '100%',
                boxShadow: 3,
                width: '50%',
                borderColor: red[500],
                backgroundColor: grey[100],
                display: 'flex',
                flexDirection: 'column',
            };
        case 'insListResultOption':
            return {
                height: '30%',
                marginTop: 'auto',
                display: 'flex',
                borderRadius: 2,
                backgroundColor: grey[300],
            };
        case 'insListResultTypoOption':
            return {
                fontSize: 20,
                alignSelf: 'center',
                mx: 'auto',
            };
        case 'insOutputOption':
            return {
                px: 1,
                py: 1,
                height: 50,
                fontSize: 20,
                border: 1,
                borderColor: grey[400],
                // boxShadow: 1,
                backgroundColor: grey[100],
            };
        case 'insTFOption':
            return {
                variant: 'filled',
                backgroundColor: 'white',
                width: '100%',
            };

        default:
            '';
    }
};

export default SuperMarketDesign;
