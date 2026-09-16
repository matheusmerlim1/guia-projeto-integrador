(function ( Guia ) {
    'use strict';

    const PORTFOLIO = 'https://matheusmerlim1.github.io/';

    /*
     * Monta o que se repete em todas as páginas: a barra do topo, o painel lateral,
     * o campo de busca e os atalhos para a etapa anterior e a próxima.
     * Cada página traz apenas o seu <main class="conteudo">; a casca o envolve.
     */
    class Casca {

        constructor( pagina, percurso ) {
            this.pagina = pagina;
            this.percurso = percurso;
            this.conteudo = document.querySelector( '.conteudo' );
        }

        iniciar() {
            document.body.prepend( this.barraDoTopo() );
            this.envolverConteudo();
            this.conteudo.prepend( this.busca() );

            const atalhos = this.atalhosDeEtapa();
            if ( atalhos ) {
                this.conteudo.append( atalhos );
            }
        }

        barraDoTopo() {
            const barra = document.createElement( 'header' );
            barra.className = 'barra-topo';
            barra.innerHTML = `
                <button class="barra-topo__menu" type="button" aria-controls="painel-lateral" aria-expanded="false">
                    <span class="visualmente-oculto">Abrir etapas e estrutura do projeto</span>
                    <span class="barra-topo__menu-icone" aria-hidden="true"></span>
                </button>
                <a class="barra-topo__marca" href="index.html">
                    <span class="barra-topo__sigla">PIS</span>
                    <span class="barra-topo__nome">Guia do Projeto Integrador</span>
                </a>
                <div class="barra-topo__seletores">
                    <div data-seletor-linguagem data-camada="backend" data-rotulo="Back-end"></div>
                    <div data-seletor-linguagem data-camada="frontend" data-rotulo="Front-end"></div>
                    <a class="portfolio" href="${ PORTFOLIO }" target="_blank" rel="noopener" title="Ver todos os meus projetos">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><path d="M9 22V12h6v10"></path>
                        </svg>
                        <span>Portfólio</span>
                    </a>
                </div>`;
            return barra;
        }

        /* A página traz só o conteúdo; aqui ele ganha a grade com o painel lateral. */
        envolverConteudo() {
            const grade = document.createElement( 'div' );
            grade.className = 'pagina';
            this.conteudo.replaceWith( grade );
            grade.append( this.painelLateral(), this.conteudo );
        }

        painelLateral() {
            const painel = document.createElement( 'aside' );
            painel.className = 'painel-lateral';
            painel.id = 'painel-lateral';
            painel.innerHTML = `
                <nav class="painel-lateral__secao" aria-labelledby="titulo-etapas">
                    <p class="painel-lateral__titulo" id="titulo-etapas">Etapas</p>
                    <ol class="etapas" data-lista-etapas></ol>
                </nav>
                <section class="painel-lateral__secao" aria-labelledby="titulo-estrutura">
                    <p class="painel-lateral__titulo" id="titulo-estrutura">Estrutura do projeto</p>
                    <p class="painel-lateral__ajuda">Clique nas pastas para abrir e nos arquivos para ver o código. A estrutura muda conforme o back-end e o front-end escolhidos no topo.</p>
                    <button type="button" class="botao botao--principal painel-lateral__simulador" data-abrir-simulador>▶ Ver a aplicação funcionando</button>
                    <div class="explorador" data-explorador></div>
                </section>`;
            return painel;
        }

        busca() {
            const busca = document.createElement( 'div' );
            busca.className = 'busca';
            busca.setAttribute( 'role', 'search' );
            busca.dataset.busca = '';
            busca.innerHTML = `
                <span class="busca__icone" aria-hidden="true"></span>
                <label class="visualmente-oculto" for="campo-busca">Buscar nesta página</label>
                <input class="busca__campo" id="campo-busca" type="search" placeholder="Buscar nesta página: git merge, multa, Kahlan..." autocomplete="off" data-busca-campo>
                <span class="busca__contador" aria-live="polite" data-busca-contador></span>
                <span class="busca__botoes">
                    <button type="button" class="busca__botao" aria-label="Resultado anterior" data-busca-anterior>↑</button>
                    <button type="button" class="busca__botao" aria-label="Próximo resultado" data-busca-proximo>↓</button>
                    <button type="button" class="busca__botao" aria-label="Limpar busca" data-busca-limpar hidden>×</button>
                </span>`;
            return busca;
        }

        atalhosDeEtapa() {
            const anterior = this.percurso.anterior( this.pagina );
            const proxima = this.percurso.proxima( this.pagina );
            if ( ! anterior && ! proxima ) {
                return null;
            }

            const nav = document.createElement( 'nav' );
            nav.className = 'navegacao-etapas';
            nav.setAttribute( 'aria-label', 'Página anterior e próxima' );
            nav.append( this.atalho( anterior, 'anterior' ), this.atalho( proxima, 'proxima' ) );
            return nav;
        }

        atalho( destino, sentido ) {
            if ( ! destino ) {
                return document.createElement( 'span' );
            }
            const rotulos = { anterior: '← Anterior', proxima: 'Próxima →' };
            const link = document.createElement( 'a' );
            link.className = 'navegacao-etapas__link navegacao-etapas__link--' + sentido;
            link.href = destino.pagina;
            link.innerHTML = `
                <span class="navegacao-etapas__sentido">${ rotulos[ sentido ] }</span>
                <span class="navegacao-etapas__titulo">${ destino.rotulo }</span>`;
            return link;
        }
    }

    Guia.componentes.Casca = Casca;

})( window.Guia );
