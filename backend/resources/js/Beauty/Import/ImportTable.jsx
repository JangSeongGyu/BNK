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
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    whiteSpace: 'nowrap',
    zIndex: 1,
    fontSize: 15,
}));
const StickyTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.common.black,
    position: 'sticky',
    left: 0,
    zIndex: 2,
    fontSize: 12,
}));

const ImportTable = (props) => {
    const { header, rows } = props;
    return (
        <>
            <TableContainer sx={{ maxHeight: 700, maxWidth: '100%' }}>
                <Table
                    stickyHeader
                    aria-label="customized table"
                    // size="small"
                    style={{
                        minWidth: '160%',
                    }}
                >
                    <TableHead style={{ width: '100%', minWidth: '80%' }}>
                        <TableRow>
                            <StickyTableCell />
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
                            <ImportTableRows
                                row={row}
                                index={index}
                                key={index}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ImportTable;
