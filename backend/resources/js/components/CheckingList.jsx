import { Grid, Modal, Typography, Box, Button } from '@mui/material';
import SuperMarketDesign from '../Design/SuperMarketDesign';
import { useNavigate } from 'react-router-dom';
import { red } from '@mui/material/colors';

const CheckingList = (props) => {
    var selectDate = props.selectDate;
    const pageType = props.pageType;
    const BorderOption = SuperMarketDesign('BorderOption');
    const BtnOption = SuperMarketDesign('BtnOption');
    const calendarBoxTypo = SuperMarketDesign('calendarBoxTypo');

    let navigate = useNavigate();
    const CheckingBtnClick = () => {
        navigate('checking/' + selectDate);
    };

    const Checking2BtnClick = () => {
        navigate('checking2/' + selectDate);
    };
    return (
        <Box my={1} width={'100%'} sx={BorderOption}>
            <Typography sx={calendarBoxTypo}>検品</Typography>
            <Box mt={1} mb={1}>
                <Button sx={BtnOption} onClick={() => CheckingBtnClick()}>
                    一次検品
                </Button>
            </Box>
            <Button sx={BtnOption} onClick={() => Checking2BtnClick()}>
                二次検品
            </Button>
        </Box>
    );
};
export default CheckingList;
