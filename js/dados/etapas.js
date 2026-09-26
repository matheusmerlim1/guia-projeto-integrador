(function ( Guia ) {
    'use strict';

    Guia.dados.etapas = [
        {
            numero: 0,
            id: 'exemplo',
            pagina: 'exemplo.html',
            titulo: 'O exemplo',
            resumo: 'O minimundo da Biblioteca Comunitária, as regras de negócio e as histórias de usuário que guiam todo o resto do guia.',
            situacao: 'pronta',
        },
        {
            numero: 1,
            id: 'git',
            titulo: 'Git e GitHub',
            resumo: 'Do repositório vazio ao merge: Ana cria o projeto, Bruno entra na dupla e os dois resolvem um conflito.',
            situacao: 'pronta',
            partes: [
                { id: 'git-comecar', pagina: 'git-comecar.html', titulo: 'Primeiros passos' },
                { id: 'git-branches', pagina: 'git-branches.html', titulo: 'Branches e merge' },
                { id: 'git-dupla', pagina: 'git-dupla.html', titulo: 'Trabalho em dupla' },
                { id: 'git-desfazer', pagina: 'git-desfazer.html', titulo: 'Desfazer e resumo' },
            ],
        },
        {
            numero: 2,
            id: 'modelagem',
            pagina: 'modelagem.html',
            titulo: 'Modelagem e diagramas',
            resumo: 'Como sair do texto do minimundo e chegar ao diagrama de classes do domínio e aos diagramas da arquitetura.',
            situacao: 'pronta',
        },
        {
            numero: 3,
            id: 'pastas',
            pagina: 'pastas.html',
            titulo: 'Pastas do projeto',
            resumo: 'Como organizar as pastas, criá-las pelo terminal e decidir o que entra no repositório.',
            situacao: 'pronta',
        },
        {
            numero: 4,
            id: 'backend',
            titulo: 'Back-end e testes',
            resumo: 'Da configuração do projeto às rotas da API, com um teste para cada regra de negócio.',
            situacao: 'pronta',
            partes: [
                { id: 'backend-projeto', pagina: 'backend-projeto.html', titulo: 'Projeto e contratos' },
                { id: 'backend-gestor', pagina: 'backend-gestor.html', titulo: 'Gestor e testes' },
                { id: 'backend-api', pagina: 'backend-api.html', titulo: 'Rotas da API' },
            ],
        },
        {
            numero: 5,
            id: 'banco',
            titulo: 'Banco de dados e fetch',
            resumo: 'Criar o banco com scripts, ligar os repositórios a ele, testar as rotas e buscar os dados no front-end.',
            situacao: 'pronta',
            partes: [
                { id: 'banco-instalar', pagina: 'banco-instalar.html', titulo: 'Instalar o banco' },
                { id: 'banco-criar', pagina: 'banco-criar.html', titulo: 'Criar e ligar ao repositório' },
                { id: 'banco-testes', pagina: 'banco-testes.html', titulo: 'Testes de integração e rotas' },
                { id: 'banco-fetch', pagina: 'banco-fetch.html', titulo: 'Buscar os dados com fetch' },
            ],
        },
        {
            numero: 6,
            id: 'frontend',
            titulo: 'Front-end e testes',
            resumo: 'A tela de empréstimos com visão, controladora e serviço separados, com testes de unidade e de ponta a ponta.',
            situacao: 'pronta',
            partes: [
                { id: 'frontend-configurar', pagina: 'frontend-configurar.html', titulo: 'Configurar e montar a página' },
                { id: 'frontend-tela', pagina: 'frontend-tela.html', titulo: 'Visão e controladora' },
                { id: 'frontend-rodar', pagina: 'frontend-rodar.html', titulo: 'Rodar a aplicação' },
                { id: 'frontend-fluxo', pagina: 'frontend-fluxo.html', titulo: 'O caminho de uma ação' },
                { id: 'frontend-testes', pagina: 'frontend-testes.html', titulo: 'Testes e versão final' },
            ],
        },
    ];

})( window.Guia );
