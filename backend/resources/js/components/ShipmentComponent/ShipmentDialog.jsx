import ShipmentConfirmBox from './ShipmentConfirmBox';
import TXShipmentConfirmBox from './TXShipmentConfirmBox';

const ShipmentDialog = (props) => {
    const selectDate = props.selectDate;
    const logDatas = props.logDatas;
    const pageType = props.pageType;

    const TypeBox = () => {
        if (pageType == 'supermarket')
            return (
                <ShipmentConfirmBox
                    pageType={pageType}
                    handleClose={props.handleClose}
                    selectDate={selectDate}
                    logDatas={logDatas}
                />
            );
        else
            return (
                <TXShipmentConfirmBox
                    pageType={pageType}
                    handleClose={props.handleClose}
                    selectDate={selectDate}
                    logDatas={logDatas}
                />
            );
    };

    return <TypeBox />;
};
export default ShipmentDialog;
