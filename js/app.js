(function ( Guia ) {
    'use strict';

    class Aplicacao {

        constructor() {
            this.preferencias = new Guia.nucleo.Preferencias( { backend: 'php', frontend: 'typescript', banco: 'mariadb' } );
            this.projeto = new Guia.nucleo.ProjetoAtual( this.preferencias );
        }

        iniciar() {
            const { componentes } = Guia;

            document.querySelectorAll( '[data-seletor-linguagem]' ).forEach( elemento => {
                new componentes.SeletorLinguagem( elemento, this.preferencias ).iniciar();
            } );
            document.querySelectorAll( '[data-exemplo]' ).forEach( elemento => {
                new componentes.VisualizadorLinguagens( elemento, this.preferencias ).iniciar();
            } );
            document.querySelectorAll( '[data-arquivo]' ).forEach( elemento => {
                new componentes.ArquivoFixo( elemento ).iniciar();
            } );
            document.querySelectorAll( '[data-arquivo-projeto]' ).forEach( elemento => {
                new componentes.ArquivoDoProjeto( elemento, this.projeto ).iniciar();
            } );
            document.querySelectorAll( '[data-passo-a-passo]' ).forEach( elemento => {
                new componentes.PassoAPasso( elemento, this.preferencias ).iniciar();
            } );
            document.querySelectorAll( '[data-mostrar-quando]' ).forEach( elemento => {
                new componentes.ConteudoPorVariante( elemento, this.preferencias ).iniciar();
            } );
            document.querySelectorAll( '[data-imagem-estrutura]' ).forEach( elemento => {
                new componentes.ImagemEstrutura( elemento, this.preferencias ).iniciar();
            } );

            const simulador = new componentes.SimuladorAplicacao();
            simulador.iniciar();

            new componentes.ExploradorProjeto(
                document.querySelector( '[data-explorador]' ),
                this.projeto,
                new componentes.VisualizadorArquivo( simulador )
            ).iniciar();

            new componentes.NavegacaoLateral(
                document.getElementById( 'painel-lateral' ),
                document.querySelector( '[data-lista-etapas]' ),
                document.querySelector( '.barra-topo__menu' )
            ).iniciar();

            new componentes.BuscaNaPagina(
                document.querySelector( '[data-busca]' ),
                document.getElementById( 'inicio' )
            ).iniciar();
        }
    }

    new Aplicacao().iniciar();

})( window.Guia );
