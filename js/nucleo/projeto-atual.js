(function ( Guia ) {
    'use strict';

    const NOME_RAIZ = 'biblioteca-comunitaria/';

    /**
     * Monta o projeto de exemplo de acordo com as linguagens escolhidas no topo da página.
     */
    class ProjetoAtual {

        constructor( preferencias ) {
            this.preferencias = preferencias;
        }

        get nomeRaiz() {
            return NOME_RAIZ;
        }

        raiz() {
            const { projetos } = Guia.dados;
            const backend = this.preferencias.linguagem( 'backend' );
            const frontend = this.preferencias.linguagem( 'frontend' );
            return {
                nome: NOME_RAIZ,
                filhos: [
                    projetos[ 'backend-' + backend ],
                    projetos[ 'frontend-' + frontend ],
                    ...projetos[ 'raiz-' + backend ].filhos,
                ],
            };
        }

        /**
         * Procura um arquivo pelo caminho a partir da raiz, como "README.md" ou "backend/composer.json".
         */
        encontrar( caminho ) {
            const procurar = ( nos, prefixo ) => {
                for ( const no of nos ) {
                    const atual = prefixo + no.nome;
                    if ( ! no.filhos && atual === caminho ) {
                        return no;
                    }
                    if ( no.filhos && caminho.startsWith( atual ) ) {
                        const achado = procurar( no.filhos, atual );
                        if ( achado ) {
                            return achado;
                        }
                    }
                }
                return null;
            };
            return procurar( this.raiz().filhos, '' );
        }

        aoAlterar( funcao ) {
            this.preferencias.aoAlterarLinguagem( 'backend', funcao );
            this.preferencias.aoAlterarLinguagem( 'frontend', funcao );
        }
    }

    Guia.nucleo.ProjetoAtual = ProjetoAtual;

})( window.Guia );
