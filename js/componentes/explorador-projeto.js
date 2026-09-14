(function ( Guia ) {
    'use strict';

    const NOME_RAIZ = 'biblioteca-comunitaria/';

    class ExploradorProjeto {

        constructor( elemento, preferencias, visualizador ) {
            this.elemento = elemento;
            this.preferencias = preferencias;
            this.visualizador = visualizador;
            this.pastasAbertas = new Set( [ NOME_RAIZ ] );
        }

        iniciar() {
            this.desenhar();
            this.preferencias.aoAlterarLinguagem( 'backend', () => this.desenhar() );
            this.preferencias.aoAlterarLinguagem( 'frontend', () => this.desenhar() );
        }

        montarRaiz() {
            const { projetos } = Guia.dados;
            const backend = this.preferencias.linguagem( 'backend' );
            const frontend = this.preferencias.linguagem( 'frontend' );
            return {
                nome: NOME_RAIZ,
                filhos: [
                    projetos[ 'backend-' + backend ],
                    projetos[ 'frontend-' + frontend ],
                    ...projetos[ 'raiz-' + backend ].filhos,
                ],
            };
        }

        desenhar() {
            const lista = document.createElement( 'ul' );
            lista.className = 'explorador__lista';
            lista.setAttribute( 'role', 'tree' );
            lista.setAttribute( 'aria-label', 'Estrutura do projeto' );
            lista.append( this.criarItem( this.montarRaiz(), '' ) );
            this.elemento.replaceChildren( lista );
        }

        criarItem( no, caminhoPai ) {
            const caminho = caminhoPai + no.nome;
            const item = document.createElement( 'li' );
            item.className = 'explorador__item';
            item.setAttribute( 'role', 'none' );

            if ( ! no.filhos ) {
                item.append( this.criarArquivo( no, caminho.slice( NOME_RAIZ.length ) ) );
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
