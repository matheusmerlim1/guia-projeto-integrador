(function ( Guia ) {
    'use strict';

    const { PROJETO } = Guia.nucleo.terminal;

    const CABECALHO_TREE = 'Listagem de caminhos de pasta\nO número de série do volume é XXXX-XXXX\n';

    const observeTree = '<code>tree pasta /A</code> desenha a árvore de pastas usando só caracteres simples: <code>+---</code> marca uma pasta, <code>\\---</code> marca a última pasta de um nível e <code>|</code> liga os níveis. As duas primeiras linhas trazem o nome e o número de série do disco, que mudam em cada computador.';

    Guia.dados.terminais[ 'pastas.raiz' ] = {
        titulo: 'Prompt de Comando',
        entradas: [
            {
                titulo: 'Crie a pasta da documentação',
                explicacao: '<code>mkdir</code> (<em>make directory</em>) cria pastas. No Prompt de Comando, ele cria de uma vez as pastas intermediárias que ainda não existem: <code>docs\\diagramas</code> cria <code>docs</code> e, dentro dela, <code>diagramas</code>. No Windows, os caminhos usam barra invertida <code>\\</code>.',
                observe: 'Não aparece nada: as pastas foram criadas.',
                pasta: PROJETO,
                comando: String.raw`mkdir docs\diagramas`,
            },
            {
                titulo: 'Crie as pastas do front-end',
                explicacao: 'Várias pastas podem ser criadas no mesmo comando, separadas por espaço. As pastas são as mesmas para TypeScript e JavaScript.',
                pasta: PROJETO,
                comando: String.raw`mkdir frontend\e2e\pom frontend\feature frontend\pages frontend\src\emprestimo frontend\src\infra frontend\style frontend\test`,
            },
            {
                titulo: 'Confira a árvore do front-end',
                explicacao: '<code>tree</code> mostra as pastas em forma de árvore. A opção <code>/A</code> usa caracteres simples, que aparecem iguais em qualquer computador.',
                observe: observeTree,
                pasta: PROJETO,
                comando: 'tree frontend /A',
                saida: CABECALHO_TREE + String.raw`C:\PROJETOS\BIBLIOTECA-COMUNITARIA\FRONTEND
+---e2e
|   \---pom
+---feature
+---pages
+---src
|   +---emprestimo
|   \---infra
+---style
\---test`,
            },
        ],
    };

    const arvoreNode = CABECALHO_TREE + String.raw`C:\PROJETOS\BIBLIOTECA-COMUNITARIA\BACKEND
+---db
+---src
|   +---emprestimo
|   +---infra
|   +---leitor
|   \---livro
\---test`;

    const passosNode = {
        titulo: 'Prompt de Comando',
        entradas: [
            {
                titulo: 'Crie as pastas do back-end',
                explicacao: 'Em <code>src</code> fica o código, com uma pasta por funcionalidade e a pasta <code>infra</code> para o que é compartilhado. Os testes ficam em <code>test</code> e os scripts do banco em <code>db</code>.',
                observe: 'Não aparece nada: as pastas foram criadas.',
                pasta: PROJETO,
                comando: String.raw`mkdir backend\db backend\test backend\src\emprestimo backend\src\infra backend\src\leitor backend\src\livro`,
            },
            {
                titulo: 'Confira a árvore do back-end',
                observe: observeTree,
                pasta: PROJETO,
                comando: 'tree backend /A',
                saida: arvoreNode,
            },
        ],
    };

    Guia.dados.terminais[ 'pastas.backend' ] = {
        camada: 'backend',
        variantes: {
            php: {
                titulo: 'Prompt de Comando',
                entradas: [
                    {
                        titulo: 'Crie as pastas do back-end',
                        explicacao: 'Em <code>src</code> fica o código, com uma pasta por funcionalidade e a pasta <code>infra</code> para o que é compartilhado. Os testes do Kahlan ficam em <code>spec</code>, nome que ele procura por padrão, e os scripts do banco em <code>db</code>.',
                        observe: 'Não aparece nada: as pastas foram criadas.',
                        pasta: PROJETO,
                        comando: String.raw`mkdir backend\db backend\spec backend\src\emprestimo backend\src\infra backend\src\leitor backend\src\livro`,
                    },
                    {
                        titulo: 'Confira a árvore do back-end',
                        observe: observeTree,
                        pasta: PROJETO,
                        comando: 'tree backend /A',
                        saida: CABECALHO_TREE + String.raw`C:\PROJETOS\BIBLIOTECA-COMUNITARIA\BACKEND
+---db
+---spec
\---src
    +---emprestimo
    +---infra
    +---leitor
    \---livro`,
                    },
                ],
            },
            typescript: passosNode,
            javascript: passosNode,
            java: {
                titulo: 'Prompt de Comando',
                entradas: [
                    {
                        titulo: 'Crie as pastas do back-end no padrão do Maven',
                        explicacao: 'O Maven espera o código em <code>src\\main\\java</code>, os testes em <code>src\\test\\java</code> e os arquivos que não são código em <code>src\\main\\resources</code>. Dentro deles, as pastas seguem o pacote Java: <code>biblioteca\\emprestimo</code> corresponde ao pacote <code>biblioteca.emprestimo</code>.',
                        observe: 'Não aparece nada: as pastas foram criadas.',
                        pasta: PROJETO,
                        comando: String.raw`mkdir backend\src\main\java\biblioteca\emprestimo backend\src\main\java\biblioteca\infra backend\src\main\java\biblioteca\leitor backend\src\main\java\biblioteca\livro backend\src\main\resources\db backend\src\test\java\biblioteca\emprestimo`,
                    },
                    {
                        titulo: 'Confira a árvore do back-end',
                        observe: observeTree,
                        pasta: PROJETO,
                        comando: 'tree backend /A',
                        saida: CABECALHO_TREE + String.raw`C:\PROJETOS\BIBLIOTECA-COMUNITARIA\BACKEND
\---src
    +---main
    |   +---java
    |   |   \---biblioteca
    |   |       +---emprestimo
    |   |       +---infra
    |   |       +---leitor
    |   |       \---livro
    |   \---resources
    |       \---db
    \---test
        \---java
            \---biblioteca
                \---emprestimo`,
                    },
                ],
            },
        },
    };

})( window.Guia );
