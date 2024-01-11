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
        tamanho: '',
    });
    const [demanda, setDemanda] = useState({
        descricaoDemanda: '',
        unidadeMedida: '',
        qtdeDemandada: '',
        custoUnitarioDemandado: '',
        tipoDemanda: 'Material'
    })
    const [demandas, setDemandas] = useState([])

    const [materialIsOpen, setMaterialIsOpen] = useState(true);
    const [servicoIsOpen, setServicoIsOpen] = useState(false);

    const handleInputChangeProduto = (e) => {
        const { name, value } = e.target;
        setProduto((prevProduto) => ({ ...prevProduto, [name]: value }));
    };

    const handleInputChangeDemanda = (e) => {
        const { name, value } = e.target;
        setDemanda(prevDemanda => ({
            ...prevDemanda,
            [name]: value
        }));
    };

    const handleAddDemanda = (e) => {
        e.preventDefault()
        setDemandas(prevDemandas => ([...prevDemandas, demanda]))

        setDemanda({
            descricaoDemanda: '',
            unidadeMedida: '',
            qtdeDemandada: '',
            custoUnitarioDemandado: '',
            tipoDemanda: 'Material'
        });
    }

    const handleRemoveDemanda = (index) => {
        // Cria uma cópia do array de demandas sem o item a ser removido
        const updatedDemandas = demandas.filter((_, i) => i !== index);
        setDemandas(updatedDemandas);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            produto: {
                descricaoProduto: produto.descricaoProduto,
                valorProduto: produto.valorProduto,
                tamanho: produto.tamanho,
                demandas,
            },
        };

        console.log(dataToSend)

        if (mode === "cadastro") {
            await api.post('/produto', {
                descricaoProduto: dataToSend.produto.descricaoProduto,
                valorProduto: dataToSend.produto.valorProduto
            }).then(response => {
                api.post('/tamanhoproduto', {
                    codProduto: response.data.produtoId,
                    tamanho: dataToSend.produto.tamanho
                }).then(response => {
                    dataToSend.produto.demandas.map(demanda => {
                        api.post('/demandapproduto', {
                            tamanhoProdutoId: response.data.tamanhoProdutoId,
                            descricaoDemanda: demanda.descricaoDemanda,
                            unidadeMedida: demanda.unidadeMedida,
                            qtdeDemandada: demanda.qtdeDemandada,
                            custoUnitarioDemandado: demanda.custoUnitarioDemandado,
                            tipoDemanda: demanda.tipoDemanda
                        }).catch(e => {
                            console.log(e)
                        })
                    })
                }).catch(e => {
                    console.log(e)
                })
            }).catch(e => {
                console.log(e)
            })
        } else if (mode === "atualizacao") {
            await api.put(`/produto/${dado.produtoId}`, dataToSend);
        }

        await onUpdateRegister();
    };

    useEffect(() => {
        const fetchData = async () => {

            try {
                await api.get(`/produto/${dado.produtoId}`)
                    .then(response => {
                        setProduto({
                            descricaoProduto: response.data.descricaoProduto,
                            valorProduto: response.data.valorProduto,
                        })
                        api.get(`/tamanhoproduto/${response.data.produtoId}`)
                            .then(response => {
                                setProduto(prevProduto => ({
                                    ...prevProduto, tamanho: response.data.tamanho
                                }))
                                api.get(`/demandapproduto/${response.data.tamanhoProdutoId}`)
                                    .then(response => {
                                        setDemandas(response.data)
                                    })
                            })
                    })
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
                    value={produto.descricaoProduto}
                    onChange={handleInputChangeProduto}
                    margin={'m-sm'}
                />
            </div>
            <div className="valor">
                <InputComponent
                    name="valorProduto"
                    label="Valor:"
                    value={produto.valorProduto}
                    onChange={handleInputChangeProduto}
                    margin={'m-sm'}
                />
            </div>
            <div className="tamanho">
                <InputComponent
                    name="tamanho"
                    label="Tamanho:"
                    value={produto.tamanho}
                    onChange={handleInputChangeProduto}
                    margin={'m-sm'}
                    type="select"
                    options={[
                        { value: 'PP', label: 'PP' },
                        { value: 'P', label: 'P' },
                        { value: 'M', label: 'M' },
                        { value: 'G', label: 'G' },
                        { value: 'GG', label: 'GG' },
                        { value: 'XG', label: 'XG' },

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
                            {
                                demandas.map((demanda, demandaIndex) => {
                                    if (demanda.tipoDemanda === "Material") {
                                        return <tr key={demandaIndex}>
                                            <td> <p style={{ margin: '0 0 0 10px' }}>{demanda && demanda.descricaoDemanda}</p> </td>
                                            <td style={{ textAlign: 'center' }}>{demanda && demanda.unidadeMedida}</td>
                                            <td style={{ textAlign: 'center' }}>{demanda && demanda.qtdeDemandada}</td>
                                            <td style={{ textAlign: 'center' }}>{demanda && demanda.custoUnitarioDemandado}</td>
                                            <td style={{ textAlign: 'center' }}>{demanda && demanda.custoUnitarioDemandado * (demanda && demanda.qtdeDemandada)}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <S.Button bg={'#D80000'} bgHover={'#b30505'} onClick={() => handleRemoveDemanda(demandaIndex)}>X</S.Button>
                                            </td>
                                        </tr>
                                    }
                                })
                            }
                            <tr className="row-form">
                                <td style={{ width: '315px', padding: '0 5px' }}>
                                    <InputComponent
                                        name={`descricaoDemanda`}
                                        value={demanda.descricaoDemanda}
                                        onChange={(e) => handleInputChangeDemanda(e)}
                                        margin={'m-sm'}
                                    />
                                </td>
                                <td style={{ width: '80px', padding: '0 5px' }}>
                                    <InputComponent
                                        name={`unidadeMedida`}
                                        value={demanda.unidadeMedida}
                                        onChange={(e) => handleInputChangeDemanda(e)}
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
                                        value={demanda.qtdeDemandada}
                                        onChange={(e) => handleInputChangeDemanda(e)}
                                        margin={'m-sm'}
                                    />
                                </td>
                                <td align="center" style={{ width: '80px', padding: '0 5px' }}>
                                    <InputComponent
                                        name={`custoUnitarioDemandado`}
                                        value={demanda.custoUnitarioDemandado}
                                        onChange={(e) => handleInputChangeDemanda(e)}
                                        margin={'m-sm'}
                                    />
                                </td>
                                <td style={{ width: '90px', padding: '0 5px' }}></td>
                                <td style={{ textAlign: 'center', width: '5px', padding: '0 5px' }}>
                                    <S.Button bg={'#07BC2F'} bgHover={'#45a049'} onClick={handleAddDemanda} type="submit">+</S.Button>
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