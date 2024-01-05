import styled from "styled-components";

import { Table } from "react-bootstrap";

export const TableWrapper = styled(Table).attrs({
    striped: true,
    bordered: true,
    hover: true,
})`
    width: calc(100%);
    border-collapse: collapse;
    border-radius: 5px;
    margin-bottom: 20px;
    color: #10317A;
    font-family: Roboto;
    font-size: 20px;
    font-weight: 700;
`;

TableWrapper.defaultProps = {
    striped: true,
    bordered: true,
    hover: true,
};

export const TableHeader = styled.tr`
    background-color: #CBD1DC;
    width: 100%;
    display: table;
    table-layout: fixed;
`;

export const TableHeaderCell = styled.th`
    padding: 10px;
    width: auto;
`;

export const TableBody = styled.tbody`
    width: 100%;
    display: table;
    table-layout: fixed;
`;

export const TableRow = styled.tr`
    border-bottom: 1px solid #ccc;
`;

export const TableCell = styled.td`
    padding: 10px;
    width: auto;
`;

export const TablePagination = styled.div`
    padding: 10px;
`;

export const TableFoot = styled.tfoot`
    background-color: #CBD1DC;
    width: 100%;
`

export const TableCellFoot = styled.td`
    width: 100%;
`;