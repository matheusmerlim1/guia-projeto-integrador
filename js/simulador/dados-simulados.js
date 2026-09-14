(function ( Guia ) {
    'use strict';

    const UM_DIA_EM_MS = 24 * 60 * 60 * 1000;

    Guia.simulador.criarDadosIniciais = function ( hoje ) {
        const diasAtras = dias => new Date( hoje.getTime() - dias * UM_DIA_EM_MS );
        return {
            livros: [
                { id: 1, titulo: 'Dom Casmurro', autor: 'Machado de Assis', ano: 1899 },
                { id: 2, titulo: 'O Cortiço', autor: 'Aluísio Azevedo', ano: 1890 },
                { id: 3, titulo: 'Vidas Secas', autor: 'Graciliano Ramos', ano: 1938 },
                { id: 4, titulo: 'Capitães da Areia', autor: 'Jorge Amado', ano: 1937 },
                { id: 5, titulo: 'A Hora da Estrela', autor: 'Clarice Lispector', ano: 1977 },
                { id: 6, titulo: 'Memórias Póstumas de Brás Cubas', autor: 'Machado de Assis', ano: 1881 },
            ],
            leitores: [
                { id: 1, nome: 'Ana Souza', telefone: '22999990000' },
                { id: 2, nome: 'Bruno Lima', telefone: '22988880000' },
                { id: 3, nome: 'Carla Mendes', telefone: '22977770000' },
            ],
            emprestimos: [
                { id: 1, livroId: 1, leitorId: 1, dataEmprestimo: diasAtras( 10 ), devolvido: false },
                { id: 2, livroId: 4, leitorId: 2, dataEmprestimo: diasAtras( 2 ), devolvido: false },
            ],
        };
    };

    Guia.simulador.UM_DIA_EM_MS = UM_DIA_EM_MS;

})( window.Guia );
