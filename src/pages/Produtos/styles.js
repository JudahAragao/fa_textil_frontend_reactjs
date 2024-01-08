import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: calc(100vh -60px);
    display: flex;
    margin: 25px 65px;
    flex-direction: column;
`

// Cabeçalho da página
export const HeaderContainer = styled.div`
    height: 100px;
    display: flex;
    flex-direction: column;
`

// Conteudo dos status
export const StatusContent = styled.div`
    height: 140px;
    display: flex;

    div.status {
        height: 140px;
        width: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 13px 0 13px;
        font-family: Roboto;
        border-radius: 10px;
        color: white;

        p {
            font-size: 20px;
            margin: 0;
            font-weight: bold;
        }

        h4 {
            font-size: 80px;
            margin: 0;
            font-weight: bolder;
        }
    }

    div.status:nth-child(1) {
        margin-left: 0;
    }

    div.status:last-child {
        margin-right: 0;
    }
`

// Contaudo Botão
export const BtnContent = styled.div`
    display: flex;
    justify-content: flex-end;

    button {
        margin: 0 0 20px 0;
    }
`


//Corpo da página
export const BodyContainer = styled.div`
    width: 100%;
`

export const TableWrapper = styled.div`
    width: 100%;
    border-collapse: collapse;
    border-radius: 5px;
    margin-bottom: 20px;
    color: #10317A;
    font-family: Roboto;
    font-size: 20px;
    font-weight: 700;
`;

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