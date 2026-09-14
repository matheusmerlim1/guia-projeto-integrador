(function ( Guia ) {
    'use strict';

    const TAMANHO_MINIMO = 2;
    const ESPERA_DIGITACAO_MS = 200;
    const IGNORAR = 'script, style, textarea, input, select, [data-busca], .visualmente-oculto';

    class BuscaNaPagina {

        constructor( elemento, areaBusca ) {
            this.elemento = elemento;
            this.areaBusca = areaBusca;
            this.campo = elemento.querySelector( '[data-busca-campo]' );
            this.contador = elemento.querySelector( '[data-busca-contador]' );
            this.botaoAnterior = elemento.querySelector( '[data-busca-anterior]' );
            this.botaoProximo = elemento.querySelector( '[data-busca-proximo]' );
            this.botaoLimpar = elemento.querySelector( '[data-busca-limpar]' );
            this.destaques = [];
            this.atual = -1;
            this.espera = 0;
        }

        iniciar() {
            this.campo.addEventListener( 'input', () => {
                window.clearTimeout( this.espera );
                this.espera = window.setTimeout( () => this.buscar(), ESPERA_DIGITACAO_MS );
            } );
            this.campo.addEventListener( 'keydown', evento => {
                if ( evento.key === 'Enter' ) {
                    evento.preventDefault();
                    this.irPara( this.atual + ( evento.shiftKey ? -1 : 1 ) );
                } else if ( evento.key === 'Escape' ) {
                    this.limpar();
                }
            } );
            this.botaoAnterior.addEventListener( 'click', () => this.irPara( this.atual - 1 ) );
            this.botaoProximo.addEventListener( 'click', () => this.irPara( this.atual + 1 ) );
            this.botaoLimpar.addEventListener( 'click', () => {
                this.limpar();
                this.campo.focus();
            } );
            document.addEventListener( 'guia:linguagem-alterada', () => {
                window.setTimeout( () => this.buscar( false ), 0 );
            } );
            this.atualizarEstado();
        }

        limpar() {
            this.campo.value = '';
            this.buscar();
        }

        buscar( rolar = true ) {
            this.removerDestaques();
            const termo = normalizar( this.campo.value.trim() );
            if ( termo.length >= TAMANHO_MINIMO ) {
                this.destacar( termo );
            }
            this.atual = -1;
            this.atualizarEstado();
            if ( this.destaques.length > 0 && rolar ) {
                this.irPara( 0 );
            }
        }

        destacar( termo ) {
            const caminhante = document.createTreeWalker( this.areaBusca, NodeFilter.SHOW_TEXT, {
                acceptNode: no => {
                    if ( ! no.nodeValue.trim() || no.parentElement.closest( IGNORAR ) ) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                },
            } );
            const nos = [];
            while ( caminhante.nextNode() ) {
                nos.push( caminhante.currentNode );
            }
            for ( const no of nos ) {
                this.destacarNoTexto( no, termo );
            }
        }

        destacarNoTexto( no, termo ) {
            const original = no.nodeValue;
            const { texto, posicoes } = mapearNormalizado( original );
            let inicio = texto.indexOf( termo );
            if ( inicio === -1 ) {
                return;
            }
            const fragmento = document.createDocumentFragment();
            let ultimo = 0;
            while ( inicio !== -1 ) {
                const de = posicoes[ inicio ];
                const ate = posicoes[ inicio + termo.length - 1 ] + 1;
                fragmento.append( original.slice( ultimo, de ) );
                const marca = document.createElement( 'mark' );
                marca.className = 'busca__destaque';
                marca.textContent = original.slice( de, ate );
                fragmento.append( marca );
                this.destaques.push( marca );
                ultimo = ate;
                inicio = texto.indexOf( termo, inicio + termo.length );
            }
            fragmento.append( original.slice( ultimo ) );
            no.replaceWith( fragmento );
        }

        removerDestaques() {
            for ( const marca of this.destaques ) {
                if ( marca.isConnected ) {
                    const pai = marca.parentNode;
                    marca.replaceWith( document.createTextNode( marca.textContent ) );
                    pai.normalize();
                }
            }
            this.destaques = [];
        }

        irPara( indice ) {
            const total = this.destaques.length;
            if ( total === 0 ) {
                return;
            }
            this.destaques[ this.atual ]?.classList.remove( 'busca__destaque--atual' );
            this.atual = ( indice + total ) % total;
            const marca = this.destaques[ this.atual ];
            marca.classList.add( 'busca__destaque--atual' );
            for ( let detalhes = marca.closest( 'details' ); detalhes; detalhes = detalhes.parentElement.closest( 'details' ) ) {
                detalhes.open = true;
            }
            marca.scrollIntoView( { block: 'center', behavior: preferirMovimentoReduzido() ? 'auto' : 'smooth' } );
            this.atualizarEstado();
        }

        atualizarEstado() {
            const temTermo = this.campo.value.trim().length > 0;
            const total = this.destaques.length;
            this.elemento.dataset.ativa = String( temTermo );
            this.botaoLimpar.hidden = ! temTermo;
            this.botaoAnterior.disabled = total === 0;
            this.botaoProximo.disabled = total === 0;
            if ( ! temTermo ) {
                this.contador.textContent = '';
            } else if ( this.campo.value.trim().length < TAMANHO_MINIMO ) {
                this.contador.textContent = 'Digite mais letras';
            } else if ( total === 0 ) {
                this.contador.textContent = 'Nenhum resultado';
            } else {
                this.contador.textContent = ( this.atual + 1 ) + ' de ' + total;
            }
        }
    }

    function normalizar( texto ) {
        return texto.normalize( 'NFD' ).replace( /[̀-ͯ]/g, '' ).toLowerCase();
    }

    function mapearNormalizado( original ) {
        let texto = '';
        const posicoes = [];
        for ( let i = 0; i < original.length; i++ ) {
            const convertido = normalizar( original[ i ] );
            for ( let j = 0; j < convertido.length; j++ ) {
                texto += convertido[ j ];
                posicoes.push( i );
            }
        }
        return { texto, posicoes };
    }

    function preferirMovimentoReduzido() {
        return window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;
    }

    Guia.componentes.BuscaNaPagina = BuscaNaPagina;

})( window.Guia );
