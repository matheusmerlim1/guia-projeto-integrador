(function ( Guia ) {
    'use strict';

    /**
     * Mostra a imagem da organização de pastas da combinação de linguagens escolhida no topo.
     */
    class ImagemEstrutura {

        constructor( elemento, preferencias ) {
            this.elemento = elemento;
            this.preferencias = preferencias;
            this.imagem = elemento.querySelector( 'img' );
            this.legenda = elemento.querySelector( 'figcaption' );
        }

        iniciar() {
            this.atualizar();
            this.preferencias.aoAlterarLinguagem( 'backend', () => this.atualizar() );
            this.preferencias.aoAlterarLinguagem( 'frontend', () => this.atualizar() );
        }

        atualizar() {
            const { linguagens } = Guia.dados;
            const backend = this.preferencias.linguagem( 'backend' );
            const frontend = this.preferencias.linguagem( 'frontend' );
            const rotuloBackend = linguagens.backend.find( l => l.id === backend ).rotulo;
            const rotuloFrontend = linguagens.frontend.find( l => l.id === frontend ).rotulo;

            this.imagem.src = 'img/estrutura/backend-' + backend + '--frontend-' + frontend + '.svg';
            this.imagem.alt = 'Organização das pastas do projeto com back-end em ' + rotuloBackend
                + ' e front-end em ' + rotuloFrontend + ', como aparece no explorador do editor.';
            this.legenda.textContent = 'Back-end em ' + rotuloBackend + ' e front-end em ' + rotuloFrontend
                + '. Troque as linguagens no topo da página para ver as outras combinações.';
        }
    }

    Guia.componentes.ImagemEstrutura = ImagemEstrutura;

})( window.Guia );
