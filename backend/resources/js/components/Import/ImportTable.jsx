import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ImportTableRows from './ImportTableRows';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 13,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const ImportTable = (props) => {
    const { header, rows } = props;
    // const
    return (
        <>
            <TableContainer sx={{ maxHeight: 700 }}>
                <Table stickyHeader aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell></StyledTableCell>
                            {header.map(function (item, index) {
                                if (item != 'sub') {
                                    return (
                                        <StyledTableCell
                                            align="left"
                                            key={index}
                                        >
                                            {item}
                                        </StyledTableCell>
                                    );
                                }
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <ImportTableRows row={row} key={index} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ImportTable;
