(function ( Guia ) {
    'use strict';

    const LARGURA_MOVEL = '(max-width: 960px)';
    const CHAVE_OCULTA = 'coluna-lateral-oculta';

    class NavegacaoLateral {

        constructor( painel, lista, botaoMenu, pagina, percurso, preferencias ) {
            this.painel = painel;
            this.lista = lista;
            this.botaoMenu = botaoMenu;
            this.pagina = pagina;
            this.percurso = percurso;
            this.preferencias = preferencias;
            this.etapaAberta = percurso.etapaDe( pagina );
            this.rotuloDoBotao = botaoMenu.querySelector( '.visualmente-oculto' );
            this.telaMovel = window.matchMedia( LARGURA_MOVEL );
        }

        iniciar() {
            this.desenharEtapas();
            this.restaurarColunaOculta();
            this.botaoMenu.addEventListener( 'click', () => this.alternar() );
            document.addEventListener( 'keydown', evento => {
                if ( evento.key === 'Escape' ) {
                    this.fechar();
                }
            } );
            /* O mesmo botão esconde a coluna no computador e abre a gaveta no celular;
               ao trocar de largura, o rótulo precisa acompanhar o novo significado. */
            this.telaMovel.addEventListener( 'change', () => this.atualizarBotao() );
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

        /* No celular o botão abre e fecha a gaveta; no computador ele esconde a coluna. */
        alternar() {
            if ( this.telaMovel.matches ) {
                this.painel.dataset.aberto = String( this.painel.dataset.aberto !== 'true' );
                this.atualizarBotao();
                return;
            }
            this.definirColunaOculta( ! this.colunaOculta() );
        }

        /* A escolha vale para o guia inteiro, então fica guardada no navegador:
           quem esconde a coluna numa página continua sem ela na próxima. */
        restaurarColunaOculta() {
            this.definirColunaOculta( this.preferencias.ler( CHAVE_OCULTA ) === 'true' );
        }

        definirColunaOculta( oculta ) {
            document.documentElement.dataset.colunaLateral = oculta ? 'oculta' : 'visivel';
            this.preferencias.gravar( CHAVE_OCULTA, String( oculta ) );
            this.atualizarBotao();
        }

        colunaOculta() {
            return document.documentElement.dataset.colunaLateral === 'oculta';
        }

        atualizarBotao() {
            const visivel = this.telaMovel.matches
                ? this.painel.dataset.aberto === 'true'
                : ! this.colunaOculta();
            const rotulo = visivel
                ? 'Esconder as etapas e a estrutura do projeto'
                : 'Mostrar as etapas e a estrutura do projeto';

            this.botaoMenu.setAttribute( 'aria-expanded', String( visivel ) );
            this.botaoMenu.title = rotulo;
            if ( this.rotuloDoBotao ) {
                this.rotuloDoBotao.textContent = rotulo;
            }
        }

        fechar() {
            this.painel.dataset.aberto = 'false';
            this.atualizarBotao();
        }

        fecharNoCelular() {
            if ( this.telaMovel.matches ) {
                this.fechar();
            }
        }
    }

    Guia.componentes.NavegacaoLateral = NavegacaoLateral;

})( window.Guia );
