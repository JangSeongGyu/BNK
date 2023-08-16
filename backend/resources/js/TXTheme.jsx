import { amber, blue, orange, pink } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const TXTheme = createTheme({
    typography: {
        fontFamily: `游ゴシック`,
    },

    palette: {
        primary: {
            light: '#fafafa',
            main: orange[500],
            dark: 'white',
            font: orange['A700'],
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

export default TXTheme;
