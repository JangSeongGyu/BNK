import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';

const FunctionList = () => {
    return (
        <Box
            sx={{
                width: (Theme) => Theme.spacing(30),
                bgcolor: 'primary.light',
                boxShadow: 1,
                borderRadius: 2,
                border: 1,
                borderColor: 'primary.borderColor',
                my: 3,
                mx: 2,
            }}
        >
            <List component="nav" aria-label="mailbox folders">
                <ListItem button divider>
                    <ListItemText primary="データ取込" />
                </ListItem>
                <ListItem button divider>
                    <ListItemText primary="出荷指定" />
                </ListItem>
                <ListItem button divider>
                    <ListItemText primary="帳票出力" />
                </ListItem>
            </List>
        </Box>
    );
};

export default FunctionList;
