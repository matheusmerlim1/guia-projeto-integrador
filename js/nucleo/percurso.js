(function ( Guia ) {
    'use strict';

    /*
     * A ordem de leitura do guia. Uma etapa longa é dividida em partes, e cada parte
     * é uma página; o percurso junta tudo em uma lista única, que dá os atalhos de
     * anterior e próxima e diz em que ponto do guia a página aberta está.
     */
    class Percurso {

        constructor( etapas ) {
            this.etapas = etapas;
        }

        /* Todas as páginas na ordem em que devem ser lidas. */
        sequencia() {
            const paginas = [];
            for ( const etapa of this.etapas ) {
                if ( etapa.partes ) {
                    for ( const parte of etapa.partes ) {
                        paginas.push( {
                            id: parte.id,
                            pagina: parte.pagina,
                            titulo: parte.titulo,
                            rotulo: `Etapa ${ etapa.numero } · ${ parte.titulo }`,
                            etapa: etapa,
                        } );
                    }
                } else {
                    paginas.push( {
                        id: etapa.id,
                        pagina: etapa.pagina,
                        titulo: etapa.titulo,
                        rotulo: `Etapa ${ etapa.numero } · ${ etapa.titulo }`,
                        etapa: etapa,
                    } );
                }
            }
            return paginas;
        }

        posicao( id ) {
            return this.sequencia().findIndex( pagina => pagina.id === id );
        }

        anterior( id ) {
            return this.sequencia()[ this.posicao( id ) - 1 ] || null;
        }

        proxima( id ) {
            const posicao = this.posicao( id );
            return posicao < 0 ? null : this.sequencia()[ posicao + 1 ] || null;
        }

        /* A etapa a que a página aberta pertence, seja ela uma etapa inteira ou uma parte. */
        etapaDe( id ) {
            const pagina = this.sequencia().find( item => item.id === id );
            return pagina ? pagina.etapa : null;
        }

        /* Onde uma etapa começa: a primeira parte, quando ela é dividida. */
        entradaDe( etapa ) {
            return etapa.partes ? etapa.partes[ 0 ].pagina : etapa.pagina;
        }
    }

    Guia.nucleo.Percurso = Percurso;

})( window.Guia );
