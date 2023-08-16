import { Grid, Modal, Typography, Box, Button } from '@mui/material';
import {
    BorderOption,
    BtnOption,
    ListTitleOption,
} from '../Design/DesignOption';
import { useNavigate } from 'react-router-dom';

const CheckingList = (props) => {
    const pageType = props.pageType;
    const selectDate = props.selectDate;
    let navigate = useNavigate();

    const Check2Btn = () => {
        return (
            <Button sx={BtnOption} onClick={() => navigate('./checking2')}>
                二次検品
            </Button>
        );
    };

    const Checking2Btn = () => {
        if (pageType == 'supermarket') return <Check2Btn />;
    };
    return (
        <Box my={1} width={'100%'} sx={BorderOption}>
            <Typography sx={ListTitleOption}>検品</Typography>
            <Box mt={1} mb={1}>
                <Button sx={BtnOption} onClick={() => navigate('./checking')}>
                    一次検品
                </Button>
            </Box>
            <Checking2Btn />
        </Box>
    );
};
export default CheckingList;
