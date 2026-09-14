(function ( Guia ) {
    'use strict';

    const TEMPO_CONFIRMACAO_MS = 1800;

    class BlocoCodigo {

        constructor( { caminho, codigo, linguagem, comando, pastaComando = 'backend' } ) {
            this.caminho = caminho;
            this.codigo = codigo.replace( /^\n/, '' ).replace( /\s+$/, '' );
            this.linguagem = linguagem;
            this.comando = comando;
            this.pastaComando = pastaComando;
        }

        static linguagemDoCaminho( caminho ) {
            const extensao = caminho.split( '.' ).pop().toLowerCase();
            return Guia.dados.realcePorExtensao[ extensao ] || 'texto';
        }

        static copiarPorSelecao( texto ) {
            const area = document.createElement( 'textarea' );
            area.value = texto;
            area.setAttribute( 'readonly', '' );
            area.style.position = 'fixed';
            area.style.opacity = '0';
            document.body.append( area );
            area.select();
            document.execCommand( 'copy' );
            area.remove();
        }

        criarElemento() {
            const figura = document.createElement( 'figure' );
            figura.className = 'bloco-codigo';
            figura.append( this.criarCabecalho(), this.criarCorpo() );
            if ( this.comando ) {
                figura.append( this.criarComando() );
            }
            return figura;
        }

        criarCabecalho() {
            const cabecalho = document.createElement( 'figcaption' );
            cabecalho.className = 'bloco-codigo__cabecalho';

            const arquivo = document.createElement( 'span' );
            arquivo.className = 'bloco-codigo__arquivo';
            const divisao = this.caminho.lastIndexOf( '/' ) + 1;
            const pasta = document.createElement( 'span' );
            pasta.className = 'bloco-codigo__pasta';
            pasta.textContent = this.caminho.slice( 0, divisao );
            arquivo.append( pasta, this.caminho.slice( divisao ) );

            const botao = document.createElement( 'button' );
            botao.type = 'button';
            botao.className = 'bloco-codigo__copiar';
            botao.textContent = 'Copiar';
            botao.setAttribute( 'aria-label', 'Copiar o código de ' + this.caminho );
            botao.addEventListener( 'click', () => this.copiar( botao ) );

            cabecalho.append( arquivo, botao );
            return cabecalho;
        }

        criarCorpo() {
            const pre = document.createElement( 'pre' );
            pre.className = 'bloco-codigo__pre';
            pre.tabIndex = 0;
            const code = document.createElement( 'code' );
            const linhas = new Guia.componentes.RealceSintaxe( this.linguagem ).realcar( this.codigo );
            code.innerHTML = linhas
                .map( linha => '<span class="bloco-codigo__linha">' + ( linha || ' ' ) + '</span>' )
                .join( '' );
            pre.append( code );
            return pre;
        }

        criarComando() {
            const rodape = document.createElement( 'div' );
            rodape.className = 'bloco-codigo__comando';
            const rotulo = document.createElement( 'span' );
            rotulo.textContent = 'Para executar, na pasta ' + this.pastaComando + ':';
            const comando = document.createElement( 'code' );
            comando.textContent = this.comando;
            rodape.append( rotulo, comando );
            return rodape;
        }

        async copiar( botao ) {
            try {
                await navigator.clipboard.writeText( this.codigo );
            } catch ( erro ) {
                BlocoCodigo.copiarPorSelecao( this.codigo );
            }
            botao.textContent = 'Copiado';
            botao.dataset.copiado = 'true';
            window.setTimeout( () => {
                botao.textContent = 'Copiar';
                delete botao.dataset.copiado;
            }, TEMPO_CONFIRMACAO_MS );
        }
    }

    Guia.componentes.BlocoCodigo = BlocoCodigo;

})( window.Guia );
