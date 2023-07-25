import { amber, blue, orange, pink } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const EGTheme = createTheme({
    typography: {
        fontFamily: `游ゴシック`,
    },

    palette: {
        primary: {
            light: '#fafafa',
            main: '#7F001B',
            dark: 'white',
            font: '#7F001B',
            contrastText: '#fff',
            borderColor: '#bdbdbd',
        },
    },
    fonts: {
        body: '"メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif',
        heading: '"Segoe UI", Roboto, sans-sefig',
        monospace: 'Menlo, monospace',
    },
});

export default EGTheme;
