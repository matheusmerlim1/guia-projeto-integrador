(function ( Guia ) {
    'use strict';

    Guia.dados.arquivos[ 'git.gitignore' ] = {
        caminho: '.gitignore',
        codigo: String.raw`
node_modules
vendor
dist
test-results
coverage
`,
    };

    Guia.dados.arquivos[ 'git.readme-inicial' ] = {
        caminho: 'README.md',
        codigo: String.raw`
# Biblioteca Comunitária

Integrantes: Ana Souza e Bruno Lima.

## Como executar

Em construção.
`,
    };

    Guia.dados.arquivos[ 'git.emprestimo-v1' ] = {
        caminho: 'backend/src/emprestimo/Emprestimo.php',
        codigo: String.raw`
<?php

// Regra R1: prazo de devolução, em dias.
const EMPRESTIMO_PRAZO_DIAS = 7;

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

}
`,
    };

    Guia.dados.arquivos[ 'git.readme-conflito' ] = {
        caminho: 'README.md',
        codigo: String.raw`
# Biblioteca Comunitária

Integrantes: Ana Souza e Bruno Lima.

## Como executar

<<<<<<< HEAD
1. Crie o banco de dados com o arquivo backend/db/estrutura.sql.
=======
1. Instale as dependências do back-end e do front-end.
>>>>>>> readme-execucao
`,
    };

    Guia.dados.arquivos[ 'git.readme-resolvido' ] = {
        caminho: 'README.md',
        codigo: String.raw`
# Biblioteca Comunitária

Integrantes: Ana Souza e Bruno Lima.

## Como executar

1. Crie o banco de dados com o arquivo backend/db/estrutura.sql.
2. Instale as dependências do back-end e do front-end.
`,
    };

})( window.Guia );
