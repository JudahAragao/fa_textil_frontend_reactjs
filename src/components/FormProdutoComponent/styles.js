import styled from "styled-components";

export const Container = styled.div`
    width: 1084px;
    height: 100%;

    .input-forms-group {
        display: flex;
        margin-bottom: 25px;
        position: relative;

        .descricao {
            flex: 6;
        }

        .valor {
            margin: 0 20px;
            flex: 1;
        }

        .tamanho {
            flex: 1;
        }
    }

    .container-material-servico {
        display: flex;
        flex-direction: column;
        height: 300px;

        .tab-control {
            display: flex;

            svg {
                cursor: pointer;
            }

            .tab-material {
                path:nth-child(1){
                    fill: ${props => props.materialIsOpen ? '#CBD1DC' : 'white'};
                    transition: .1s;
                }

                path:nth-child(2){
                    fill: ${props => props.materialIsOpen ? '#CBD1DC' : 'white'};
                    transition: .1s;
                }

                path:nth-child(3){
                    fill: #10317A;
                }
            }

            .tab-servico {
                path:nth-child(1){
                    fill: ${props => props.servicoIsOpen ? '#CBD1DC' : 'white'};
                    transition: .1s;
                }

                path:nth-child(2){
                    fill: ${props => props.servicoIsOpen ? '#CBD1DC' : 'white'};
                    transition: .1s;
                }

                path:nth-child(3){
                    fill: #10317A;
                }
            }
        }

        .container-form {
            position: relative;
            width: 100%;
            height: 100%;

            .form-material,
            .form-servico {
                position: absolute;
                width: 100%;
                background-color: #CBD1DC;
            }

            .form-material {
                z-index: ${props => props.materialIsOpen === true ? '1' : '0'};
            }

            .form-servico {
                z-index: ${props => props.servicoIsOpen === true ? '1' : '0'};
            }
        }

    }

`

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    color: #10317A;
    font-size: 18px;

    th {
        height: 46px;
    }

    .row-form{
        background-color: #FFF;
    }
`;

export const Button = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background-color: #07BC2F;
    color: white;
    border: none;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    transition-duration: 0.4s;

    &:hover {
        background-color: #45a049;
    }
`;