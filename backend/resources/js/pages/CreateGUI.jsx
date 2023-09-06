import React, { useRef, useState } from 'react';
import { Box, ButtonBase, Input, TextField, Typography } from '@mui/material';
import GuiObject from '../components/GUIComponent/GuiObject';
import GuiSetting from '../components/GUIComponent/GuiSetting';
import { grey } from '@mui/material/colors';

const pageWidth = 1000;
const pageHeight = pageWidth * 1.42;

const MainBox = {
    height: pageHeight,
    width: pageWidth,
    minWidth: pageWidth,
    minHeight: pageHeight,

    // backgroundColor: grey[100],
    display: 'flex',
    border: 1,
};

const objects = [
    { id: 1, title: 'Code1', x: 100, y: 150 },
    { id: 2, title: 'Code2', x: 220, y: 170 },
    { id: 3, title: 'Code3', x: 340, y: 150 },
];

const CreateGUI = () => {
    const [positionX, setPositionX] = useState(0);
    const [positionY, setPositionY] = useState(0);
    const objRef = useRef({});

    const [selectedPositionX, setSelectedPositionX] = useState(0);
    const [selectedPositionY, setSelectedPositionY] = useState(0);
    const [selectedObject, setSelectedObject] = useState('');

    const handleMousePosition = (e) => {
        // console.log(e.clientX, pageWidth, e.clientY, pageHeight);
        if (e.clientX < pageWidth && e.clientY < pageHeight) {
            setPositionX(e.nativeEvent.pageX);
            setPositionY(e.nativeEvent.pageY);
        }
    };

    const handleClickSelectedObject = (data) => {
        setSelectedObject(data);
    };

    const UpdatePosition = (data, id, type) => {
        objRef.current[id].UpdatePosition(data, type);
    };

    return (
        <Box width={'100%'} height={'100%'}>
            <Typography
                position={'sticky'}
                top={0}
                height={0}
                width={0}
                left={0}
            >{`(${positionX},${positionY})`}</Typography>
            <Box display={'flex'} height={'100%'}>
                <Box
                    onMouseMove={(e) => {
                        handleMousePosition(e);
                    }}
                    sx={MainBox}
                >
                    {objects.map((data) => {
                        return (
                            <GuiObject
                                handleClickSelectedObject={
                                    handleClickSelectedObject
                                }
                                ref={(element) =>
                                    (objRef.current[data.id] = element)
                                }
                                data={data}
                                x={positionX}
                                y={positionY}
                            />
                        );
                    })}
                </Box>

                <GuiSetting
                    UpdatePosition={UpdatePosition}
                    selectedObject={selectedObject}
                />
            </Box>
        </Box>
    );
};
export default CreateGUI;
