import React, { useEffect, useState } from "react";

import InputComponent from "../InputComponent";
import ButtonComponent from "../ButtonComponent";
import api from "../../services/api";
import { ReactComponent as TabServico } from '../../assets/svg/aba-servico.svg';
import { ReactComponent as TabMaterial } from '../../assets/svg/aba-material.svg';

import * as S from './styles'

const FormProdutoComponent = ({ onUpdateRegister, mode, dado }) => {

    const [produto, setProduto] = useState({
        descricaoProduto: "",
        valorProduto: 0,
        tamanhos: [],  // Inicializar tamanhos como um array vazio
    });

    const [tamanho, setTamanho] = useState({
        tamanho: "",
        demandas: [
            {
                descricao: "",
                unidadeMedida: "UN",
                qtdeDemandada: 0,
                custoUnitarioDemanda: 0,
                tipoDemanda: "Material",
            },
        ],
    });

    const [materialIsOpen, setMaterialIsOpen] = useState(true);
    const [servicoIsOpen, setServicoIsOpen] = useState(false);

    const handleProdutoInputChange = (e) => {
        const { name, value } = e.target;
        setProduto((prevProduto) => ({ ...prevProduto, [name]: value }));
    };

    const handleTamanhoInputChange = (e) => {
        const { name, value } = e.target;
        setTamanho((prevTamanho) => ({ ...prevTamanho, demandas: [{ ...prevTamanho.demandas[0], [name]: value }] }));
    };

    const handleAddTamanho = () => {
        setProduto((prevProduto) => ({
            ...prevProduto,
            tamanhos: [...prevProduto.tamanhos, { tamanho: "", demandas: [] }],
        }));
    };

    const handleAddDemanda = () => {
        setTamanho((prevTamanho) => ({
            ...prevTamanho,
            demandas: [
                ...prevTamanho.demandas,
                {
                    descricao: tamanho.descricaoDemanda,
                    unidadeMedida: tamanho.unidadeMedida,
                    qtdeDemandada: tamanho.qtdeDemandada,
                    custoUnitarioDemanda: tamanho.custoUnitarioDemanda,
                    tipoDemanda: tamanho.tipoDemanda,
                },
            ],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            produto: {
                descricao: produto.descricaoProduto,
                valorProduto: produto.valorProduto,
                tamanhos: produto.tamanhos.map((tamanho) => ({
                    tamanho: tamanho.tamanho,
                    demandas: tamanho.demandas.map((demanda) => ({
                        descricao: demanda.descricao,
                        unidadeMedida: demanda.unidadeMedida,
                        qtdeDemandada: demanda.qtdeDemandada,
                        custoUnitarioDemanda: demanda.custoUnitarioDemanda,
                    })),
                })),
            },
        };

        console.log(dataToSend)

        if (mode === "cadastro") {
            await api.post('/produto', dataToSend);
        } else if (mode === "atualizacao") {
            await api.put(`/produto/${dado.produtoId}`, dataToSend);
        }

        await onUpdateRegister();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/produto/${dado.produtoId}`);
                const produtoData = response.data;
                setProduto({
                    descricaoProduto: produtoData.descricaoProduto,
                    valorProduto: produtoData.valorProduto,
                    tamanhos: produtoData.tamanhos,
                });
            } catch (error) {
                console.error("Erro ao obter dados do produto:", error);
            }
        };

        if (mode === "atualizacao" && dado.produtoId) {
            fetchData();
        }
    }, [mode, dado]);

    return <S.Container materialIsOpen={materialIsOpen} servicoIsOpen={servicoIsOpen}>
        <div className="input-forms-group">
            <div className="descricao">
                <InputComponent
                    name="descricaoProduto"
                    label="Descrição:"
                    value={produto.descricaoProduto}  // Alterado para produto.descricaoProduto
                    onChange={handleProdutoInputChange}  // Alterado para handleProdutoInputChange
                    margin={'m-sm'}
                />
            </div>
            <div className="valor">
                <InputComponent
                    name="valorProduto"
                    label="Valor:"
                    value={produto.valorProduto}  // Alterado para produto.valorProduto
                    onChange={handleProdutoInputChange}  // Alterado para handleProdutoInputChange
                    margin={'m-sm'}
                />
            </div>
            <div className="tamanho">
                <InputComponent
                    name="tamanho"
                    label="Tamanho:"
                    value={tamanho.tamanho}  // Alterado para tamanho.tamanho
                    onChange={handleTamanhoInputChange}  // Alterado para handleTamanhoInputChange
                    margin={'m-sm'}
                    type="select"
                    options={[
                        { value: 'PP', label: 'PP' },
                        { value: 'P', label: 'P' },
                        { value: 'M', label: 'M' },
                        { value: 'G', label: 'G' },
                        { value: 'GG', label: 'GG' },
                        { value: 'XG', label: 'XG' },
                        // Adicione mais opções conforme necessário
                    ]}
                />
            </div>
        </div>

        <div className="container-material-servico">
            <div className="tab-control">
                <TabMaterial className="tab-material" onClick={() => {
                    setServicoIsOpen(false)
                    setMaterialIsOpen(true)
                }} />
                <TabServico className="tab-servico" onClick={() => {
                    setMaterialIsOpen(false)
                    setServicoIsOpen(true)
                }} />
            </div>
            <div className="container-form">
                <div className="form-material">
                    <S.Table>
                        <thead>
                            <tr style={{ textAlign: 'left' }}>
                                <th>
                                    <p style={{ margin: '0 0 0 10px' }}>Material Demandado</p>
                                </th>
                                <th style={{ textAlign: 'center' }}>Unidade</th>
                                <th style={{ textAlign: 'center' }}>Qtde</th>
                                <th style={{ textAlign: 'center' }}>Custo Und</th>
                                <th style={{ textAlign: 'center' }}>Custo Total</th>
                                <th style={{ textAlign: 'center' }}>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produto.tamanhos.map((tamanho, tamanhoIndex) => (
                                <React.Fragment key={tamanhoIndex}>
                                    {Array.isArray(tamanho.demandas) && tamanho.demandas.map((item, demandaIndex) => (
                                        <tr key={demandaIndex}>
                                            <td>{item && item.descricao}</td>
                                            <td>{item && item.unidadeMedida}</td>
                                            <td>{item && item.qtdeDemandada}</td>
                                            <td>{item && item.custoUnitarioDemanda}</td>
                                            <td>{item && item.custoUnitarioDemanda * (item && item.qtdeDemandada)}</td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                            <tr className="row-form">
                                <td style={{ width: '315px', padding: '0 5px' }}>
                                    <InputComponent
                                        name={`descricao`}
                                        value={tamanho.demandas[0].descricao}
                                        onChange={(e) => handleTamanhoInputChange(e)}
                                        margin={'m-sm'}
                                    />
                                </td>
                                <td style={{ width: '80px', padding: '0 5px' }}>
                                    <InputComponent
                                        name={`unidadeMedida`}
                                        value={tamanho.demandas[0].unidadeMedida}
                                        onChange={(e) => handleTamanhoInputChange(e)}
                                        margin={'m-sm'}
                                        type="select"
                                        options={[
                                            { value: 'M', label: 'Metro' },
                                            { value: 'CM', label: 'Centímetro' },
                                            { value: 'KG', label: 'Quilograma' },
                                            { value: 'G', label: 'Grama' }
                                            // Adicione mais opções conforme necessário
                                        ]}
                                    />
                                </td>
                                <td style={{ width: '60px', padding: '0 5px' }}>
                                    <InputComponent
                                        name={`qtdeDemandada`}
                                        value={tamanho.demandas[0].qtdeDemandada}
                                        onChange={(e) => handleTamanhoInputChange(e)}
                                        margin={'m-sm'}
                                    />
                                </td>
                                <td align="center" style={{ width: '80px', padding: '0 5px' }}>
                                    <InputComponent
                                        name={`custoUnitarioDemanda`}
                                        value={tamanho.demandas[0].custoUnitarioDemanda}
                                        onChange={(e) => handleTamanhoInputChange(e)}
                                        margin={'m-sm'}
                                    />
                                </td>
                                <td style={{ width: '90px', padding: '0 5px' }}></td>
                                <td style={{ textAlign: 'center', width: '5px', padding: '0 5px' }}>
                                    <S.Button onClick={handleAddDemanda} type="submit">+</S.Button>
                                </td>
                            </tr>
                        </tbody>
                    </S.Table>
                </div>
                <div className="form-servico">
                    <h1>Demanda Servico</h1>
                </div>
            </div>
        </div>
        <ButtonComponent
            label="Novo Orçamento"
            onClick={handleSubmit}
            className="custom-button"
            typebtn="small"
            bgcolor="linear-gradient(85deg, #10317A 6.37%, #0065BA 73.64%)"
        />
    </S.Container>
}

export default FormProdutoComponent