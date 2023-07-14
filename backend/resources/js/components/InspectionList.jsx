import { Grid, Modal, Typography, Box, Button } from '@mui/material';
import SuperMarketDesign from '../Design/SuperMarketDesign';
import { useNavigate } from 'react-router-dom';
import { red } from '@mui/material/colors';

const InspectionList = (props) => {
    var selectDate = props.selectDate;
    const BorderOption = SuperMarketDesign('BorderOption');
    const BtnOption = SuperMarketDesign('BtnOption');
    const calendarBoxTypo = SuperMarketDesign('calendarBoxTypo');

    let navigate = useNavigate();
    const BtnClick = () => {
        navigate('checking/' + selectDate);
    };
    return (
        <Box my={1} width={'100%'} sx={BorderOption}>
            <Typography sx={calendarBoxTypo}>検品</Typography>
            <Box sx={{ mb: 1 }}>
                <Button sx={BtnOption} onClick={() => BtnClick()}>
                    一次検品
                </Button>
            </Box>
            <Button sx={BtnOption}>二次検品</Button>
        </Box>
    );
};
export default InspectionList;
