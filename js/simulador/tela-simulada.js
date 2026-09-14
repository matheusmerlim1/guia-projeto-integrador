(function ( Guia ) {
    'use strict';

    const MODELO = `
        <header class="app-simulada__cabecalho">
            <div class="app-simulada__container app-simulada__cabecalho-conteudo">
                <span class="app-simulada__marca">Cantinho da Leitura</span>
                <span class="app-simulada__menu">Empréstimos</span>
            </div>
        </header>
        <main class="app-simulada__container app-simulada__principal">
            <h1 class="app-simulada__titulo">Empréstimos</h1>
            <div class="app-simulada__alerta" data-mensagem role="status" hidden></div>
            <form class="app-simulada__cartao" data-formulario>
                <h2 class="app-simulada__subtitulo">Novo empréstimo</h2>
                <div class="app-simulada__campos">
                    <div class="app-simulada__campo">
                        <label class="app-simulada__rotulo" for="simulador-livro">Livro</label>
                        <select class="app-simulada__select" id="simulador-livro" data-livro></select>
                    </div>
                    <div class="app-simulada__campo">
                        <label class="app-simulada__rotulo" for="simulador-leitor">Leitor</label>
                        <select class="app-simulada__select" id="simulador-leitor" data-leitor></select>
                    </div>
                    <div class="app-simulada__campo app-simulada__campo--botao">
                        <button class="app-simulada__botao-registrar" type="submit">Registrar</button>
                    </div>
                </div>
            </form>
            <h2 class="app-simulada__subtitulo">Em aberto</h2>
            <div class="app-simulada__tabela-rolavel">
                <table class="app-simulada__tabela">
                    <thead>
                        <tr>
                            <th>Livro</th>
                            <th>Leitor</th>
                            <th>Emprestado em</th>
                            <th>Devolver até</th>
                            <th>Situação</th>
                            <th class="app-simulada__direita">Multa</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody data-emprestimos></tbody>
                </table>
            </div>
            <p class="app-simulada__vazio" data-vazio hidden>Nenhum empréstimo em aberto.</p>
        </main>`;

    class TelaSimulada {

        constructor( raiz, api ) {
            this.raiz = raiz;
            this.api = api;
        }

        iniciar() {
            this.raiz.innerHTML = MODELO;
            this.formulario = this.raiz.querySelector( '[data-formulario]' );
            this.campoLivro = this.raiz.querySelector( '[data-livro]' );
            this.campoLeitor = this.raiz.querySelector( '[data-leitor]' );
            this.corpoTabela = this.raiz.querySelector( '[data-emprestimos]' );
            this.mensagem = this.raiz.querySelector( '[data-mensagem]' );
            this.avisoVazio = this.raiz.querySelector( '[data-vazio]' );

            this.formulario.addEventListener( 'submit', evento => {
                evento.preventDefault();
                this.registrar( Number( this.campoLivro.value ), Number( this.campoLeitor.value ) );
            } );
            this.corpoTabela.addEventListener( 'click', evento => {
                const botao = evento.target.closest( 'button[data-id]' );
                if ( botao ) {
                    this.devolver( Number( botao.dataset.id ) );
                }
            } );

            this.preencherLista( this.campoLivro, 'Escolha um livro', this.api.listarLivros().map( l => [ l.id, l.titulo ] ) );
            this.preencherLista( this.campoLeitor, 'Escolha um leitor', this.api.listarLeitores().map( l => [ l.id, l.nome ] ) );
            this.atualizarLista();
        }

        registrar( livroId, leitorId ) {
            try {
                const emprestimo = this.api.registrar( livroId, leitorId );
                this.exibirMensagem( 'Empréstimo registrado. Devolver até ' + formatarData( emprestimo.dataLimite ) + '.', 'sucesso' );
                this.formulario.reset();
                this.atualizarLista();
            } catch ( erro ) {
                this.exibirMensagem( erro.message, 'erro' );
            }
        }

        devolver( id ) {
            try {
                const devolucao = this.api.devolver( id );
                const texto = devolucao.multa > 0
                    ? 'Livro devolvido com ' + devolucao.diasDeAtraso + ' dia(s) de atraso. Multa: ' + formatarMoeda( devolucao.multa ) + '.'
                    : 'Livro devolvido dentro do prazo.';
                this.exibirMensagem( texto, 'sucesso' );
                this.atualizarLista();
            } catch ( erro ) {
                this.exibirMensagem( erro.message, 'erro' );
            }
        }

        atualizarLista() {
            const emprestimos = this.api.listarEmAberto();
            this.corpoTabela.replaceChildren( ...emprestimos.map( e => this.criarLinha( e ) ) );
            this.avisoVazio.hidden = emprestimos.length > 0;
        }

        exibirMensagem( texto, tipo ) {
            this.mensagem.textContent = texto;
            this.mensagem.dataset.tipo = tipo;
            this.mensagem.hidden = false;
        }

        preencherLista( campo, textoInicial, opcoes ) {
            campo.replaceChildren(
                new Option( textoInicial, '' ),
                ...opcoes.map( ( [ valor, texto ] ) => new Option( texto, String( valor ) ) )
            );
        }

        criarLinha( emprestimo ) {
            const linha = document.createElement( 'tr' );
            const atrasado = emprestimo.diasDeAtraso > 0;
            linha.classList.toggle( 'app-simulada__linha-atrasada', atrasado );

            const livro = document.createElement( 'td' );
            const autor = document.createElement( 'span' );
            autor.className = 'app-simulada__autor';
            autor.textContent = emprestimo.livro.autor;
            livro.append( emprestimo.livro.titulo, autor );

            const situacao = document.createElement( 'span' );
            situacao.className = 'app-simulada__selo app-simulada__selo--' + ( atrasado ? 'atraso' : 'prazo' );
            situacao.textContent = atrasado ? emprestimo.diasDeAtraso + ' dia(s) de atraso' : 'No prazo';

            const botao = document.createElement( 'button' );
            botao.type = 'button';
            botao.className = 'app-simulada__botao-devolver';
            botao.dataset.id = String( emprestimo.id );
            botao.textContent = 'Devolver';

            linha.append(
                livro,
                this.celula( emprestimo.leitor.nome ),
                this.celula( formatarData( emprestimo.dataEmprestimo ) ),
                this.celula( formatarData( emprestimo.dataLimite ) ),
                this.celula( situacao ),
                this.celula( formatarMoeda( emprestimo.multa ), true ),
                this.celula( botao, true ),
            );
            return linha;
        }

        celula( conteudo, direita = false ) {
            const celula = document.createElement( 'td' );
            celula.classList.toggle( 'app-simulada__direita', direita );
            celula.append( conteudo );
            return celula;
        }
    }

    function formatarData( data ) {
        return data.toLocaleDateString( 'pt-BR' );
    }

    function formatarMoeda( valor ) {
        return valor.toLocaleString( 'pt-BR', { style: 'currency', currency: 'BRL' } );
    }

    Guia.simulador.TelaSimulada = TelaSimulada;

})( window.Guia );
