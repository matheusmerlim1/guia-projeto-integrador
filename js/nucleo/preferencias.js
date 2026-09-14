(function ( Guia ) {
    'use strict';

    const PREFIXO = 'guia-pis:';
    const EVENTO_LINGUAGEM = 'guia:linguagem-alterada';

    class Preferencias {

        constructor( padroes ) {
            this.padroes = padroes;
        }

        linguagem( camada ) {
            const salva = this.ler( 'linguagem:' + camada );
            const disponiveis = Guia.dados.linguagens[ camada ] || [];
            const existe = disponiveis.some( l => l.id === salva );
            return existe ? salva : this.padroes[ camada ];
        }

        definirLinguagem( camada, id ) {
            this.gravar( 'linguagem:' + camada, id );
            document.dispatchEvent( new CustomEvent( EVENTO_LINGUAGEM, {
                detail: { camada, id },
            } ) );
        }

        aoAlterarLinguagem( camada, funcao ) {
            document.addEventListener( EVENTO_LINGUAGEM, evento => {
                if ( evento.detail.camada === camada ) {
                    funcao( evento.detail.id );
                }
            } );
        }

        ler( chave ) {
            try {
                return window.localStorage.getItem( PREFIXO + chave );
            } catch ( erro ) {
                return null;
            }
        }

        gravar( chave, valor ) {
            try {
                window.localStorage.setItem( PREFIXO + chave, valor );
            } catch ( erro ) {
                return;
            }
        }
    }

    Guia.nucleo.Preferencias = Preferencias;

})( window.Guia );
