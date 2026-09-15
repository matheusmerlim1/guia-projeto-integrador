(function ( Guia ) {
    'use strict';

    /**
     * Mostra, dentro do texto da página, um arquivo do projeto de exemplo.
     * O arquivo muda junto com as linguagens escolhidas no topo.
     * Uso: <div data-arquivo-projeto="backend/composer.json"></div>
     * Caminhos alternativos, para arquivos com nomes diferentes em cada linguagem, são separados por "|".
     * data-ausente é o texto exibido quando nenhum dos caminhos existe na linguagem escolhida.
     */
    class ArquivoDoProjeto {

        constructor( elemento, projeto ) {
            this.elemento = elemento;
            this.projeto = projeto;
            this.caminhos = elemento.dataset.arquivoProjeto.split( '|' );
        }

        iniciar() {
            this.desenhar();
            this.projeto.aoAlterar( () => this.desenhar() );
        }

        desenhar() {
            const { BlocoCodigo } = Guia.componentes;
            for ( const caminho of this.caminhos ) {
                const no = this.projeto.encontrar( caminho );
                if ( no ) {
                    const bloco = new BlocoCodigo( {
                        caminho,
                        codigo: no.codigo,
                        linguagem: BlocoCodigo.linguagemDoCaminho( caminho ),
                    } );
                    this.elemento.replaceChildren( bloco.criarElemento() );
                    return;
                }
            }
            // Quando o arquivo não existe na linguagem escolhida, mostra a explicação de data-ausente.
            if ( this.elemento.dataset.ausente ) {
                const aviso = document.createElement( 'p' );
                aviso.className = 'aviso aviso--dica';
                aviso.textContent = this.elemento.dataset.ausente;
                this.elemento.replaceChildren( aviso );
                return;
            }
            this.elemento.replaceChildren();
        }
    }

    Guia.componentes.ArquivoDoProjeto = ArquivoDoProjeto;

})( window.Guia );
