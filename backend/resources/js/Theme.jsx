import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
    palette: {
        primary: {
            light: '#fafafa',
            main: '#e91e63',
            dark: '#f06292',
            contrastText: '#fff',
            borderColor: '#bdbdbd',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

export default Theme;
