(function ( Guia ) {
    'use strict';

    const LARGURA_MOVEL = '(max-width: 960px)';

    class NavegacaoLateral {

        constructor( painel, lista, botaoMenu ) {
            this.painel = painel;
            this.lista = lista;
            this.botaoMenu = botaoMenu;
            this.links = [];
        }

        iniciar() {
            this.desenharEtapas();
            this.observarSecoes();
            this.botaoMenu.addEventListener( 'click', () => this.alternar() );
            document.addEventListener( 'keydown', evento => {
                if ( evento.key === 'Escape' ) {
                    this.fechar();
                }
            } );
        }

        desenharEtapas() {
            const itens = Guia.dados.etapas.map( etapa => {
                const item = document.createElement( 'li' );
                const link = document.createElement( 'a' );
                link.href = '#' + etapa.id;

                const numero = document.createElement( 'span' );
                numero.className = 'etapas__numero';
                numero.textContent = etapa.numero;

                const titulo = document.createElement( 'span' );
                titulo.className = 'etapas__titulo';
                titulo.textContent = etapa.titulo;

                link.append( numero, titulo );
                if ( etapa.situacao === 'planejada' ) {
                    const selo = document.createElement( 'span' );
                    selo.className = 'selo';
                    selo.textContent = 'em breve';
                    link.append( selo );
                }
                link.addEventListener( 'click', () => this.fecharNoCelular() );
                this.links.push( link );
                item.append( link );
                return item;
            } );
            this.lista.replaceChildren( ...itens );
        }

        observarSecoes() {
            const secoes = Guia.dados.etapas
                .map( etapa => document.getElementById( etapa.id ) )
                .filter( Boolean );
            const observador = new IntersectionObserver( entradas => {
                const visivel = entradas.find( entrada => entrada.isIntersecting );
                if ( visivel ) {
                    this.marcarAtual( visivel.target.id );
                }
            }, { rootMargin: '-15% 0px -80% 0px' } );
            secoes.forEach( secao => observador.observe( secao ) );
        }

        marcarAtual( id ) {
            for ( const link of this.links ) {
                if ( link.getAttribute( 'href' ) === '#' + id ) {
                    link.setAttribute( 'aria-current', 'true' );
                } else {
                    link.removeAttribute( 'aria-current' );
                }
            }
        }

        alternar() {
            const aberto = this.painel.dataset.aberto === 'true';
            this.painel.dataset.aberto = String( ! aberto );
            this.botaoMenu.setAttribute( 'aria-expanded', String( ! aberto ) );
        }

        fechar() {
            this.painel.dataset.aberto = 'false';
            this.botaoMenu.setAttribute( 'aria-expanded', 'false' );
        }

        fecharNoCelular() {
            if ( window.matchMedia( LARGURA_MOVEL ).matches ) {
                this.fechar();
            }
        }
    }

    Guia.componentes.NavegacaoLateral = NavegacaoLateral;

})( window.Guia );
