import { Typography, Box } from '@mui/material';
import { cyan, grey } from '@mui/material/colors';

const MRowBoxOption = {
    width: 350,
    display: 'flex',
    justifyContent: 'center',
    borderBottom: 1,
    py: 0.5,
    borderColor: grey[400],
};

const LeftContentOption = {
    width: '45%',
};
const RightContentOption = {
    width: '45%',
};

const DetailMoreRow = (props) => {
    const data = props.data;
    const minWidth = props.minWidth;
    const bgColor = props.bgColor;
    return (
        <Box
            minWidth={minWidth}
            backgroundColor={bgColor}
            // borderBottom={1}
            borderColor={grey[400]}
        >
            <Box display={'flex'}>
                <Box my={3} px={2}>
                    <Typography fontSize={20} fontWeight={'bold'}>
                        Sub Infomation
                    </Typography>
                    <Box sx={MRowBoxOption}>
                        <Typography sx={LeftContentOption}>
                            問い合わせ番号
                        </Typography>
                        <Typography sx={RightContentOption}>
                            {data.問い合わせ番号}
                        </Typography>
                    </Box>
                    <Box sx={MRowBoxOption}>
                        <Typography sx={LeftContentOption}>
                            店舗コード
                        </Typography>
                        <Typography sx={RightContentOption}>
                            {data.店舗コード}
                        </Typography>
                    </Box>
                    <Box sx={MRowBoxOption}>
                        <Typography sx={LeftContentOption}>
                            シーンコード
                        </Typography>
                        <Typography sx={RightContentOption}>
                            {data.シーンコード}
                        </Typography>
                    </Box>
                    <Box sx={MRowBoxOption}>
                        <Typography sx={LeftContentOption}>シーン名</Typography>
                        <Typography sx={RightContentOption}>
                            {data.シーン名}
                        </Typography>
                    </Box>
                    <Box sx={MRowBoxOption}>
                        <Typography sx={LeftContentOption}>
                            注文明細No
                        </Typography>
                        <Typography sx={RightContentOption}>
                            {data.注文明細No}
                        </Typography>
                    </Box>
                </Box>

                {/* 2番ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー */}
                <Box my={3} px={2}>
                    <Typography
                        height={30}
                        fontSize={20}
                        fontWeight={'bold'}
                    ></Typography>
                    <Box sx={MRowBoxOption}>
                        <Typography sx={LeftContentOption}>
                            納品予定日
                        </Typography>
                        <Typography sx={RightContentOption}>
                            {data.納品予定日}
                        </Typography>
                    </Box>
                    <Box sx={MRowBoxOption}>
                        <Typography sx={LeftContentOption}>
                            出荷指示フラグ
                        </Typography>
                        <Typography sx={RightContentOption}>
                            {data.出荷指示フラグ}
                        </Typography>
                    </Box>
                    <Box sx={MRowBoxOption}>
                        <Typography sx={LeftContentOption}>
                            一次梱包フラグ
                        </Typography>
                        <Typography sx={RightContentOption}>
                            {data.一次梱包フラグ}
                        </Typography>
                    </Box>
                    <Box sx={MRowBoxOption}>
                        <Typography sx={LeftContentOption}>
                            二次梱包フラグ
                        </Typography>
                        <Typography sx={RightContentOption}>
                            {data.二次梱包フラグ}
                        </Typography>
                    </Box>
                    <Box sx={MRowBoxOption}>
                        <Typography sx={LeftContentOption}>SFフラグ</Typography>
                        <Typography sx={RightContentOption}>
                            {data.SFフラグ}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
export default DetailMoreRow;