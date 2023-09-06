import React, { useEffect, useRef, useState } from 'react';
import { Box, ButtonBase, Input, TextField, Typography } from '@mui/material';

const InputStyle = {
    height: 20,
    width: 50,
    maxRows: 1,
};

const GuiSetting = (props) => {
    const selectedObject = props.selectedObject;
    const [objectX, setObjectX] = useState(0);
    const [objectY, setObjectY] = useState(0);

    useEffect(() => {
        console.log('Change!');
        setObjectX(props.selectedObject.x);
        setObjectY(props.selectedObject.y);
    }, [props.selectedObject]);

    const handleTextField = (e) => {
        if (e.target.id == 'x') {
            setObjectX(e.target.value);
            props.UpdatePosition(e.target.value, selectedObject.id, 'x');
        } else if (e.target.id == 'y') {
            setObjectY(e.target.value);
            props.UpdatePosition(e.target.value, selectedObject.id, 'y');
        }
    };
    return (
        <Box
            position={'sticky'}
            top={0}
            right={0}
            ml={1}
            p={3}
            width={'100%'}
            height={300}
            border={1}
        >
            <Typography>Setting</Typography>
            <Typography>{selectedObject.title}</Typography>

            <Box display={'flex'}>
                <Typography sx={{ fontSize: 20 }}>X</Typography>
                <TextField
                    id="x"
                    type="number"
                    onChange={(e) => handleTextField(e)}
                    variant="standard"
                    sx={InputStyle}
                    value={objectX}
                />
            </Box>
            <Box display={'flex'}>
                <Typography sx={{ fontSize: 20 }}>Y</Typography>
                <TextField
                    id="y"
                    type="number"
                    onChange={(e) => handleTextField(e)}
                    variant="standard"
                    sx={InputStyle}
                    value={objectY}
                />
            </Box>
        </Box>
    );
};
export default GuiSetting;
