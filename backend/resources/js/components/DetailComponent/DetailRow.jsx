import {
    Typography,
    Box,
    Button,
    Divider,
    TextField,
    ButtonBase,
} from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import DetailMoreRow from './DetailMoreRow';
import { useState } from 'react';
import DetailTXMoreRow from './DetailTXMoreRow';

const DetailRow = (props) => {
    const data = props.data;
    const pageType = props.pageType;
    const rowWidth = props.rowWidth;
    const minWidth = props.minWidth;
    const bgColor = props.bgColor;

    const [open, setOpen] = useState(false);
    let rowCnt = 0;

    const ClickRow = () => {
        if (open == true) setOpen(false);
        else setOpen(true);
    };

    const checkMoreRow = () => {
        if (pageType == 'supermarket')
            return (
                <DetailMoreRow
                    bgColor={bgColor}
                    minWidth={minWidth}
                    data={data}
                />
            );
        else
            return (
                <DetailTXMoreRow
                    bgColor={bgColor}
                    minWidth={minWidth}
                    data={data}
                />
            );
    };

    const rowBodyOption = (index) => {
        return {
            minWidth: rowWidth[index],
            width: `${rowWidth[index]}%`,
            display: 'flex',
            alignItems: 'center',
            colorOption: 'black',
            borderTop: 1,
            borderColor: grey[400],
            py: 1,
        };
    };

    return (
        <Box key={data.id}>
            <Box
                onClick={() => ClickRow()}
                sx={{
                    display: 'flex',
                    minWidth: minWidth,
                    backgroundColor: bgColor,
                    // backgroundColor: yellow[50],
                    ':hover': { backgroundColor: grey[300] },
                }}
            >
                <Typography pl={1} sx={rowBodyOption(rowCnt++)}>
                    {data.ショップコード}
                </Typography>
                <Typography sx={rowBodyOption(rowCnt++)}>
                    {data.シーン名}
                    <br />
                    {data.店舗名}
                </Typography>
                <Typography sx={rowBodyOption(rowCnt++)}>
                    {data.納品先会社名}
                    <br />
                    {data.納品先住所}
                </Typography>
                <Typography sx={rowBodyOption(rowCnt++)}>
                    {data.納品先宛名}
                </Typography>

                <Typography sx={rowBodyOption(rowCnt++)}>
                    {data.数量}
                </Typography>
                <Typography sx={rowBodyOption(rowCnt++)}>
                    {data.出荷番号}
                </Typography>
                <Typography sx={rowBodyOption(rowCnt++)}>
                    {data.問い合わせ番号}
                </Typography>
            </Box>
            {open && checkMoreRow()}
        </Box>
    );
};

export default DetailRow;
