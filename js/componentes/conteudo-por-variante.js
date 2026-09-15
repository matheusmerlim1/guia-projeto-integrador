(function ( Guia ) {
    'use strict';

    /**
     * Mostra um bloco só quando a escolha de uma camada corresponde à indicada.
     * Uso: <div data-mostrar-quando="banco:mysql">...</div>
     */
    class ConteudoPorVariante {

        constructor( elemento, preferencias ) {
            this.elemento = elemento;
            this.preferencias = preferencias;
            [ this.camada, this.variante ] = elemento.dataset.mostrarQuando.split( ':' );
        }

        iniciar() {
            this.atualizar();
            this.preferencias.aoAlterarLinguagem( this.camada, () => this.atualizar() );
        }

        atualizar() {
            this.elemento.hidden = this.preferencias.linguagem( this.camada ) !== this.variante;
        }
    }

    Guia.componentes.ConteudoPorVariante = ConteudoPorVariante;

})( window.Guia );
