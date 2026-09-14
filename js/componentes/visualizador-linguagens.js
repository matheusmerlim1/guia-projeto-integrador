(function ( Guia ) {
    'use strict';

    let contador = 0;

    class VisualizadorLinguagens {

        constructor( elemento, preferencias ) {
            this.elemento = elemento;
            this.preferencias = preferencias;
            this.camada = elemento.dataset.camada || 'backend';
            this.exemplo = Guia.dados.exemplos[ elemento.dataset.exemplo ];
            this.linguagens = ( Guia.dados.linguagens[ this.camada ] || [] )
                .filter( linguagem => this.exemplo && this.exemplo[ linguagem.id ] );
            this.prefixo = 'visualizador-' + ( ++contador );
            this.abas = new Map();
        }

        iniciar() {
            if ( this.linguagens.length === 0 ) {
                return;
            }
            this.painel = this.criarPainel();
            this.elemento.replaceChildren( this.criarAbas(), this.painel );
            this.selecionar( this.preferencias.linguagem( this.camada ) );
            this.preferencias.aoAlterarLinguagem( this.camada, id => this.selecionar( id ) );
        }

        criarAbas() {
            const lista = document.createElement( 'div' );
            lista.className = 'abas';
            lista.setAttribute( 'role', 'tablist' );
            lista.setAttribute( 'aria-label', 'Linguagem do exemplo' );

            for ( const linguagem of this.linguagens ) {
                const aba = document.createElement( 'button' );
                aba.type = 'button';
                aba.className = 'abas__aba';
                aba.id = this.prefixo + '-' + linguagem.id;
                aba.setAttribute( 'role', 'tab' );
                aba.setAttribute( 'aria-controls', this.prefixo + '-painel' );
                aba.textContent = linguagem.rotulo;
                if ( this.exemplo[ linguagem.id ].comando ) {
                    const detalhe = document.createElement( 'span' );
                    detalhe.className = 'abas__detalhe';
                    detalhe.textContent = linguagem.testes;
                    aba.append( detalhe );
                }
                aba.addEventListener( 'click', () => this.preferencias.definirLinguagem( this.camada, linguagem.id ) );
                aba.addEventListener( 'keydown', evento => this.navegarPorTeclado( evento, linguagem.id ) );
                this.abas.set( linguagem.id, aba );
                lista.append( aba );
            }
            return lista;
        }

        criarPainel() {
            const painel = document.createElement( 'div' );
            painel.className = 'abas__painel';
            painel.id = this.prefixo + '-painel';
            painel.setAttribute( 'role', 'tabpanel' );
            return painel;
        }

        selecionar( id ) {
            const linguagem = this.linguagens.find( l => l.id === id ) || this.linguagens[ 0 ];
            for ( const [ idAba, aba ] of this.abas ) {
                const ativa = idAba === linguagem.id;
                aba.setAttribute( 'aria-selected', String( ativa ) );
                aba.tabIndex = ativa ? 0 : -1;
            }
            this.painel.setAttribute( 'aria-labelledby', this.prefixo + '-' + linguagem.id );

            const variante = this.exemplo[ linguagem.id ];
            const ultimo = variante.arquivos.length - 1;
            const blocos = variante.arquivos.map( ( arquivo, indice ) => new Guia.componentes.BlocoCodigo( {
                caminho: arquivo.caminho,
                codigo: arquivo.codigo,
                linguagem: linguagem.realce,
                comando: indice === ultimo ? variante.comando : undefined,
            } ).criarElemento() );
            this.painel.replaceChildren( ...blocos );
        }

        navegarPorTeclado( evento, idAtual ) {
            const ids = this.linguagens.map( l => l.id );
            const indice = ids.indexOf( idAtual );
            const destinos = {
                ArrowRight: ( indice + 1 ) % ids.length,
                ArrowLeft: ( indice - 1 + ids.length ) % ids.length,
                Home: 0,
                End: ids.length - 1,
            };
            if ( ! ( evento.key in destinos ) ) {
                return;
            }
            evento.preventDefault();
            const proximo = ids[ destinos[ evento.key ] ];
            this.preferencias.definirLinguagem( this.camada, proximo );
            this.abas.get( proximo ).focus();
        }
    }

    Guia.componentes.VisualizadorLinguagens = VisualizadorLinguagens;

})( window.Guia );
