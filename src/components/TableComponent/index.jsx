import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import ButtonComponent from "../ButtonComponent";
import CadastroClienteComponent from "../CadastroClienteComponent";

import './styles.css'
import api from "../../services/api";
import * as S from './styles'

const TableComponent = ({ data, columns, onUpdateRegister, onOpen, component: Component }) => {

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

    const viewMoreTemplate = (rowData) => (
        <S.Button
            bg={'linear-gradient(85deg, #10317A 6.37%, #0065BA 73.64%)'}
            bgHover={'linear-gradient(85deg, #0065BA 6.37%, #10317A 73.64%)'}
            onClick={() => {
                onOpen(<Component onUpdateRegister={onUpdateRegister} mode={'atualizacao'} dado={rowData}/>);
            }}
        >
            <FaRegEdit style={{ fontSize: '20px' }} />
        </S.Button>
    );

    const deleteData = async (id) => {
        await api.delete(`/produto/${id}`)
    }

    const deleteTemplate = (rowData) => (
        <S.Button 
            bg={'linear-gradient(85deg, #990015 6.37%, #ff001a 73.64%)'} 
            bgHover={'linear-gradient(85deg, #ff001a 6.37%, #990015 73.64%)'} 
            onClick={() => deleteData(rowData.produtoId)}
        >
            <FaRegTrashAlt style={{ fontSize: '20px' }} />
        </S.Button>
    );


    const ativoTemplate = (rowData) => (
        <span>{rowData.ativo === 1 ? 'Ativo' : 'Inativo'}</span>
    );

    return <DataTable
        value={data}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: '50rem' }}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        paginatorLeft={paginatorLeft}
        paginatorRight={paginatorRight}
        scrollable scrollHeight="500px"
        size="small"
        className="custom-header"
    >
        {columns.map((col, i) => (
            <Column
                key={col.key}
                field={col.key}
                header={col.title}
                filter
                filterMatchMode="contains"
                className="custom-column-row"
                body={(rowData) => {
                    return (
                        <>
                            {col.key !== 'acao' && col.key !== 'ativo' && (
                                <span>{rowData[col.key]}</span>
                            )}
                            {col.key === 'acao' && (
                                <>
                                    {viewMoreTemplate(rowData)}
                                    {deleteTemplate(rowData)}
                                </>
                            )}
                            {col.key === 'ativo' && ativoTemplate(rowData)}
                        </>
                    );
                }}
            />
        ))}
    </DataTable>

}

export default TableComponent