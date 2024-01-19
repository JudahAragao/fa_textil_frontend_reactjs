export const clienteJuridicoFields = [
    {
        name: 'clienteId',
        label: 'Pessoa Jurídica:',
    },
    {
        name: 'razaoSocial',
        label: 'Razão Social:',
    },
    {
        name: 'representante',
        label: 'Representante:',
    },
    {
        name: 'telefone',
        label: 'Telefone:',
    },
    {
        name: 'email',
        label: 'Email:',
    },
    {
        name: 'site',
        label: 'Site:',
    },
    {
        name: 'logradouro',
        label: 'Logradouro:',
    },
    {
        name: 'numeroImovel',
        label: 'Número do Imóvel:',
    },
    {
        name: 'bairro',
        label: 'Bairro:',
    },
    {
        name: 'complemento',
        label: 'Complemento:',
    },
    {
        name: 'cep',
        label: 'CEP:',
    },
    {
        name: 'inscricaoEstadual',
        label: 'Inscrição Estadual:',
    },
    {
        name: 'inscricaoMunicipal',
        label: 'Inscrição Municipal:',
    },
    {
        name: 'cnpj',
        label: 'CNPJ:',
    },
    {
        name: 'ativo',
        label: 'Ativo:',
    },
    {
        name: 'dataCadastro',
        label: 'Data de Cadastro:',
    },
];

export const clienteFisicoFields = [
    {
        name: 'clienteId',
        label: 'Pessoa Física:',
    },
    {
        name: 'nome',
        label: 'Nome do cliente:',
    },
    {
        name: 'telefone',
        label: 'Telefone:',
    },
    {
        name: 'email',
        label: 'Email:',
    },
    {
        name: 'logradouro',
        label: 'Logradouro:',
    },
    {
        name: 'numeroImovel',
        label: 'Número do Imóvel:',
    },
    {
        name: 'bairro',
        label: 'Bairro:',
    },
    {
        name: 'complemento',
        label: 'Complemento:',
    },
    {
        name: 'cep',
        label: 'CEP:',
    },
    {
        name: 'cpf',
        label: 'CPF:',
    },
    {
        name: 'ativo',
        label: 'Ativo:',
    },
    {
        name: 'dataCadastro',
        label: 'Data de Cadastro:',
    },
];

export const funcionarioFields = [
    {
        name: 'nome',
        label: 'Nome do Funcionário:',
    },
    {
        name: 'telefone',
        label: 'Telefone:',
    },
    {
        name: 'email',
        label: 'Email:',
    },
    {
        name: 'logradouro',
        label: 'Logradouro:',
    },
    {
        name: 'numeroImovel',
        label: 'Número do Imóvel:',
    },
    {
        name: 'bairro',
        label: 'Bairro:',
    },
    {
        name: 'complemento',
        label: 'Complemento:',
    },
    {
        name: 'cep',
        label: 'CEP:',
    },
    {
        name: 'cpf',
        label: 'CPF:',
    },
    {
        name: 'ativo',
        label: 'Ativo:',
    },
    {
        name: 'dataCadastro',
        label: 'Data de Cadastro:',
    },
]

export const produtoFields = [
    {
        name: 'descricaoProduto',
        label: 'Descrição do Produto:'
    },
    {
        name: 'valorProduto',
        label: 'Preço de Venda:'
    },
]

export const tamanhoFields = [
    {
        name: 'codProduto',
        label: ''
    },
    {
        name: 'tamanho',
        label: 'Tamanho do fardamento',
        options: [
            {
                name: 'PP',
                value: 'PP'
            },
            {
                name: 'P',
                value: 'P'
            },
            {
                name: 'M',
                value: 'M'
            },
            {
                name: 'G',
                value: 'G'
            },
            {
                name: 'GG',
                value: 'GG'
            },
            {
                name: 'XG',
                value: 'XG'
            },
        ]
    }
]

export const demandasFields = [
    {
        name:'tamanhoProdutoId',
        label: '',
    },
    {
        name:'descricaoDemanda',
        label: 'Descrição da Demanda:',
    },
    {
        name:'unidadeMedida',
        label: 'Unid. Medida:',
    },
    {
        name:'qtdeDemandada',
        label: 'QTDE:',
    },
    {
        name:'custoUnitarioDemandado',
        label: 'Preço de Custo Unit.',
    },
    {
        name:'tipoDemanda',
        label: 'Tipo da Demanda:',
        options: [
            {
                name:'Material',
                value:'material',
            },
            {
                name:'Serviço',
                value:'servico',
            }
        ]
    }
]