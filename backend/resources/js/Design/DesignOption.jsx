import {
    red,
    grey,
    pink,
    green,
    yellow,
    indigo,
    lightBlue,
    blue,
} from '@mui/material/colors';

export const BorderOption = () => {
    return {
        border: 1,
        p: 1.5,
        borderRadius: 2,
        borderColor: grey[400],
        backgroundColor: 'white',
        boxShadow: 2,
    };
};

export const ListTitleOption = () => {
    return {
        fontSize: 24,
        fontWeight: 'bold',
    };
};

export const BtnOption = () => {
    return {
        width: '100%',
        height: 50,
        border: 1,
        borderColor: 'primary.main',
        color: 'primary.main',
        fontSize: { lg: 18, md: 16 },
        fontWeight: 'bold',
        fontFamily: '游ゴシック',
        backgroundColor: 'white',
        '&:hover': {
            backgroundColor: 'primary.main',
            color: 'white',
        },
    };
};
export const CheckingListBoxOption = (taskCnt, id) => {
    let border = 1;
    let borderColor = grey[400];
    if (taskCnt == id) {
        border = 2;
        borderColor = red[500];
    }
    return {
        border: border,
        minWidth: 300,
        borderColor: borderColor,
        borderRadius: 2,
        height: '100%',
        boxShadow: 2,
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };
};
export const CheckingListResultOption = () => {
    return {
        height: '40%',
        marginTop: 'auto',
        width: '100%',
        display: 'flex',
        borderRadius: 2,
        backgroundColor: grey[300],
    };
};
export const CheckingListResultTextOption = () => {
    return {
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center',
        mx: 'auto',
        fontWeight: 'bold',
    };
};
export const CheckingOutputBoxOption = () => {
    return {
        px: 1,
        py: 1,
        height: 50,
        fontSize: 20,
        border: 1,
        borderColor: grey[400],
        backgroundColor: grey[100],
    };
};
export const CheckingListInputOption = () => {
    return {
        variant: 'filled',
        backgroundColor: 'white',
        width: '90%',
    };
};
export const dialogYes = () => {
    return {
        width: '100%',
        color: green[700],
        border: 1,
        '&:hover': {
            backgroundColor: green[600],
            color: 'white',
        },
    };
};
export const dialogNo = () => {
    return {
        width: '100%',

        color: red[600],
        border: 1,
        '&:hover': {
            backgroundColor: red[600],
            color: 'white',
        },
    };
};

export const normalBtn = () => {
    return {
        width: '100%',

        color: green[600],
        border: 1,
        '&:hover': {
            backgroundColor: green[600],
            color: 'white',
        },
    };
};

export const UpdateBorderOption = () => {
    return {
        border: 1,
        p: 1,
        borderRadius: 1,
        borderColor: grey[400],
        backgroundColor: grey[200],
    };
};

export const pouchColor = () => {
    return {};
};
export const taxiColor = () => {
    return {};
};
export const eagleColor = () => {
    return {};
};
export const normalColor = () => {
    return {};
};
