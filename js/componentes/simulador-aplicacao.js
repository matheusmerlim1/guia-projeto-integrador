(function ( Guia ) {
    'use strict';

    class SimuladorAplicacao {

        constructor() {
            this.api = new Guia.simulador.ApiSimulada();
            this.dialogo = this.criarDialogo();
            document.body.append( this.dialogo );
            this.tela = new Guia.simulador.TelaSimulada( this.areaAplicacao, this.api );
            this.tela.iniciar();
        }

        iniciar() {
            document.querySelectorAll( '[data-abrir-simulador]' ).forEach( botao => {
                botao.addEventListener( 'click', () => this.abrir() );
            } );
        }

        abrir() {
            this.dialogo.showModal();
        }

        reiniciar() {
            this.api.reiniciar();
            this.tela.iniciar();
        }

        criarDialogo() {
            const dialogo = document.createElement( 'dialog' );
            dialogo.className = 'dialogo dialogo-simulador';
            dialogo.setAttribute( 'aria-labelledby', 'dialogo-simulador-titulo' );
            dialogo.innerHTML = `
                <header class="dialogo__cabecalho">
                    <div class="dialogo-simulador__textos">
                        <h2 class="dialogo__titulo" id="dialogo-simulador-titulo">A aplicação funcionando</h2>
                        <p class="dialogo-simulador__aviso">
                            Simulação da tela do front-end. Registre empréstimos, tente quebrar as regras e devolva livros:
                            as mensagens são as mesmas da aplicação real, mas os dados ficam só na memória desta página.
                        </p>
                    </div>
                    <button type="button" class="botao" data-reiniciar>Reiniciar dados</button>
                    <button type="button" class="dialogo__fechar" data-fechar aria-label="Fechar">×</button>
                </header>
                <div class="dialogo__corpo dialogo-simulador__corpo">
                    <div class="navegador-simulado">
                        <div class="navegador-simulado__barra">
                            <span class="navegador-simulado__bolinhas" aria-hidden="true"><i></i><i></i><i></i></span>
                            <span class="navegador-simulado__endereco">localhost:5173/emprestimos</span>
                        </div>
                        <div class="navegador-simulado__pagina app-simulada" data-aplicacao></div>
                    </div>
                </div>`;

            this.areaAplicacao = dialogo.querySelector( '[data-aplicacao]' );
            dialogo.querySelector( '[data-fechar]' ).addEventListener( 'click', () => dialogo.close() );
            dialogo.querySelector( '[data-reiniciar]' ).addEventListener( 'click', () => this.reiniciar() );
            dialogo.addEventListener( 'click', evento => {
                if ( evento.target === dialogo ) {
                    dialogo.close();
                }
            } );
            return dialogo;
        }
    }

    Guia.componentes.SimuladorAplicacao = SimuladorAplicacao;

})( window.Guia );
