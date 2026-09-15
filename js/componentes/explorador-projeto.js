(function ( Guia ) {
    'use strict';

    class ExploradorProjeto {

        constructor( elemento, projeto, visualizador ) {
            this.elemento = elemento;
            this.projeto = projeto;
            this.visualizador = visualizador;
            this.pastasAbertas = new Set( [ projeto.nomeRaiz ] );
        }

        iniciar() {
            this.desenhar();
            this.projeto.aoAlterar( () => this.desenhar() );
        }

        desenhar() {
            const lista = document.createElement( 'ul' );
            lista.className = 'explorador__lista';
            lista.setAttribute( 'role', 'tree' );
            lista.setAttribute( 'aria-label', 'Estrutura do projeto' );
            lista.append( this.criarItem( this.projeto.raiz(), '' ) );
            this.elemento.replaceChildren( lista );
        }

        criarItem( no, caminhoPai ) {
            const caminho = caminhoPai + no.nome;
            const item = document.createElement( 'li' );
            item.className = 'explorador__item';
            item.setAttribute( 'role', 'none' );

            if ( ! no.filhos ) {
                item.append( this.criarArquivo( no, caminho.slice( this.projeto.nomeRaiz.length ) ) );
                return item;
            }

            const detalhes = document.createElement( 'details' );
            detalhes.className = 'explorador__pasta';
            detalhes.open = this.pastasAbertas.has( caminho );
            detalhes.addEventListener( 'toggle', () => {
                if ( detalhes.open ) {
                    this.pastasAbertas.add( caminho );
                } else {
                    this.pastasAbertas.delete( caminho );
                }
            } );

            const resumo = document.createElement( 'summary' );
            resumo.className = 'explorador__linha explorador__linha--pasta';
            resumo.setAttribute( 'role', 'treeitem' );
            resumo.title = no.nota || no.nome;
            resumo.append( this.criarNome( no.nome.replace( /\/$/, '' ) ) );

            const filhos = document.createElement( 'ul' );
            filhos.className = 'explorador__lista';
            filhos.setAttribute( 'role', 'group' );
            filhos.append( ...no.filhos.map( filho => this.criarItem( filho, caminho ) ) );

            detalhes.append( resumo, filhos );
            item.append( detalhes );
            return item;
        }

        criarArquivo( no, caminho ) {
            const botao = document.createElement( 'button' );
            botao.type = 'button';
            botao.className = 'explorador__linha explorador__linha--arquivo';
            botao.setAttribute( 'role', 'treeitem' );
            botao.dataset.extensao = no.nome.split( '.' ).pop();
            botao.title = no.nota || no.nome;
            botao.append( this.criarNome( no.nome ) );
            botao.addEventListener( 'click', () => this.visualizador.abrir( caminho, no ) );
            return botao;
        }

        criarNome( texto ) {
            const nome = document.createElement( 'span' );
            nome.className = 'explorador__nome';
            nome.textContent = texto;
            return nome;
        }
    }

    Guia.componentes.ExploradorProjeto = ExploradorProjeto;

})( window.Guia );
