import { red, grey } from '@mui/material/colors';

const SuperMarketDesign = (data) => {
    switch (data) {
        case 'BorderOption':
            return {
                border: 1,
                py: 1,
                px: 2,
                borderRadius: 2,
            };
        case 'BtnOption':
            return {
                width: '100%',
                height: 50,
                border: 1,
            };
        case 'insListOption':
            return {
                minWidth: 300,
                borderRadius: 3,
                height: 400,
                boxShadow: 5,
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
                fontSize: 30,
                alignSelf: 'center',
                mx: 'auto',
            };
        case 'insOutputOption':
            return {
                p: 1,
                height: 50,
                backgroundColor: 'grey.200',
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
