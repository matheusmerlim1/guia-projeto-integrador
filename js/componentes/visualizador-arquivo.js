(function ( Guia ) {
    'use strict';

    const PAGINAS_COM_SIMULACAO = [ 'frontend/index.html', 'frontend/pages/emprestimos.html', 'frontend/pages/404.html' ];

    class VisualizadorArquivo {

        constructor( simulador ) {
            this.simulador = simulador;
            this.dialogo = this.criarDialogo();
            document.body.append( this.dialogo );
        }

        criarDialogo() {
            const dialogo = document.createElement( 'dialog' );
            dialogo.className = 'dialogo dialogo-arquivo';
            dialogo.setAttribute( 'aria-labelledby', 'dialogo-arquivo-titulo' );

            const cabecalho = document.createElement( 'header' );
            cabecalho.className = 'dialogo__cabecalho';

            this.titulo = document.createElement( 'h2' );
            this.titulo.className = 'dialogo__titulo dialogo__titulo--codigo';
            this.titulo.id = 'dialogo-arquivo-titulo';

            const fechar = document.createElement( 'button' );
            fechar.type = 'button';
            fechar.className = 'dialogo__fechar';
            fechar.setAttribute( 'aria-label', 'Fechar' );
            fechar.textContent = '×';
            fechar.addEventListener( 'click', () => dialogo.close() );

            cabecalho.append( this.titulo, fechar );

            this.corpo = document.createElement( 'div' );
            this.corpo.className = 'dialogo__corpo';

            dialogo.append( cabecalho, this.corpo );
            dialogo.addEventListener( 'click', evento => {
                if ( evento.target === dialogo ) {
                    dialogo.close();
                }
            } );
            return dialogo;
        }

        abrir( caminho, no ) {
            this.titulo.textContent = caminho;
            const { BlocoCodigo } = Guia.componentes;
            const etapa = Guia.dados.etapas.find( e => e.numero === no.etapa );

            const informacoes = document.createElement( 'div' );
            informacoes.className = 'dialogo-arquivo__informacoes';

            const nota = document.createElement( 'p' );
            nota.className = 'dialogo-arquivo__nota';
            nota.textContent = no.nota;
            informacoes.append( nota );

            const acoes = document.createElement( 'div' );
            acoes.className = 'dialogo-arquivo__acoes';
            if ( PAGINAS_COM_SIMULACAO.includes( caminho ) ) {
                acoes.append( this.criarBotaoSimulacao() );
            }
            if ( etapa ) {
                acoes.append( this.criarLinkEtapa( etapa ) );
            }
            informacoes.append( acoes );

            const bloco = new BlocoCodigo( {
                caminho,
                codigo: no.codigo,
                linguagem: BlocoCodigo.linguagemDoCaminho( caminho ),
            } ).criarElemento();

            this.corpo.replaceChildren( informacoes, bloco );
            this.dialogo.showModal();
            this.corpo.scrollTop = 0;
        }

        criarBotaoSimulacao() {
            const botao = document.createElement( 'button' );
            botao.type = 'button';
            botao.className = 'botao botao--principal';
            botao.textContent = '▶ Ver como a página fica';
            botao.addEventListener( 'click', () => {
                this.dialogo.close();
                this.simulador.abrir();
            } );
            return botao;
        }

        criarLinkEtapa( etapa ) {
            const link = document.createElement( 'a' );
            link.className = 'dialogo-arquivo__etapa';
            link.href = '#' + etapa.id;
            link.textContent = 'Explicado na Etapa ' + etapa.numero + ': ' + etapa.titulo + ' →';
            link.addEventListener( 'click', () => this.dialogo.close() );
            return link;
        }
    }

    Guia.componentes.VisualizadorArquivo = VisualizadorArquivo;

})( window.Guia );
