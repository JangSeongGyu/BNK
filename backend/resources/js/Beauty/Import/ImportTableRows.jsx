import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import Input from '@mui/material/Input';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontSize: 14,
    // backgroundColor: 'red',
    fontColor: 'white',
    whiteSpace: 'nowrap',
}));
const StickyTableCell = styled(TableCell)(({ theme }) => ({
    fontSize: 10,
    position: 'sticky',
    left: 0,
    backgroundColor: 'white',
    whiteSpace: 'nowrap',
}));
const InnerTableCell = styled(TableCell)(({ theme }) => ({
    fontSize: 15,
    backgroundColor: 'white',
    paddingBottom: 0,
    paddingTop: 0,
    border: 0,
}));

const READONLY = ['ID', '全住所', 'デポコード', 'エラーメッセージ'];
const ImportTableRows = (props) => {
    const { row, index } = props;

    const [subInfoOpen, setSubInfoOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    const openEditForm = (index) => {
        console.log(index);
    };
    return (
        <>
            <StyledTableRow key={index}>
                <StickyTableCell>
                    <IconButton
                        size="small"
                        onClick={() => setSubInfoOpen(!subInfoOpen)}
                    >
                        {subInfoOpen ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                    {row['エラーメッセージ'] !== '' ? (
                        <IconButton
                            size="small"
                            onClick={() => openEditForm(index)}
                        >
                            <EditIcon />
                        </IconButton>
                    ) : (
                        false
                    )}
                </StickyTableCell>
                {Object.keys(row).map(function (key, i) {
                    if (key != 'sub') {
                        if (row['エラーメッセージ'] == '') {
                            return (
                                <StyledTableCell key={i}>
                                    {row[key]}
                                </StyledTableCell>
                            );
                        } else {
                            if (READONLY.indexOf(key) !== -1) {
                                return (
                                    <StyledTableCell key={i}>
                                        {row[key]}
                                    </StyledTableCell>
                                );
                            } else {
                                return (
                                    <StyledTableCell key={i}>
                                        {row[key]}
                                    </StyledTableCell>
                                );
                            }
                        }
                    }
                })}
            </StyledTableRow>
            <StyledTableRow>
                <InnerTableCell colSpan={3}>
                    <Collapse in={subInfoOpen} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Sub Information
                            </Typography>
                            <Table size="small">
                                <TableBody>
                                    {Object.keys(row.sub).map(function (
                                        key1,
                                        i
                                    ) {
                                        return (
                                            <TableRow key={i}>
                                                {Object.keys(row.sub[key1]).map(
                                                    function (key2, j) {
                                                        return (
                                                            // prettier-ignore
                                                            <StyledTableCell key={j}>
                                                                {row.sub[key1][key2]}
                                                            </StyledTableCell>
                                                        );
                                                    }
                                                )}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </InnerTableCell>
            </StyledTableRow>
        </>
    );
};

export default ImportTableRows;
