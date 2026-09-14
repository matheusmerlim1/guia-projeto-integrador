(function ( Guia ) {
    'use strict';

    const TEMPO_POR_CARACTERE_MS = 28;
    const PAUSA_APOS_COMANDO_MS = 350;
    const TEMPO_POR_LINHA_MS = 35;
    const PAUSA_ENTRE_COMANDOS_MS = 500;
    const TEMPO_CONFIRMACAO_MS = 1800;

    class ColoracaoGit {

        classificar( linhas ) {
            let corDaSecao = '';
            return linhas.map( linha => {
                if ( /^Changes to be committed:/.test( linha ) ) {
                    corDaSecao = 'terminal__verde';
                } else if ( /^(Changes not staged for commit|Untracked files|Unmerged paths):/.test( linha ) ) {
                    corDaSecao = 'terminal__vermelho';
                } else if ( linha === '' ) {
                    corDaSecao = '';
                }
                return this.classeDaLinha( linha, corDaSecao );
            } );
        }

        classeDaLinha( linha, corDaSecao ) {
            if ( /^ {8}\S/.test( linha ) && corDaSecao ) {
                return corDaSecao;
            }
            if ( /^(diff --git|index |--- |\+\+\+ )/.test( linha ) ) {
                return 'terminal__negrito';
            }
            if ( /^@@/.test( linha ) ) {
                return 'terminal__ciano';
            }
            if ( /^\+/.test( linha ) ) {
                return 'terminal__verde';
            }
            if ( /^-/.test( linha ) || /^CONFLICT/.test( linha ) ) {
                return 'terminal__vermelho';
            }
            if ( /^M {2}/.test( linha ) ) {
                return 'terminal__verde';
            }
            if ( /^ M /.test( linha ) ) {
                return 'terminal__vermelho';
            }
            return '';
        }
    }

    class Terminal {

        constructor( { titulo, entradas } ) {
            this.titulo = titulo;
            this.entradas = entradas;
            this.coloracao = new ColoracaoGit();
            this.execucao = 0;
        }

        criarElemento() {
            const janela = document.createElement( 'figure' );
            janela.className = 'terminal';
            janela.append( this.criarBarra() );

            this.tela = document.createElement( 'pre' );
            this.tela.className = 'terminal__tela';
            this.tela.tabIndex = 0;
            this.tela.setAttribute( 'aria-label', this.titulo );
            janela.append( this.tela );

            this.desenharTudo();
            return janela;
        }

        criarBarra() {
            const barra = document.createElement( 'figcaption' );
            barra.className = 'terminal__barra';

            const icone = document.createElement( 'span' );
            icone.className = 'terminal__icone';
            icone.setAttribute( 'aria-hidden', 'true' );
            icone.textContent = '>_';

            const titulo = document.createElement( 'span' );
            titulo.className = 'terminal__titulo';
            titulo.textContent = this.titulo;

            const reproduzir = this.criarBotao( '▶ Reproduzir', 'Reproduzir a digitação dos comandos' );
            reproduzir.addEventListener( 'click', () => this.reproduzir() );

            const copiar = this.criarBotao( 'Copiar comandos', 'Copiar os comandos deste terminal' );
            copiar.addEventListener( 'click', () => this.copiar( copiar ) );

            barra.append( icone, titulo, reproduzir, copiar );
            return barra;
        }

        criarBotao( texto, rotulo ) {
            const botao = document.createElement( 'button' );
            botao.type = 'button';
            botao.className = 'terminal__botao';
            botao.textContent = texto;
            botao.setAttribute( 'aria-label', rotulo );
            return botao;
        }

        desenharTudo() {
            this.execucao++;
            this.tela.replaceChildren();
            for ( const entrada of this.entradas ) {
                const { linhaComando, espacoComando } = this.criarLinhaComando( entrada );
                espacoComando.textContent = entrada.comando;
                this.tela.append( linhaComando, ...this.criarLinhasSaida( entrada ) );
            }
        }

        criarLinhaComando( entrada ) {
            const linhaComando = document.createElement( 'span' );
            linhaComando.className = 'terminal__linha';
            const prompt = document.createElement( 'span' );
            prompt.className = 'terminal__prompt';
            prompt.textContent = entrada.pasta + '>';
            const espacoComando = document.createElement( 'span' );
            espacoComando.className = 'terminal__comando';
            linhaComando.append( prompt, espacoComando );
            return { linhaComando, espacoComando };
        }

        criarLinhasSaida( entrada ) {
            const linhas = this.normalizar( entrada.saida ).split( '\n' );
            const saida = entrada.saida ? linhas : [];
            const classes = this.coloracao.classificar( saida );
            const elementos = saida.map( ( texto, indice ) => {
                const linha = document.createElement( 'span' );
                linha.className = 'terminal__linha terminal__saida ' + classes[ indice ];
                this.preencherLinha( linha, texto );
                return linha;
            } );
            const espaco = document.createElement( 'span' );
            espaco.className = 'terminal__linha terminal__espaco';
            espaco.textContent = ' ';
            return [ ...elementos, espaco ];
        }

        preencherLinha( linha, texto ) {
            const hash = texto.match( /^([*|\\/ ]*)([0-9a-f]{7})( .*)$/ );
            if ( hash ) {
                const destaque = document.createElement( 'span' );
                destaque.className = 'terminal__amarelo';
                destaque.textContent = hash[ 2 ];
                linha.append( hash[ 1 ], destaque, hash[ 3 ] );
                return;
            }
            linha.textContent = texto || ' ';
        }

        normalizar( texto ) {
            return ( texto || '' ).replace( /^\n/, '' ).replace( /\n$/, '' );
        }

        async reproduzir() {
            if ( window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches ) {
                this.desenharTudo();
                return;
            }
            const execucao = ++this.execucao;
            const ativa = () => execucao === this.execucao;
            this.tela.replaceChildren();

            for ( const entrada of this.entradas ) {
                const { linhaComando, espacoComando } = this.criarLinhaComando( entrada );
                const cursor = document.createElement( 'span' );
                cursor.className = 'terminal__cursor';
                linhaComando.append( cursor );
                this.tela.append( linhaComando );

                for ( const caractere of entrada.comando ) {
                    if ( ! ativa() ) {
                        return;
                    }
                    espacoComando.textContent += caractere;
                    await this.esperar( TEMPO_POR_CARACTERE_MS );
                }
                await this.esperar( PAUSA_APOS_COMANDO_MS );
                cursor.remove();

                for ( const linha of this.criarLinhasSaida( entrada ) ) {
                    if ( ! ativa() ) {
                        return;
                    }
                    this.tela.append( linha );
                    this.tela.scrollTop = this.tela.scrollHeight;
                    await this.esperar( TEMPO_POR_LINHA_MS );
                }
                await this.esperar( PAUSA_ENTRE_COMANDOS_MS );
            }
        }

        esperar( milissegundos ) {
            return new Promise( resolver => window.setTimeout( resolver, milissegundos ) );
        }

        async copiar( botao ) {
            const comandos = this.entradas.map( entrada => entrada.comando ).join( '\n' );
            try {
                await navigator.clipboard.writeText( comandos );
            } catch ( erro ) {
                Guia.componentes.BlocoCodigo.copiarPorSelecao( comandos );
            }
            const original = botao.textContent;
            botao.textContent = 'Copiado';
            window.setTimeout( () => { botao.textContent = original; }, TEMPO_CONFIRMACAO_MS );
        }
    }

    Guia.componentes.Terminal = Terminal;

})( window.Guia );
