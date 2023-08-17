import { lightGreen, pink } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const SPTheme = createTheme({
    typography: {
        fontFamily: `游ゴシック`,
    },

    palette: {
        primary: {
            light: '#fafafa',
            main: lightGreen[700],
            dark: 'white',
            font: lightGreen[700],
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
    fonts: {
        body: '"メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif ,ヒラギノ角ゴシック',
        heading: '"Segoe UI", Roboto, sans-sefig',
        monospace: 'Menlo, monospace',
    },
});

export default SPTheme;
