import { pink } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const SPTheme = createTheme({
    palette: {
        primary: {
            light: '#fafafa',
            main: pink[500],
            dark: 'white',
            font: pink[500],
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
        body: '"メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif',
        heading: '"Segoe UI", Roboto, sans-sefig',
        monospace: 'Menlo, monospace',
    },
});

export default SPTheme;
