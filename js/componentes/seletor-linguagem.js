(function ( Guia ) {
    'use strict';

    class SeletorLinguagem {

        constructor( elemento, preferencias ) {
            this.elemento = elemento;
            this.preferencias = preferencias;
            this.camada = elemento.dataset.camada;
            this.rotulo = elemento.dataset.rotulo || 'Linguagem';
            this.linguagens = Guia.dados.linguagens[ this.camada ];
            this.botoes = new Map();
        }

        iniciar() {
            const grupo = document.createElement( 'div' );
            grupo.className = 'seletor-linguagem';

            const rotulo = document.createElement( 'span' );
            rotulo.className = 'seletor-linguagem__rotulo';
            rotulo.id = 'seletor-' + this.camada;
            rotulo.textContent = this.rotulo;

            grupo.append( rotulo, this.criarOpcoes(), this.criarLista() );
            this.elemento.replaceChildren( grupo );
            this.marcar( this.preferencias.linguagem( this.camada ) );
            this.preferencias.aoAlterarLinguagem( this.camada, id => this.marcar( id ) );
        }

        criarOpcoes() {
            const opcoes = document.createElement( 'div' );
            opcoes.className = 'seletor-linguagem__opcoes';
            opcoes.setAttribute( 'role', 'group' );
            opcoes.setAttribute( 'aria-labelledby', 'seletor-' + this.camada );
            for ( const linguagem of this.linguagens ) {
                const botao = document.createElement( 'button' );
                botao.type = 'button';
                botao.className = 'seletor-linguagem__opcao';
                botao.textContent = linguagem.rotulo;
                botao.addEventListener( 'click', () => this.preferencias.definirLinguagem( this.camada, linguagem.id ) );
                this.botoes.set( linguagem.id, botao );
                opcoes.append( botao );
            }
            return opcoes;
        }

        criarLista() {
            this.lista = document.createElement( 'select' );
            this.lista.className = 'seletor-linguagem__lista';
            this.lista.setAttribute( 'aria-labelledby', 'seletor-' + this.camada );
            for ( const linguagem of this.linguagens ) {
                this.lista.append( new Option( linguagem.rotulo, linguagem.id ) );
            }
            this.lista.addEventListener( 'change', () => this.preferencias.definirLinguagem( this.camada, this.lista.value ) );
            return this.lista;
        }

        marcar( id ) {
            for ( const [ idBotao, botao ] of this.botoes ) {
                botao.setAttribute( 'aria-pressed', String( idBotao === id ) );
            }
            this.lista.value = id;
        }
    }

    Guia.componentes.SeletorLinguagem = SeletorLinguagem;

})( window.Guia );
