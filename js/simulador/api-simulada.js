(function ( Guia ) {
    'use strict';

    const PRAZO_DIAS = 7;
    const MULTA_POR_DIA = 1;
    const LIMITE_EMPRESTIMOS = 3;

    class ApiSimulada {

        constructor() {
            this.reiniciar();
        }

        reiniciar() {
            this.hoje = this.dataDeHoje();
            this.dados = Guia.simulador.criarDadosIniciais( this.hoje );
        }

        dataDeHoje() {
            const agora = new Date();
            return new Date( agora.getFullYear(), agora.getMonth(), agora.getDate() );
        }

        listarLivros() {
            return [ ...this.dados.livros ].sort( ( a, b ) => a.titulo.localeCompare( b.titulo, 'pt-BR' ) );
        }

        listarLeitores() {
            return [ ...this.dados.leitores ].sort( ( a, b ) => a.nome.localeCompare( b.nome, 'pt-BR' ) );
        }

        listarEmAberto() {
            return this.emAberto()
                .sort( ( a, b ) => a.dataEmprestimo - b.dataEmprestimo || a.id - b.id )
                .map( registro => this.paraDados( registro ) );
        }

        registrar( livroId, leitorId ) {
            const problemas = [];
            if ( ! livroId ) {
                problemas.push( 'Informe o livro.' );
            }
            if ( ! leitorId ) {
                problemas.push( 'Informe o leitor.' );
            }
            if ( problemas.length > 0 ) {
                throw new Error( problemas.join( ' ' ) );
            }
            if ( this.emAberto().some( registro => registro.livroId === livroId ) ) {
                throw new Error( 'O livro já está emprestado.' );
            }
            if ( this.emAberto().filter( registro => registro.leitorId === leitorId ).length >= LIMITE_EMPRESTIMOS ) {
                throw new Error( 'O leitor já tem ' + LIMITE_EMPRESTIMOS + ' empréstimos em aberto.' );
            }
            const registro = {
                id: Math.max( 0, ...this.dados.emprestimos.map( r => r.id ) ) + 1,
                livroId,
                leitorId,
                dataEmprestimo: this.hoje,
                devolvido: false,
            };
            this.dados.emprestimos.push( registro );
            return this.paraDados( registro );
        }

        devolver( id ) {
            const registro = this.emAberto().find( r => r.id === id );
            if ( ! registro ) {
                throw new Error( 'Empréstimo não encontrado ou já devolvido.' );
            }
            const dados = this.paraDados( registro );
            registro.devolvido = true;
            return { id, diasDeAtraso: dados.diasDeAtraso, multa: dados.multa };
        }

        emAberto() {
            return this.dados.emprestimos.filter( registro => ! registro.devolvido );
        }

        paraDados( registro ) {
            const livro = this.dados.livros.find( l => l.id === registro.livroId );
            const leitor = this.dados.leitores.find( l => l.id === registro.leitorId );
            const dataLimite = new Date( registro.dataEmprestimo.getTime() + PRAZO_DIAS * Guia.simulador.UM_DIA_EM_MS );
            const diferenca = this.hoje.getTime() - dataLimite.getTime();
            const diasDeAtraso = diferenca > 0 ? Math.round( diferenca / Guia.simulador.UM_DIA_EM_MS ) : 0;
            return {
                id: registro.id,
                livro: { id: livro.id, titulo: livro.titulo, autor: livro.autor },
                leitor: { id: leitor.id, nome: leitor.nome },
                dataEmprestimo: registro.dataEmprestimo,
                dataLimite,
                diasDeAtraso,
                multa: diasDeAtraso * MULTA_POR_DIA,
            };
        }
    }

    Guia.simulador.ApiSimulada = ApiSimulada;

})( window.Guia );
