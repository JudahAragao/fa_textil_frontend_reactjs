import React, { useEffect, useState } from "react";
import SelectComponent from "../SelectComponent";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import ButtonComponent from "../ButtonComponent";
import CadastroClienteComponent from "../CadastroClienteComponent";

import './styles.css'

const TableComponent = ({ data, columns, onUpdateRegister, exibirQtdeOptions, page, setPage, total, itemsPerPage, setItemsPerPage, onOpen }) => {

    console.log({ data, columns })

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

    const viewMoreTemplate = (rowData) => (
        <ButtonComponent
            label="+"
            onClick={() => {
                onOpen(<CadastroClienteComponent onUpdateRegister={onUpdateRegister} mode={'atualizacao'} dado={rowData} />);
            }}
            className="custom-button"
            typebtn="small"
            bgcolor="linear-gradient(85deg, #10317A 6.37%, #0065BA 73.64%)"
        />
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
                body={col.key === 'verMais' ? (rowData) => viewMoreTemplate(rowData) : (col.key === 'ativo' ? (rowData) => ativoTemplate(rowData) : undefined)}
            />
        ))}
    </DataTable>

}

export default TableComponent