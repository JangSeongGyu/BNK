import { amber, grey, lightGreen, pink } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
    typography: {
        // fontFamily: `游ゴシック`,
    },
    palette: {
        primary: {
            main: grey[100],
            font: 'black',
            border: grey[400],
            scrollbar: grey[500],
            scrollbar_thumb: grey[300],
            glass: 'rgba(200, 200, 200, 0.6)',
            // glass: 'rgba(220, 220, 220, 0.1)',
            glass_dark: 'rgba(0, 0, 0, 0.1)',
        },
    },

    fonts: {
        body: '"メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif ,ヒラギノ角ゴシック',
        heading: '"Segoe UI", Roboto, sans-sefig',
        monospace: 'Menlo, monospace',
    },
});

export default Theme;
