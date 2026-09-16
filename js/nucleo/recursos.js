/*
 * Carrega as folhas de estilo e os arquivos de código que todas as páginas do guia usam.
 * Existe para que cada página precise de uma única linha no <head>, em vez de repetir
 * dezenas de <link> e <script> iguais.
 *
 * Os <script> são criados com async = false: assim eles rodam na ordem desta lista,
 * como fariam com o atributo defer escrito direto no HTML.
 */
(function () {
    'use strict';

    const ESTILOS = [
        'css/tokens.css',
        'css/base.css',
        'css/layout.css',
        'css/componentes/aviso.css',
        'css/componentes/abas.css',
        'css/componentes/bloco-codigo.css',
        'css/componentes/explorador.css',
        'css/componentes/dialogo.css',
        'css/componentes/simulador.css',
        'css/componentes/busca.css',
        'css/componentes/diagrama.css',
        'css/componentes/etapa.css',
        'css/componentes/passos.css',
        'css/componentes/terminal.css',
        'css/componentes/tabela.css',
        'css/componentes/cartoes.css',
        'css/componentes/navegacao-etapas.css',
        'css/componentes/portfolio.css',
        'css/realce-sintaxe.css',
    ];

    const CODIGOS = [
        'js/nucleo/espaco-nomes.js',
        'js/nucleo/preferencias.js',
        'js/nucleo/projeto-atual.js',
        'js/nucleo/percurso.js',
        'js/dados/etapas.js',
        'js/dados/linguagens.js',
        'js/dados/projeto/backend-php.js',
        'js/dados/projeto/backend-typescript.js',
        'js/dados/projeto/backend-javascript.js',
        'js/dados/projeto/backend-java.js',
        'js/dados/projeto/frontend-typescript.js',
        'js/dados/projeto/frontend-javascript.js',
        'js/dados/projeto/raiz-php.js',
        'js/dados/projeto/raiz-typescript.js',
        'js/dados/projeto/raiz-javascript.js',
        'js/dados/projeto/raiz-java.js',
        'js/dados/exemplos/emprestimo-entidade.js',
        'js/dados/exemplos/emprestimo-apoio.js',
        'js/dados/exemplos/emprestimo-teste.js',
        'js/dados/arquivos/git.js',
        'js/dados/terminais/comum.js',
        'js/dados/terminais/git-inicio.js',
        'js/dados/terminais/git-branch.js',
        'js/dados/terminais/git-dupla.js',
        'js/dados/terminais/git-desfazer.js',
        'js/dados/terminais/pastas.js',
        'js/dados/terminais/backend.js',
        'js/dados/terminais/banco.js',
        'js/dados/terminais/frontend.js',
        'js/simulador/dados-simulados.js',
        'js/simulador/api-simulada.js',
        'js/simulador/tela-simulada.js',
        'js/componentes/realce-sintaxe.js',
        'js/componentes/bloco-codigo.js',
        'js/componentes/arquivo-fixo.js',
        'js/componentes/arquivo-do-projeto.js',
        'js/componentes/imagem-estrutura.js',
        'js/componentes/conteudo-por-variante.js',
        'js/componentes/visualizador-linguagens.js',
        'js/componentes/seletor-linguagem.js',
        'js/componentes/terminal.js',
        'js/componentes/passo-a-passo.js',
        'js/componentes/simulador-aplicacao.js',
        'js/componentes/visualizador-arquivo.js',
        'js/componentes/busca-na-pagina.js',
        'js/componentes/explorador-projeto.js',
        'js/componentes/casca.js',
        'js/componentes/cartoes-etapas.js',
        'js/componentes/navegacao-lateral.js',
        'js/app.js',
    ];

    const cabeca = document.head;

    for ( const estilo of ESTILOS ) {
        const elo = document.createElement( 'link' );
        elo.rel = 'stylesheet';
        elo.href = estilo;
        cabeca.append( elo );
    }

    for ( const codigo of CODIGOS ) {
        const script = document.createElement( 'script' );
        script.src = codigo;
        script.async = false;
        cabeca.append( script );
    }

})();
