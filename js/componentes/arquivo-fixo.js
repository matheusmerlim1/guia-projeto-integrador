(function ( Guia ) {
    'use strict';

    class ArquivoFixo {

        constructor( elemento ) {
            this.elemento = elemento;
            this.arquivo = Guia.dados.arquivos[ elemento.dataset.arquivo ];
        }

        iniciar() {
            if ( ! this.arquivo ) {
                return;
            }
            const { BlocoCodigo } = Guia.componentes;
            const bloco = new BlocoCodigo( {
                caminho: this.arquivo.caminho,
                codigo: this.arquivo.codigo,
                linguagem: BlocoCodigo.linguagemDoCaminho( this.arquivo.caminho ),
            } );
            this.elemento.replaceChildren( bloco.criarElemento() );
        }
    }

    Guia.componentes.ArquivoFixo = ArquivoFixo;

})( window.Guia );
