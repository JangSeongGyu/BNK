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
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
    },
}));

const ImportTableRows = (props) => {
    const { row, index } = props;
    const [open, setOpen] = useState(false);
    return (
        <>
            <StyledTableRow key={index}>
                <StyledTableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </StyledTableCell>
                {Object.keys(row).map(function (key, i) {
                    if (key != 'sub') {
                        return (
                            <StyledTableCell component="th" scope="row" key={i}>
                                {row[key]}
                            </StyledTableCell>
                        );
                    }
                })}
            </StyledTableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Sub Information
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    {Object.keys(row.sub).map(function (
                                        key1,
                                        i
                                    ) {
                                        return (
                                            <StyledTableRow key={i}>
                                                {Object.keys(row.sub[key1]).map(
                                                    function (key2, j) {
                                                        return (
                                                            // prettier-ignore
                                                            <StyledTableCell component="th" scope="row" key={j}>
                                                                {row.sub[key1][key2]}
                                                            </StyledTableCell>
                                                        );
                                                    }
                                                )}
                                            </StyledTableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default ImportTableRows;
