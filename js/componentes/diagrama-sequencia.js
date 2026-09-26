(function ( Guia ) {
    'use strict';

    const SVG = 'http://www.w3.org/2000/svg';

    /* Medidas do desenho, em unidades do viewBox (que coincidem com pixels na escala 1). */
    const COLUNA = 112;          // distância entre duas linhas de vida
    const MARGEM_X = 16;
    const TOPO = 78;             // altura reservada às caixas dos participantes
    const PASSO_Y = 52;          // distância entre uma mensagem e a seguinte
    const FOLGA_FIM = 28;
    const CAIXA_ALTURA = 52;
    const LIMITE_ROTULO = 38;    // acima disto o rótulo é encurtado no desenho
    const LARGURA_CARACTERE = 6; // largura média de um caractere do rótulo, em pixels

    const TEMPO_PASSO_MS = 2200;

    /**
     * Diagrama de sequência animado: mostra o caminho de uma ação pelas classes do projeto.
     * O desenho é um SVG montado aqui; a animação apenas revela uma mensagem por vez.
     */
    class DiagramaSequencia {

        constructor( elemento, preferencias, projeto, visualizador ) {
            this.elemento = elemento;
            this.preferencias = preferencias;
            this.projeto = projeto;
            this.visualizador = visualizador;
            this.atores = Guia.dados.fluxo.atores;
            this.cenarios = Guia.dados.fluxo.cenarios;
            this.cenario = this.cenarios[ 0 ];
            this.passo = -1;
            this.tocando = false;
            this.relogio = 0;
            this.posicao = new Map( this.atores.map( ( ator, indice ) => [ ator.id, indice ] ) );
        }

        iniciar() {
            this.elemento.classList.add( 'fluxo' );
            this.elemento.append(
                this.criarSeletorDeCenario(),
                this.criarResumo(),
                this.criarPalco(),
                this.criarControles(),
                this.criarPainel()
            );
            this.trocarCenario( this.cenario );
            this.ouvirTeclado();
            /* Os caminhos de arquivo no painel mudam com a linguagem escolhida no topo. */
            this.projeto.aoAlterar( () => this.mostrarPasso( this.passo ) );
        }

        /* ---------- montagem dos controles ---------- */

        criarSeletorDeCenario() {
            const area = document.createElement( 'div' );
            area.className = 'fluxo__cenarios';
            area.setAttribute( 'role', 'group' );
            area.setAttribute( 'aria-label', 'Escolha a ação' );

            this.botoesCenario = new Map();
            for ( const cenario of this.cenarios ) {
                const botao = document.createElement( 'button' );
                botao.type = 'button';
                botao.className = 'fluxo__cenario';
                botao.textContent = cenario.titulo;
                botao.addEventListener( 'click', () => this.trocarCenario( cenario ) );
                this.botoesCenario.set( cenario.id, botao );
                area.append( botao );
            }
            return area;
        }

        criarResumo() {
            this.resumo = document.createElement( 'p' );
            this.resumo.className = 'fluxo__resumo';
            return this.resumo;
        }

        criarPalco() {
            this.palco = document.createElement( 'div' );
            this.palco.className = 'fluxo__palco';
            this.palco.tabIndex = 0;
            this.palco.setAttribute( 'role', 'group' );
            this.palco.setAttribute( 'aria-label', 'Diagrama de sequência. Use as setas do teclado para andar pelos passos.' );
            return this.palco;
        }

        criarControles() {
            const barra = document.createElement( 'div' );
            barra.className = 'fluxo__controles';

            this.botaoTocar = this.criarBotao( '▶ Reproduzir', 'fluxo__botao fluxo__botao--principal', () => this.alternarReproducao() );
            this.botaoAnterior = this.criarBotao( '‹ Anterior', 'fluxo__botao', () => this.irPara( this.passo - 1 ) );
            this.botaoProximo = this.criarBotao( 'Próximo ›', 'fluxo__botao', () => this.irPara( this.passo + 1 ) );
            this.botaoReiniciar = this.criarBotao( '↺ Reiniciar', 'fluxo__botao', () => this.reiniciar() );

            this.contador = document.createElement( 'span' );
            this.contador.className = 'fluxo__contador';

            barra.append( this.botaoTocar, this.botaoAnterior, this.botaoProximo, this.botaoReiniciar, this.contador );
            return barra;
        }

        criarBotao( texto, classe, aoClicar ) {
            const botao = document.createElement( 'button' );
            botao.type = 'button';
            botao.className = classe;
            botao.textContent = texto;
            botao.addEventListener( 'click', aoClicar );
            return botao;
        }

        criarPainel() {
            const painel = document.createElement( 'div' );
            painel.className = 'fluxo__painel';
            painel.setAttribute( 'aria-live', 'polite' );

            this.painelNumero = document.createElement( 'p' );
            this.painelNumero.className = 'fluxo__painel-numero';

            this.painelTitulo = document.createElement( 'h4' );
            this.painelTitulo.className = 'fluxo__painel-titulo';

            this.painelChamada = document.createElement( 'p' );
            this.painelChamada.className = 'fluxo__painel-chamada';

            this.painelTexto = document.createElement( 'p' );
            this.painelTexto.className = 'fluxo__painel-texto';

            this.painelArquivo = document.createElement( 'div' );
            this.painelArquivo.className = 'fluxo__painel-arquivo';

            painel.append( this.painelNumero, this.painelTitulo, this.painelChamada, this.painelTexto, this.painelArquivo );
            return painel;
        }

        /* ---------- desenho do SVG ---------- */

        desenhar() {
            const largura = MARGEM_X * 2 + COLUNA * this.atores.length;
            const altura = TOPO + PASSO_Y * this.cenario.passos.length + FOLGA_FIM;

            /* Dois desenhos, não um: o das caixas fica grudado no alto enquanto o das
               mensagens rola. Sem isso, quem rola para o passo 20 já não sabe que coluna é qual. */
            const cabecalho = this.criarSvg( 'fluxo__cabecalho', `0 0 ${ largura } ${ TOPO }`, largura, TOPO );
            cabecalho.append( ...this.desenharAtores() );

            const corpo = this.criarSvg( 'fluxo__desenho', `0 ${ TOPO } ${ largura } ${ altura - TOPO }`, largura, altura - TOPO );
            corpo.append( this.criarPontas(), ...this.desenharLinhasDeVida( altura ), ...this.desenharMensagens() );

            const quadro = document.createElement( 'div' );
            quadro.className = 'fluxo__quadro';
            quadro.style.width = largura + 'px';
            quadro.append( cabecalho, corpo );

            this.svg = corpo;
            this.palco.replaceChildren( quadro );
            this.palco.scrollTop = 0;
        }

        criarSvg( classe, viewBox, largura, altura ) {
            const svg = document.createElementNS( SVG, 'svg' );
            svg.setAttribute( 'class', classe );
            svg.setAttribute( 'viewBox', viewBox );
            svg.setAttribute( 'width', String( largura ) );
            svg.setAttribute( 'height', String( altura ) );
            svg.setAttribute( 'aria-hidden', 'true' );
            return svg;
        }

        /** Uma ponta de seta por tipo de mensagem, para cada uma herdar a sua cor. */
        criarPontas() {
            const defs = document.createElementNS( SVG, 'defs' );
            for ( const tipo of [ 'chamada', 'retorno', 'rede', 'sql', 'erro' ] ) {
                for ( const sentido of [ 'direita', 'esquerda' ] ) {
                    const marcador = document.createElementNS( SVG, 'marker' );
                    marcador.setAttribute( 'id', 'ponta-' + tipo + '-' + sentido );
                    marcador.setAttribute( 'class', 'fluxo__ponta fluxo__ponta--' + tipo );
                    marcador.setAttribute( 'viewBox', '0 0 10 10' );
                    marcador.setAttribute( 'refX', '9' );
                    marcador.setAttribute( 'refY', '5' );
                    marcador.setAttribute( 'markerWidth', '7' );
                    marcador.setAttribute( 'markerHeight', '7' );
                    marcador.setAttribute( 'orient', sentido === 'direita' ? '0' : '180' );
                    const ponta = document.createElementNS( SVG, 'path' );
                    ponta.setAttribute( 'd', 'M 0 1 L 10 5 L 0 9 z' );
                    marcador.append( ponta );
                    defs.append( marcador );
                }
            }
            return defs;
        }

        desenharAtores() {
            return this.atores.map( ( ator, indice ) => {
                const cx = this.centro( indice );
                const grupo = document.createElementNS( SVG, 'g' );
                grupo.setAttribute( 'class', 'fluxo__ator fluxo__ator--' + ator.camada );
                grupo.dataset.ator = ator.id;

                const caixa = document.createElementNS( SVG, 'rect' );
                caixa.setAttribute( 'class', 'fluxo__caixa' );
                caixa.setAttribute( 'x', cx - COLUNA / 2 + 6 );
                caixa.setAttribute( 'y', 10 );
                caixa.setAttribute( 'width', COLUNA - 12 );
                caixa.setAttribute( 'height', CAIXA_ALTURA );
                caixa.setAttribute( 'rx', 7 );

                /* Pedacinho de linha de vida ligando a caixa ao corpo do diagrama. */
                const talo = document.createElementNS( SVG, 'line' );
                talo.setAttribute( 'class', 'fluxo__linha-vida' );
                talo.setAttribute( 'x1', cx );
                talo.setAttribute( 'x2', cx );
                talo.setAttribute( 'y1', 10 + CAIXA_ALTURA );
                talo.setAttribute( 'y2', TOPO );

                grupo.append( talo, caixa, this.textoDoAtor( ator, cx ) );
                return grupo;
            } );
        }

        desenharLinhasDeVida( altura ) {
            return this.atores.map( ( ator, indice ) => {
                const cx = this.centro( indice );
                const grupo = document.createElementNS( SVG, 'g' );
                grupo.setAttribute( 'class', 'fluxo__ator fluxo__ator--' + ator.camada );
                grupo.dataset.ator = ator.id;

                const linha = document.createElementNS( SVG, 'line' );
                linha.setAttribute( 'class', 'fluxo__linha-vida' );
                linha.setAttribute( 'x1', cx );
                linha.setAttribute( 'x2', cx );
                linha.setAttribute( 'y1', TOPO );
                linha.setAttribute( 'y2', altura - 8 );

                grupo.append( linha );
                return grupo;
            } );
        }

        textoDoAtor( ator, cx ) {
            const grupo = document.createElementNS( SVG, 'g' );

            const papel = document.createElementNS( SVG, 'text' );
            papel.setAttribute( 'class', 'fluxo__papel' );
            papel.setAttribute( 'x', cx );
            papel.setAttribute( 'y', 29 );
            papel.setAttribute( 'text-anchor', 'middle' );
            papel.textContent = ator.papel;
            grupo.append( papel );

            /* O nome da classe é longo; é quebrado em até duas linhas para caber na coluna. */
            this.quebrar( ator.classe, 17 ).slice( 0, 2 ).forEach( ( linha, i ) => {
                const texto = document.createElementNS( SVG, 'text' );
                texto.setAttribute( 'class', 'fluxo__classe' );
                texto.setAttribute( 'x', cx );
                texto.setAttribute( 'y', 43 + i * 11 );
                texto.setAttribute( 'text-anchor', 'middle' );
                texto.textContent = linha;
                grupo.append( texto );
            } );
            return grupo;
        }

        desenharMensagens() {
            this.mensagens = this.cenario.passos.map( ( passo, indice ) => {
                const y = TOPO + PASSO_Y * ( indice + 1 );
                const origem = this.centro( this.posicao.get( passo.de ) );
                const destino = this.centro( this.posicao.get( passo.para ) );
                const paraDireita = destino > origem;

                const grupo = document.createElementNS( SVG, 'g' );
                grupo.setAttribute( 'class', 'fluxo__mensagem fluxo__mensagem--' + passo.tipo
                    + ( passo.destaque ? ' fluxo__mensagem--' + passo.destaque : '' ) );
                grupo.dataset.passo = String( indice );

                const seta = document.createElementNS( SVG, 'line' );
                seta.setAttribute( 'class', 'fluxo__seta' );
                seta.setAttribute( 'x1', origem + ( paraDireita ? 4 : -4 ) );
                seta.setAttribute( 'x2', destino + ( paraDireita ? -7 : 7 ) );
                seta.setAttribute( 'y1', y );
                seta.setAttribute( 'y2', y );
                seta.setAttribute( 'marker-end', `url(#ponta-${ passo.tipo }-${ paraDireita ? 'direita' : 'esquerda' })` );

                const texto = this.encurtar( passo.rotulo );
                const rotulo = document.createElementNS( SVG, 'text' );
                rotulo.setAttribute( 'class', 'fluxo__rotulo' );
                rotulo.setAttribute( 'x', this.centroDoRotulo( ( origem + destino ) / 2, texto ) );
                rotulo.setAttribute( 'y', y - 9 );
                rotulo.setAttribute( 'text-anchor', 'middle' );
                rotulo.setAttribute( 'paint-order', 'stroke' );
                rotulo.textContent = texto;

                /* Área invisível e larga, para o passo inteiro poder ser clicado. */
                const alvo = document.createElementNS( SVG, 'rect' );
                alvo.setAttribute( 'class', 'fluxo__alvo' );
                alvo.setAttribute( 'x', 0 );
                alvo.setAttribute( 'y', y - PASSO_Y / 2 );
                alvo.setAttribute( 'width', MARGEM_X * 2 + COLUNA * this.atores.length );
                alvo.setAttribute( 'height', PASSO_Y );
                alvo.addEventListener( 'click', () => {
                    this.parar();
                    this.irPara( indice );
                } );

                grupo.append( alvo, seta, rotulo, this.numeroDoPasso( indice, origem, destino, y, paraDireita ) );
                return grupo;
            } );
            return this.mensagens;
        }

        numeroDoPasso( indice, origem, destino, y, paraDireita ) {
            const grupo = document.createElementNS( SVG, 'g' );
            grupo.setAttribute( 'class', 'fluxo__selo' );
            const cx = origem + ( paraDireita ? 13 : -13 );

            const circulo = document.createElementNS( SVG, 'circle' );
            circulo.setAttribute( 'class', 'fluxo__selo-fundo' );
            circulo.setAttribute( 'cx', cx );
            circulo.setAttribute( 'cy', y + 13 );
            circulo.setAttribute( 'r', 9 );

            const numero = document.createElementNS( SVG, 'text' );
            numero.setAttribute( 'class', 'fluxo__selo-texto' );
            numero.setAttribute( 'x', cx );
            numero.setAttribute( 'y', y + 16.5 );
            numero.setAttribute( 'text-anchor', 'middle' );
            numero.textContent = String( indice + 1 );

            grupo.append( circulo, numero );
            return grupo;
        }

        /**
         * Mantém o rótulo dentro do desenho. A largura é estimada pela contagem de
         * caracteres, porque o texto ainda não está no documento e não tem medida real.
         */
        centroDoRotulo( centro, texto ) {
            const metade = texto.length * LARGURA_CARACTERE / 2;
            const limite = MARGEM_X * 2 + COLUNA * this.atores.length;
            return Math.min( Math.max( centro, metade + 4 ), limite - metade - 4 );
        }

        centro( indice ) {
            return MARGEM_X + COLUNA * indice + COLUNA / 2;
        }

        encurtar( texto ) {
            if ( texto.length <= LIMITE_ROTULO ) {
                return texto;
            }
            const corte = texto.lastIndexOf( ' ', LIMITE_ROTULO );
            return texto.slice( 0, corte > 20 ? corte : LIMITE_ROTULO ).trim() + '…';
        }

        /**
         * Quebra o texto em linhas de até `limite` caracteres.
         * Um nome de classe é uma palavra só em CamelCase: nesse caso a quebra acontece
         * antes das maiúsculas e as partes voltam a ser coladas, sem espaço.
         */
        quebrar( texto, limite ) {
            const separador = texto.includes( ' ' ) ? ' ' : '';
            const pedacos = separador ? texto.split( ' ' ) : texto.split( /(?=[A-Z])/ );

            const linhas = [];
            let atual = '';
            for ( const pedaco of pedacos ) {
                const junto = atual ? atual + separador + pedaco : pedaco;
                if ( atual && junto.length > limite ) {
                    linhas.push( atual );
                    atual = pedaco;
                } else {
                    atual = junto;
                }
            }
            if ( atual ) {
                linhas.push( atual );
            }
            return linhas;
        }

        /* ---------- animação ---------- */

        trocarCenario( cenario ) {
            this.parar();
            this.cenario = cenario;
            for ( const [ id, botao ] of this.botoesCenario ) {
                botao.setAttribute( 'aria-pressed', String( id === cenario.id ) );
            }
            this.resumo.textContent = cenario.resumo;
            this.desenhar();
            this.irPara( -1 );
        }

        alternarReproducao() {
            if ( this.tocando ) {
                this.parar();
            } else {
                this.tocar();
            }
        }

        tocar() {
            if ( this.passo >= this.cenario.passos.length - 1 ) {
                this.irPara( -1 );
            }
            this.tocando = true;
            this.atualizarBotaoTocar();
            this.avancar();
        }

        avancar() {
            window.clearTimeout( this.relogio );
            this.relogio = window.setTimeout( () => {
                if ( ! this.tocando ) {
                    return;
                }
                if ( this.passo >= this.cenario.passos.length - 1 ) {
                    this.parar();
                    return;
                }
                this.irPara( this.passo + 1 );
                this.avancar();
            }, this.passo < 0 ? 300 : TEMPO_PASSO_MS );
        }

        parar() {
            window.clearTimeout( this.relogio );
            this.tocando = false;
            this.atualizarBotaoTocar();
        }

        reiniciar() {
            this.parar();
            this.irPara( -1 );
        }

        atualizarBotaoTocar() {
            this.botaoTocar.textContent = this.tocando ? '⏸ Pausar' : '▶ Reproduzir';
        }

        irPara( indice ) {
            const total = this.cenario.passos.length;
            this.passo = Math.max( -1, Math.min( indice, total - 1 ) );
            this.mostrarPasso( this.passo );
            if ( this.passo >= 0 ) {
                this.aproximar( this.passo );
            }
        }

        mostrarPasso( indice ) {
            const total = this.cenario.passos.length;

            /* Antes de começar, o caminho inteiro fica visível e esmaecido: dá para ver
               o tamanho da viagem antes de percorrê-la. */
            this.palco.classList.toggle( 'fluxo__palco--repouso', indice < 0 );
            this.mensagens.forEach( ( grupo, i ) => {
                grupo.classList.toggle( 'fluxo__mensagem--visivel', i <= indice );
                grupo.classList.toggle( 'fluxo__mensagem--atual', i === indice );
            } );

            const passo = this.cenario.passos[ indice ];
            for ( const grupo of this.palco.querySelectorAll( '[data-ator]' ) ) {
                const ativo = Boolean( passo ) && ( grupo.dataset.ator === passo.de || grupo.dataset.ator === passo.para );
                grupo.classList.toggle( 'fluxo__ator--ativo', ativo );
            }

            this.botaoAnterior.disabled = indice < 0;
            this.botaoProximo.disabled = indice >= total - 1;
            this.botaoReiniciar.disabled = indice < 0;
            this.contador.textContent = indice < 0 ? total + ' passos' : 'passo ' + ( indice + 1 ) + ' de ' + total;

            this.escreverPainel( passo, indice );
        }

        escreverPainel( passo, indice ) {
            if ( ! passo ) {
                this.painelNumero.textContent = 'Pronto para começar';
                this.painelTitulo.textContent = this.cenario.titulo;
                this.painelChamada.hidden = true;
                this.painelTexto.innerHTML = 'Use <strong>▶ Reproduzir</strong> para ver o caminho inteiro, ou <strong>Próximo</strong> para andar um passo por vez. Clicar em uma seta do diagrama leva direto àquele passo.';
                this.painelArquivo.replaceChildren();
                return;
            }

            const de = this.ator( passo.de );
            const para = this.ator( passo.para );
            this.painelNumero.textContent = 'Passo ' + ( indice + 1 ) + ' · ' + de.papel + ' → ' + para.papel;
            this.painelTitulo.textContent = passo.titulo;
            this.painelChamada.hidden = false;
            this.painelChamada.textContent = passo.rotulo;
            this.painelTexto.innerHTML = passo.texto;
            this.painelArquivo.replaceChildren( ...this.linkDoArquivo( passo, para ) );
        }

        /** O caminho do arquivo muda conforme a linguagem escolhida no topo da página. */
        linkDoArquivo( passo, ator ) {
            const arquivo = passo.arquivo || ator.arquivo;
            if ( ! arquivo ) {
                return [];
            }
            const caminho = arquivo[ this.preferencias.linguagem( arquivo.camada ) ];
            const no = caminho && this.projeto.encontrar( caminho );
            if ( ! no ) {
                return [];
            }

            const botao = document.createElement( 'button' );
            botao.type = 'button';
            botao.className = 'fluxo__arquivo';
            botao.addEventListener( 'click', () => this.visualizador.abrir( caminho, no ) );

            const rotulo = document.createElement( 'span' );
            rotulo.className = 'fluxo__arquivo-rotulo';
            rotulo.textContent = 'Ver o código';

            const nome = document.createElement( 'code' );
            nome.className = 'fluxo__arquivo-caminho';
            nome.textContent = caminho;

            botao.append( rotulo, nome );
            return [ botao ];
        }

        ator( id ) {
            return this.atores.find( ator => ator.id === id );
        }

        /** Traz a mensagem atual para dentro da área visível, na horizontal e na vertical. */
        aproximar( indice ) {
            const passo = this.cenario.passos[ indice ];
            const esquerda = Math.min( this.posicao.get( passo.de ), this.posicao.get( passo.para ) );
            const direita = Math.max( this.posicao.get( passo.de ), this.posicao.get( passo.para ) );
            const inicio = MARGEM_X + COLUNA * esquerda;
            const fim = MARGEM_X + COLUNA * ( direita + 1 );

            const visivel = this.palco.clientWidth;
            if ( fim - inicio <= visivel ) {
                const alvo = inicio - ( visivel - ( fim - inicio ) ) / 2;
                this.palco.scrollTo( { left: Math.max( 0, alvo ), behavior: 'smooth' } );
            }

            /* A posição da mensagem dentro da área que rola: o cabeçalho fica por cima dela. */
            const y = PASSO_Y * ( indice + 1 );
            const visivelDe = this.palco.scrollTop + TOPO;
            const visivelAte = this.palco.scrollTop + this.palco.clientHeight;
            if ( y < visivelDe + PASSO_Y || y > visivelAte - PASSO_Y ) {
                const alvo = y - TOPO - ( this.palco.clientHeight - TOPO ) / 2;
                this.palco.scrollTo( { top: Math.max( 0, alvo ), behavior: 'smooth' } );
            }
        }

        ouvirTeclado() {
            this.elemento.addEventListener( 'keydown', evento => {
                const teclas = {
                    ArrowRight: () => this.irPara( this.passo + 1 ),
                    ArrowLeft: () => this.irPara( this.passo - 1 ),
                    Home: () => this.irPara( -1 ),
                    End: () => this.irPara( this.cenario.passos.length - 1 ),
                };
                const acao = teclas[ evento.key ];
                if ( acao ) {
                    evento.preventDefault();
                    this.parar();
                    acao();
                }
            } );
        }
    }

    Guia.componentes.DiagramaSequencia = DiagramaSequencia;

})( window.Guia );
