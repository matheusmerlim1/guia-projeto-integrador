(function ( Guia ) {
    'use strict';

    const LARGURA_MOVEL = '(max-width: 960px)';

    class NavegacaoLateral {

        constructor( painel, lista, botaoMenu, pagina, percurso ) {
            this.painel = painel;
            this.lista = lista;
            this.botaoMenu = botaoMenu;
            this.pagina = pagina;
            this.percurso = percurso;
            this.etapaAberta = percurso.etapaDe( pagina );
        }

        iniciar() {
            this.desenharEtapas();
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
                item.append( this.linkDaEtapa( etapa ) );
                if ( etapa.partes ) {
                    item.append( this.listaDePartes( etapa ) );
                }
                return item;
            } );
            this.lista.replaceChildren( ...itens );
        }

        linkDaEtapa( etapa ) {
            const link = document.createElement( 'a' );
            link.href = this.percurso.entradaDe( etapa );

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
            /* A etapa dividida fica destacada enquanto qualquer uma das suas partes está aberta,
               mas quem recebe aria-current="page" é a parte, não ela. */
            if ( this.etapaAberta === etapa ) {
                if ( etapa.partes ) {
                    link.dataset.aberta = 'true';
                } else {
                    link.setAttribute( 'aria-current', 'page' );
                }
            }
            this.aoClicar( link );
            return link;
        }

        listaDePartes( etapa ) {
            const lista = document.createElement( 'ol' );
            lista.className = 'etapas__partes';
            if ( this.etapaAberta !== etapa ) {
                lista.hidden = true;
            }

            for ( const parte of etapa.partes ) {
                const item = document.createElement( 'li' );
                const link = document.createElement( 'a' );
                link.href = parte.pagina;

                const titulo = document.createElement( 'span' );
                titulo.className = 'etapas__titulo';
                titulo.textContent = parte.titulo;

                link.append( titulo );
                if ( parte.id === this.pagina ) {
                    link.setAttribute( 'aria-current', 'page' );
                }
                this.aoClicar( link );
                item.append( link );
                lista.append( item );
            }
            return lista;
        }

        aoClicar( link ) {
            link.addEventListener( 'click', () => this.fecharNoCelular() );
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
