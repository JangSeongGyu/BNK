import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { grey, red } from '@mui/material/colors';
import { Box, ButtonBase, Typography } from '@mui/material';
const GuiObject = forwardRef((props, ref) => {
    const [positionX, setPositionX] = useState(0);
    const [positionY, setPositionY] = useState(0);
    const [clickPositionX, setClickPositionX] = useState(0);
    const [clickPositionY, setClickPositionY] = useState(0);
    const [dragging, setDragging] = useState(false);
    const objectData = props.data;

    useImperativeHandle(
        ref,
        () => ({
            UpdatePosition(data, type) {
                console.log(data);
                data = 100;
                if (type == 'x') {
                    SetObject(data, positionY);
                } else if (type == 'y') {
                    console.log('Y change =', positionY, data);
                    SetObject(positionX, data);
                }
            },
        }),
        [data]
    );

    useEffect(() => {
        if (dragging) {
            // setPositionX(props.x - clickPositionX);
            // setPositionY(props.y - clickPositionY);
            // SelectObject();
        }
    }, [props]);

    useEffect(() => {
        if (positionX == 0 && positionY == 0) {
            setPositionX(objectData.x);
            setPositionY(objectData.y);
        }
    }, []);

    const ClickBox = (e) => {
        // 相対座標
        setClickPositionX(e.nativeEvent.layerX);
        setClickPositionY(e.nativeEvent.layerY);

        // ObjectData取得
        SelectObject();

        // Dragging Check
        setDragging(true);
    };

    const DropBox = (e) => {
        console.log(e);

        // ObjectData取得
        SelectObject();
        setDragging(false);
    };

    const SelectObject = () => {
        const object = {
            id: objectData.id,
            x: positionX,
            y: positionY,
            title: objectData.title,
        };
        props.handleClickSelectedObject(object);
    };

    const SetObject = (x, y) => {
        setPositionX(x);
        setPositionY(y);
    };

    return (
        <Box
            zIndex={dragging ? 1 : 0}
            border={dragging ? 2 : 0}
            borderColor={dragging ? red[400] : 'black'}
            onMouseDown={(e) => {
                ClickBox(e);
            }}
            onMouseUp={(e) => {
                DropBox(e);
            }}
            sx={{
                position: 'absolute',
                backgroundColor: grey[200],
                width: 100,
                height: 100,
                left: positionX,
                top: positionY,
            }}
        >
            {objectData.title}
        </Box>
    );
});
export default GuiObject;
