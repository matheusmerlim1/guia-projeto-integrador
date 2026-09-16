(function ( Guia ) {
    'use strict';

    /* O índice da página inicial: um cartão por etapa, montado a partir de Guia.dados.etapas. */
    class CartoesEtapas {

        constructor( elemento, percurso ) {
            this.elemento = elemento;
            this.percurso = percurso;
        }

        iniciar() {
            const cartoes = Guia.dados.etapas.map( etapa => this.cartao( etapa ) );
            this.elemento.replaceChildren( ...cartoes );
        }

        cartao( etapa ) {
            const link = document.createElement( 'a' );
            link.className = 'cartao';
            link.href = this.percurso.entradaDe( etapa );
            link.innerHTML = `
                <span class="cartao__numero">Etapa ${ etapa.numero }</span>
                <span class="cartao__titulo">${ etapa.titulo }</span>
                <span class="cartao__resumo">${ etapa.resumo }</span>`;

            if ( etapa.situacao === 'planejada' ) {
                const selo = document.createElement( 'span' );
                selo.className = 'selo';
                selo.textContent = 'em breve';
                link.append( selo );
            } else if ( etapa.partes ) {
                const partes = document.createElement( 'span' );
                partes.className = 'cartao__partes';
                partes.textContent = etapa.partes.map( parte => parte.titulo ).join( ' · ' );
                link.append( partes );
            }
            return link;
        }
    }

    Guia.componentes.CartoesEtapas = CartoesEtapas;

})( window.Guia );
