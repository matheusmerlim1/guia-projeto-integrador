(function ( Guia ) {
    'use strict';

    Guia.dados.exemplos[ 'emprestimo.entidade' ] = {
        php: {
            arquivos: [
                {
                    caminho: 'backend/src/emprestimo/Emprestimo.php',
                    codigo: String.raw`
<?php

// Regra R1: prazo de devolução, em dias.
const EMPRESTIMO_PRAZO_DIAS = 7;
// Regra R2: valor da multa por dia de atraso.
const EMPRESTIMO_MULTA_POR_DIA = 1.00;

/**
 * Entidade do domínio: representa o empréstimo de um livro a um leitor.
 * Guarda os dados do empréstimo e concentra as regras de negócio sobre ele.
 */
class Emprestimo {

    /**
     * Atributo privado: só pode ser alterado por métodos desta classe.
     * O "?" indica que pode ser null, o que significa "ainda não devolvido".
     */
    private ?DateTimeImmutable $dataDevolucao = null;

    /**
     * Construtor: é executado quando o objeto é criado com "new Emprestimo(...)".
     * Cada parâmetro marcado com "public readonly" vira um atributo público
     * que pode ser lido, mas não pode ser alterado depois da criação.
     */
    public function __construct(
        public readonly int|string $id,
        public readonly Livro $livro,
        public readonly Leitor $leitor,
        public readonly DateTimeImmutable $dataEmprestimo,
    ) {
    }

    /**
     * Regra R1: retorna a data limite para a devolução.
     * modify() cria uma nova data sem alterar a data do empréstimo.
     */
    public function dataLimite(): DateTimeImmutable {
        return $this->dataEmprestimo->modify( '+' . EMPRESTIMO_PRAZO_DIAS . ' days' );
    }

    /**
     * Retorna true enquanto o livro ainda não foi devolvido.
     */
    public function estaEmAberto(): bool {
        return $this->dataDevolucao === null;
    }

    /**
     * Registra a devolução do livro na data informada.
     * Regra R5: lança DominioException se o empréstimo já foi devolvido.
     */
    public function devolver( DateTimeImmutable $data ): void {
        if ( ! $this->estaEmAberto() ) {
            throw new DominioException( 'O empréstimo já foi devolvido.' );
        }
        if ( $data < $this->dataEmprestimo ) {
            throw new DominioException( 'A devolução não pode ser anterior ao empréstimo.' );
        }
        $this->dataDevolucao = $data;
    }

    /**
     * Retorna quantos dias se passaram depois da data limite.
     * Retorna 0 quando a data informada está dentro do prazo.
     */
    public function diasDeAtraso( DateTimeImmutable $data ): int {
        if ( $data <= $this->dataLimite() ) {
            return 0;
        }
        return (int) $this->dataLimite()->diff( $data )->days;
    }

    /**
     * Regra R2: calcula a multa multiplicando os dias de atraso pelo valor diário.
     */
    public function calcularMulta( DateTimeImmutable $data ): float {
        return $this->diasDeAtraso( $data ) * EMPRESTIMO_MULTA_POR_DIA;
    }
}
`,
                },
            ],
        },

        typescript: {
            arquivos: [
                {
                    caminho: 'backend/src/emprestimo/emprestimo.ts',
                    codigo: String.raw`
import { DominioError } from '../infra/dominio-error';
import { Leitor } from '../leitor/leitor';
import { Livro } from '../livro/livro';

// Regra R1: prazo de devolução, em dias.
export const EMPRESTIMO_PRAZO_DIAS = 7;
// Regra R2: valor da multa por dia de atraso.
export const EMPRESTIMO_MULTA_POR_DIA = 1.00;
// Quantidade de milissegundos em um dia, usada nos cálculos com datas.
const UM_DIA_EM_MS = 24 * 60 * 60 * 1000;

/**
 * Entidade do domínio: representa o empréstimo de um livro a um leitor.
 * Guarda os dados do empréstimo e concentra as regras de negócio sobre ele.
 */
export class Emprestimo {

    /**
     * Atributo privado: só pode ser alterado por métodos desta classe.
     * O tipo "Date | null" indica que fica null enquanto o livro não é devolvido.
     */
    private dataDevolucao: Date | null = null;

    /**
     * Construtor: é executado quando o objeto é criado com "new Emprestimo(...)".
     * Cada parâmetro marcado com "public readonly" vira um atributo público
     * que pode ser lido, mas não pode ser alterado depois da criação.
     */
    constructor(
        public readonly id: number,
        public readonly livro: Livro,
        public readonly leitor: Leitor,
        public readonly dataEmprestimo: Date,
    ) {
    }

    /**
     * Regra R1: retorna a data limite para a devolução.
     * Cria uma nova data somando o prazo, sem alterar a data do empréstimo.
     */
    dataLimite(): Date {
        return new Date( this.dataEmprestimo.getTime() + EMPRESTIMO_PRAZO_DIAS * UM_DIA_EM_MS );
    }

    /**
     * Retorna true enquanto o livro ainda não foi devolvido.
     */
    estaEmAberto(): boolean {
        return this.dataDevolucao === null;
    }

    /**
     * Registra a devolução do livro na data informada.
     * Regra R5: lança DominioError se o empréstimo já foi devolvido.
     */
    devolver( data: Date ): void {
        if ( ! this.estaEmAberto() ) {
            throw new DominioError( 'O empréstimo já foi devolvido.' );
        }
        if ( data < this.dataEmprestimo ) {
            throw new DominioError( 'A devolução não pode ser anterior ao empréstimo.' );
        }
        this.dataDevolucao = data;
    }

    /**
     * Retorna quantos dias se passaram depois da data limite.
     * Retorna 0 quando a data informada está dentro do prazo.
     */
    diasDeAtraso( data: Date ): number {
        const diferenca = data.getTime() - this.dataLimite().getTime();
        if ( diferenca <= 0 ) {
            return 0;
        }
        return Math.floor( diferenca / UM_DIA_EM_MS );
    }

    /**
     * Regra R2: calcula a multa multiplicando os dias de atraso pelo valor diário.
     */
    calcularMulta( data: Date ): number {
        return this.diasDeAtraso( data ) * EMPRESTIMO_MULTA_POR_DIA;
    }
}
`,
                },
            ],
        },

        javascript: {
            arquivos: [
                {
                    caminho: 'backend/src/emprestimo/emprestimo.js',
                    codigo: String.raw`
import { DominioError } from '../infra/dominio-error.js';

// Regra R1: prazo de devolução, em dias.
export const EMPRESTIMO_PRAZO_DIAS = 7;
// Regra R2: valor da multa por dia de atraso.
export const EMPRESTIMO_MULTA_POR_DIA = 1.00;
// Quantidade de milissegundos em um dia, usada nos cálculos com datas.
const UM_DIA_EM_MS = 24 * 60 * 60 * 1000;

/**
 * Entidade do domínio: representa o empréstimo de um livro a um leitor.
 * Guarda os dados do empréstimo e concentra as regras de negócio sobre ele.
 */
export class Emprestimo {

    /**
     * Campo privado: o "#" impede o acesso de fora da classe.
     * Fica null enquanto o livro não é devolvido.
     */
    #dataDevolucao = null;

    /**
     * Construtor: é executado quando o objeto é criado com "new Emprestimo(...)".
     * Em JavaScript os atributos são criados atribuindo valores a "this".
     */
    constructor( id, livro, leitor, dataEmprestimo ) {
        this.id = id;
        this.livro = livro;
        this.leitor = leitor;
        this.dataEmprestimo = dataEmprestimo;
    }

    /**
     * Regra R1: retorna a data limite para a devolução.
     * Cria uma nova data somando o prazo, sem alterar a data do empréstimo.
     */
    dataLimite() {
        return new Date( this.dataEmprestimo.getTime() + EMPRESTIMO_PRAZO_DIAS * UM_DIA_EM_MS );
    }

    /**
     * Retorna true enquanto o livro ainda não foi devolvido.
     */
    estaEmAberto() {
        return this.#dataDevolucao === null;
    }

    /**
     * Registra a devolução do livro na data informada.
     * Regra R5: lança DominioError se o empréstimo já foi devolvido.
     */
    devolver( data ) {
        if ( ! this.estaEmAberto() ) {
            throw new DominioError( 'O empréstimo já foi devolvido.' );
        }
        if ( data < this.dataEmprestimo ) {
            throw new DominioError( 'A devolução não pode ser anterior ao empréstimo.' );
        }
        this.#dataDevolucao = data;
    }

    /**
     * Retorna quantos dias se passaram depois da data limite.
     * Retorna 0 quando a data informada está dentro do prazo.
     */
    diasDeAtraso( data ) {
        const diferenca = data.getTime() - this.dataLimite().getTime();
        if ( diferenca <= 0 ) {
            return 0;
        }
        return Math.floor( diferenca / UM_DIA_EM_MS );
    }

    /**
     * Regra R2: calcula a multa multiplicando os dias de atraso pelo valor diário.
     */
    calcularMulta( data ) {
        return this.diasDeAtraso( data ) * EMPRESTIMO_MULTA_POR_DIA;
    }
}
`,
                },
            ],
        },

        java: {
            arquivos: [
                {
                    caminho: 'backend/src/main/java/biblioteca/emprestimo/Emprestimo.java',
                    codigo: String.raw`
package biblioteca.emprestimo;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import biblioteca.infra.DominioException;
import biblioteca.leitor.Leitor;
import biblioteca.livro.Livro;

/**
 * Entidade do domínio: representa o empréstimo de um livro a um leitor.
 * Guarda os dados do empréstimo e concentra as regras de negócio sobre ele.
 */
public class Emprestimo {

    // Regra R1: prazo de devolução, em dias.
    public static final int PRAZO_DIAS = 7;
    // Regra R2: valor da multa por dia de atraso.
    public static final double MULTA_POR_DIA = 1.00;

    // Atributos "final" recebem valor no construtor e não mudam mais.
    private final long id;
    private final Livro livro;
    private final Leitor leitor;
    private final LocalDate dataEmprestimo;
    // Fica null enquanto o livro não é devolvido.
    private LocalDate dataDevolucao;

    /**
     * Construtor: é executado quando o objeto é criado com "new Emprestimo(...)".
     * Recebe os dados obrigatórios e os guarda nos atributos.
     */
    public Emprestimo( long id, Livro livro, Leitor leitor, LocalDate dataEmprestimo ) {
        this.id = id;
        this.livro = livro;
        this.leitor = leitor;
        this.dataEmprestimo = dataEmprestimo;
    }

    /**
     * Regra R1: retorna a data limite para a devolução.
     * plusDays() cria uma nova data sem alterar a data do empréstimo.
     */
    public LocalDate dataLimite() {
        return dataEmprestimo.plusDays( PRAZO_DIAS );
    }

    /**
     * Retorna true enquanto o livro ainda não foi devolvido.
     */
    public boolean estaEmAberto() {
        return dataDevolucao == null;
    }

    /**
     * Registra a devolução do livro na data informada.
     * Regra R5: lança DominioException se o empréstimo já foi devolvido.
     */
    public void devolver( LocalDate data ) {
        if ( ! estaEmAberto() ) {
            throw new DominioException( "O empréstimo já foi devolvido." );
        }
        if ( data.isBefore( dataEmprestimo ) ) {
            throw new DominioException( "A devolução não pode ser anterior ao empréstimo." );
        }
        dataDevolucao = data;
    }

    /**
     * Retorna quantos dias se passaram depois da data limite.
     * Retorna 0 quando a data informada está dentro do prazo.
     */
    public long diasDeAtraso( LocalDate data ) {
        long dias = ChronoUnit.DAYS.between( dataLimite(), data );
        return Math.max( dias, 0 );
    }

    /**
     * Regra R2: calcula a multa multiplicando os dias de atraso pelo valor diário.
     */
    public double calcularMulta( LocalDate data ) {
        return diasDeAtraso( data ) * MULTA_POR_DIA;
    }

    // Métodos de acesso (getters): permitem ler os atributos privados.
    public long getId() { return id; }
    public Livro getLivro() { return livro; }
    public Leitor getLeitor() { return leitor; }
    public LocalDate getDataEmprestimo() { return dataEmprestimo; }
}
`,
                },
            ],
        },
    };

})( window.Guia );
