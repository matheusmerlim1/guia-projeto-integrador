(function ( Guia ) {
    'use strict';

    Guia.dados.exemplos[ 'emprestimo.teste' ] = {
        php: {
            comando: 'composer test',
            arquivos: [
                {
                    caminho: 'backend/spec/Emprestimo.spec.php',
                    codigo: String.raw`
<?php

// describe() agrupa os testes de um mesmo assunto; aqui, a classe Emprestimo.
describe( Emprestimo::class, function() {

    // beforeEach() roda antes de CADA teste: todo teste começa com um empréstimo novo.
    beforeEach( function() {
        $livro = new Livro( 1, 'Dom Casmurro', 'Machado de Assis', 1899 );
        $leitor = new Leitor( 1, 'Ana Souza', '22999990000' );
        $this->emprestimo = new Emprestimo( 1, $livro, $leitor, new DateTimeImmutable( '2026-09-01' ) );
    } );

    // Um describe() dentro de outro agrupa os testes de um único método.
    describe( 'dataLimite', function() {

        // it() é um caso de teste: descreve o comportamento esperado.
        it( 'é sete dias após a data do empréstimo', function() {
            $limite = $this->emprestimo->dataLimite();
            // expect(valor)->toBe(esperado) falha o teste se os valores forem diferentes.
            expect( $limite->format( 'Y-m-d' ) )->toBe( '2026-09-08' );
        } );
    } );

    describe( 'calcularMulta', function() {

        it( 'não cobra multa quando devolvido dentro do prazo', function() {
            $multa = $this->emprestimo->calcularMulta( new DateTimeImmutable( '2026-09-08' ) );
            expect( $multa )->toBe( 0.0 );
        } );

        it( 'cobra um real por dia de atraso', function() {
            $multa = $this->emprestimo->calcularMulta( new DateTimeImmutable( '2026-09-11' ) );
            expect( $multa )->toBe( 3.0 );
        } );
    } );

    describe( 'devolver', function() {

        it( 'encerra o empréstimo', function() {
            $this->emprestimo->devolver( new DateTimeImmutable( '2026-09-05' ) );
            expect( $this->emprestimo->estaEmAberto() )->toBe( false );
        } );

        it( 'lança exceção ao devolver um empréstimo já devolvido', function() {
            $this->emprestimo->devolver( new DateTimeImmutable( '2026-09-05' ) );
            // Para testar exceções, o código vai dentro de uma função passada ao expect().
            expect( function() {
                $this->emprestimo->devolver( new DateTimeImmutable( '2026-09-06' ) );
            } )->toThrow( new DominioException( 'O empréstimo já foi devolvido.' ) );
        } );
    } );

} );
`,
                },
            ],
        },

        typescript: {
            comando: 'pnpm test',
            arquivos: [
                {
                    caminho: 'backend/test/emprestimo.spec.ts',
                    codigo: String.raw`
import { describe, it, expect, beforeEach } from 'vitest';
import { Emprestimo } from '../src/emprestimo/emprestimo';
import { Livro } from '../src/livro/livro';
import { Leitor } from '../src/leitor/leitor';
import { DominioError } from '../src/infra/dominio-error';

// describe() agrupa os testes de um mesmo assunto; aqui, a classe Emprestimo.
describe( Emprestimo.name, () => {

    let emprestimo: Emprestimo;

    // beforeEach() roda antes de CADA teste: todo teste começa com um empréstimo novo.
    beforeEach( () => {
        const livro = new Livro( 1, 'Dom Casmurro', 'Machado de Assis', 1899 );
        const leitor = new Leitor( 1, 'Ana Souza', '22999990000' );
        emprestimo = new Emprestimo( 1, livro, leitor, new Date( '2026-09-01T00:00:00' ) );
    } );

    // Um describe() dentro de outro agrupa os testes de um único método.
    describe( 'dataLimite', () => {

        // it() é um caso de teste: descreve o comportamento esperado.
        it( 'é sete dias após a data do empréstimo', () => {
            const limite = emprestimo.dataLimite();
            // toEqual() compara o conteúdo; para datas, compara o instante representado.
            expect( limite ).toEqual( new Date( '2026-09-08T00:00:00' ) );
        } );
    } );

    describe( 'calcularMulta', () => {

        it( 'não cobra multa quando devolvido dentro do prazo', () => {
            const multa = emprestimo.calcularMulta( new Date( '2026-09-08T00:00:00' ) );
            // toBe() compara valores simples, como números e textos.
            expect( multa ).toBe( 0 );
        } );

        it( 'cobra um real por dia de atraso', () => {
            const multa = emprestimo.calcularMulta( new Date( '2026-09-11T00:00:00' ) );
            expect( multa ).toBe( 3 );
        } );
    } );

    describe( 'devolver', () => {

        it( 'encerra o empréstimo', () => {
            emprestimo.devolver( new Date( '2026-09-05T00:00:00' ) );
            expect( emprestimo.estaEmAberto() ).toBe( false );
        } );

        it( 'lança exceção ao devolver um empréstimo já devolvido', () => {
            emprestimo.devolver( new Date( '2026-09-05T00:00:00' ) );
            // Para testar exceções, o código vai dentro de uma função passada ao expect().
            expect( () => {
                emprestimo.devolver( new Date( '2026-09-06T00:00:00' ) );
            } ).toThrow( DominioError );
        } );
    } );

} );
`,
                },
            ],
        },

        javascript: {
            comando: 'pnpm test',
            arquivos: [
                {
                    caminho: 'backend/test/emprestimo.spec.js',
                    codigo: String.raw`
import { describe, it, expect, beforeEach } from 'vitest';
import { Emprestimo } from '../src/emprestimo/emprestimo.js';
import { Livro } from '../src/livro/livro.js';
import { Leitor } from '../src/leitor/leitor.js';
import { DominioError } from '../src/infra/dominio-error.js';

// describe() agrupa os testes de um mesmo assunto; aqui, a classe Emprestimo.
describe( Emprestimo.name, () => {

    let emprestimo;

    // beforeEach() roda antes de CADA teste: todo teste começa com um empréstimo novo.
    beforeEach( () => {
        const livro = new Livro( 1, 'Dom Casmurro', 'Machado de Assis', 1899 );
        const leitor = new Leitor( 1, 'Ana Souza', '22999990000' );
        emprestimo = new Emprestimo( 1, livro, leitor, new Date( '2026-09-01T00:00:00' ) );
    } );

    // Um describe() dentro de outro agrupa os testes de um único método.
    describe( 'dataLimite', () => {

        // it() é um caso de teste: descreve o comportamento esperado.
        it( 'é sete dias após a data do empréstimo', () => {
            const limite = emprestimo.dataLimite();
            // toEqual() compara o conteúdo; para datas, compara o instante representado.
            expect( limite ).toEqual( new Date( '2026-09-08T00:00:00' ) );
        } );
    } );

    describe( 'calcularMulta', () => {

        it( 'não cobra multa quando devolvido dentro do prazo', () => {
            const multa = emprestimo.calcularMulta( new Date( '2026-09-08T00:00:00' ) );
            // toBe() compara valores simples, como números e textos.
            expect( multa ).toBe( 0 );
        } );

        it( 'cobra um real por dia de atraso', () => {
            const multa = emprestimo.calcularMulta( new Date( '2026-09-11T00:00:00' ) );
            expect( multa ).toBe( 3 );
        } );
    } );

    describe( 'devolver', () => {

        it( 'encerra o empréstimo', () => {
            emprestimo.devolver( new Date( '2026-09-05T00:00:00' ) );
            expect( emprestimo.estaEmAberto() ).toBe( false );
        } );

        it( 'lança exceção ao devolver um empréstimo já devolvido', () => {
            emprestimo.devolver( new Date( '2026-09-05T00:00:00' ) );
            // Para testar exceções, o código vai dentro de uma função passada ao expect().
            expect( () => {
                emprestimo.devolver( new Date( '2026-09-06T00:00:00' ) );
            } ).toThrow( DominioError );
        } );
    } );

} );
`,
                },
            ],
        },

        java: {
            comando: 'mvn test',
            arquivos: [
                {
                    caminho: 'backend/src/test/java/biblioteca/emprestimo/EmprestimoTest.java',
                    codigo: String.raw`
package biblioteca.emprestimo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.time.LocalDate;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import biblioteca.infra.DominioException;
import biblioteca.leitor.Leitor;
import biblioteca.livro.Livro;

// Classe de teste: o JUnit executa cada método marcado com @Test.
class EmprestimoTest {

    private Emprestimo emprestimo;

    // @BeforeEach roda antes de CADA teste: todo teste começa com um empréstimo novo.
    @BeforeEach
    void criarEmprestimo() {
        Livro livro = new Livro( 1, "Dom Casmurro", "Machado de Assis", 1899 );
        Leitor leitor = new Leitor( 1, "Ana Souza", "22999990000" );
        emprestimo = new Emprestimo( 1, livro, leitor, LocalDate.of( 2026, 9, 1 ) );
    }

    // @Nested cria um grupo de testes; aqui, os testes do método dataLimite().
    @Nested
    class DataLimite {

        // @Test marca um caso de teste; @DisplayName define o nome exibido no relatório.
        @Test
        @DisplayName( "é sete dias após a data do empréstimo" )
        void seteDiasAposOEmprestimo() {
            // assertEquals(esperado, obtido) falha o teste se os valores forem diferentes.
            assertEquals( LocalDate.of( 2026, 9, 8 ), emprestimo.dataLimite() );
        }
    }

    @Nested
    class CalcularMulta {

        @Test
        @DisplayName( "não cobra multa quando devolvido dentro do prazo" )
        void semMultaDentroDoPrazo() {
            assertEquals( 0.0, emprestimo.calcularMulta( LocalDate.of( 2026, 9, 8 ) ) );
        }

        @Test
        @DisplayName( "cobra um real por dia de atraso" )
        void umRealPorDiaDeAtraso() {
            assertEquals( 3.0, emprestimo.calcularMulta( LocalDate.of( 2026, 9, 11 ) ) );
        }
    }

    @Nested
    class Devolver {

        @Test
        @DisplayName( "encerra o empréstimo" )
        void encerraOEmprestimo() {
            emprestimo.devolver( LocalDate.of( 2026, 9, 5 ) );
            assertFalse( emprestimo.estaEmAberto() );
        }

        @Test
        @DisplayName( "lança exceção ao devolver um empréstimo já devolvido" )
        void naoDevolveDuasVezes() {
            emprestimo.devolver( LocalDate.of( 2026, 9, 5 ) );
            // assertThrows() verifica se o código dentro da lambda "() -> ..." lança a exceção.
            assertThrows( DominioException.class,
                () -> emprestimo.devolver( LocalDate.of( 2026, 9, 6 ) ) );
        }
    }
}
`,
                },
            ],
        },
    };

})( window.Guia );
