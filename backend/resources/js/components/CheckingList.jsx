import { Grid, Modal, Typography, Box, Button } from '@mui/material';
import DesignOption from '../Design/DesignOption';
import { useNavigate } from 'react-router-dom';
import { red } from '@mui/material/colors';

const CheckingList = (props) => {
    var selectDate = props.selectDate;
    const pageType = props.pageType;
    const BorderOption = DesignOption('BorderOption');
    const BtnOption = DesignOption('BtnOption');
    const calendarBoxTypo = DesignOption('calendarBoxTypo');

    let navigate = useNavigate();
    const CheckingBtnClick = () => {
        navigate('checking/' + selectDate);
    };

    const Checking2BtnClick = () => {
        navigate('checking2/' + selectDate);
    };

    const Check2Btn = () => {
        return (
            <Button sx={BtnOption} onClick={() => Checking2BtnClick()}>
                二次検品
            </Button>
        );
    };

    const CheckCheck2Btn = () => {
        if (pageType == 'supermarket') return <Check2Btn />;
    };
    return (
        <Box my={1} width={'100%'} sx={BorderOption}>
            <Typography sx={calendarBoxTypo}>検品</Typography>
            <Box mt={1} mb={1}>
                <Button sx={BtnOption} onClick={() => CheckingBtnClick()}>
                    一次検品
                </Button>
            </Box>
            <CheckCheck2Btn />
        </Box>
    );
};
export default CheckingList;
