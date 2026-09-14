(function ( Guia ) {
    'use strict';

    Guia.dados.exemplos[ 'emprestimo.apoio' ] = {
        php: {
            arquivos: [
                {
                    caminho: 'backend/src/livro/Livro.php',
                    codigo: String.raw`
<?php

/**
 * Entidade do domínio: um livro do acervo da biblioteca.
 * Não tem regras próprias neste exemplo, apenas dados.
 */
class Livro {

    /**
     * Construtor com promoção de propriedades: cada parâmetro
     * "public readonly" vira um atributo somente leitura.
     */
    public function __construct(
        public readonly int|string $id,
        public readonly string $titulo,
        public readonly string $autor,
        public readonly int $ano,
    ) {
    }
}
`,
                },
                {
                    caminho: 'backend/src/leitor/Leitor.php',
                    codigo: String.raw`
<?php

// Regra R3: quantidade máxima de empréstimos em aberto por leitor.
const LEITOR_LIMITE_EMPRESTIMOS = 3;

/**
 * Entidade do domínio: uma pessoa cadastrada que pega livros emprestados.
 */
class Leitor {

    /**
     * Construtor: recebe os dados do leitor e os guarda como atributos somente leitura.
     */
    public function __construct(
        public readonly int|string $id,
        public readonly string $nome,
        public readonly string $telefone,
    ) {
    }

    /**
     * Regra R3: diz se o leitor ainda pode pegar mais um livro,
     * a partir da quantidade de empréstimos que ele tem em aberto.
     */
    public function podePegarEmprestado( int $emprestimosEmAberto ): bool {
        return $emprestimosEmAberto < LEITOR_LIMITE_EMPRESTIMOS;
    }
}
`,
                },
                {
                    caminho: 'backend/src/infra/DominioException.php',
                    codigo: String.raw`
<?php

/**
 * Exceção lançada quando uma regra de negócio é violada.
 * Herda de RuntimeException, a exceção padrão do PHP para erros em tempo de execução.
 */
class DominioException extends RuntimeException {

    /**
     * Retorna as mensagens como um array, separando o texto pelo caractere "|".
     *
     * @return string[]
     */
    public function mensagens(): array {
        return explode( '|', $this->getMessage() );
    }

    /**
     * Método estático (chamado pela classe, sem objeto) que cria a exceção
     * juntando várias mensagens em uma só.
     */
    public static function criar( string ...$mensagens ): DominioException {
        return new DominioException( implode( '|', $mensagens ) );
    }
}
`,
                },
            ],
        },

        typescript: {
            arquivos: [
                {
                    caminho: 'backend/src/livro/livro.ts',
                    codigo: String.raw`
/**
 * Entidade do domínio: um livro do acervo da biblioteca.
 * Não tem regras próprias neste exemplo, apenas dados.
 */
export class Livro {

    /**
     * Construtor: cada parâmetro "public readonly" vira um atributo somente leitura.
     */
    constructor(
        public readonly id: number,
        public readonly titulo: string,
        public readonly autor: string,
        public readonly ano: number,
    ) {
    }
}
`,
                },
                {
                    caminho: 'backend/src/leitor/leitor.ts',
                    codigo: String.raw`
// Regra R3: quantidade máxima de empréstimos em aberto por leitor.
export const LEITOR_LIMITE_EMPRESTIMOS = 3;

/**
 * Entidade do domínio: uma pessoa cadastrada que pega livros emprestados.
 */
export class Leitor {

    /**
     * Construtor: recebe os dados do leitor e os guarda como atributos somente leitura.
     */
    constructor(
        public readonly id: number,
        public readonly nome: string,
        public readonly telefone: string,
    ) {
    }

    /**
     * Regra R3: diz se o leitor ainda pode pegar mais um livro,
     * a partir da quantidade de empréstimos que ele tem em aberto.
     */
    podePegarEmprestado( emprestimosEmAberto: number ): boolean {
        return emprestimosEmAberto < LEITOR_LIMITE_EMPRESTIMOS;
    }
}
`,
                },
                {
                    caminho: 'backend/src/infra/dominio-error.ts',
                    codigo: String.raw`
/**
 * Erro lançado quando uma regra de negócio é violada.
 * Herda de Error, a classe base de erros do JavaScript.
 */
export class DominioError extends Error {

    /**
     * Construtor: recebe uma ou mais mensagens ("..." junta os argumentos em um array)
     * e chama o construtor da classe pai com "super".
     */
    constructor( ...mensagens: string[] ) {
        super( mensagens.join( '|' ) );
        this.name = 'DominioError';
    }

    /**
     * Retorna as mensagens como um array, separando o texto pelo caractere "|".
     */
    mensagens(): string[] {
        return this.message.split( '|' );
    }
}
`,
                },
            ],
        },

        javascript: {
            arquivos: [
                {
                    caminho: 'backend/src/livro/livro.js',
                    codigo: String.raw`
/**
 * Entidade do domínio: um livro do acervo da biblioteca.
 * Não tem regras próprias neste exemplo, apenas dados.
 */
export class Livro {

    /**
     * Construtor: guarda cada valor recebido em um atributo de "this".
     */
    constructor( id, titulo, autor, ano ) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.ano = ano;
    }
}
`,
                },
                {
                    caminho: 'backend/src/leitor/leitor.js',
                    codigo: String.raw`
// Regra R3: quantidade máxima de empréstimos em aberto por leitor.
export const LEITOR_LIMITE_EMPRESTIMOS = 3;

/**
 * Entidade do domínio: uma pessoa cadastrada que pega livros emprestados.
 */
export class Leitor {

    /**
     * Construtor: guarda cada valor recebido em um atributo de "this".
     */
    constructor( id, nome, telefone ) {
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
    }

    /**
     * Regra R3: diz se o leitor ainda pode pegar mais um livro,
     * a partir da quantidade de empréstimos que ele tem em aberto.
     */
    podePegarEmprestado( emprestimosEmAberto ) {
        return emprestimosEmAberto < LEITOR_LIMITE_EMPRESTIMOS;
    }
}
`,
                },
                {
                    caminho: 'backend/src/infra/dominio-error.js',
                    codigo: String.raw`
/**
 * Erro lançado quando uma regra de negócio é violada.
 * Herda de Error, a classe base de erros do JavaScript.
 */
export class DominioError extends Error {

    /**
     * Construtor: recebe uma ou mais mensagens ("..." junta os argumentos em um array)
     * e chama o construtor da classe pai com "super".
     */
    constructor( ...mensagens ) {
        super( mensagens.join( '|' ) );
        this.name = 'DominioError';
    }

    /**
     * Retorna as mensagens como um array, separando o texto pelo caractere "|".
     */
    mensagens() {
        return this.message.split( '|' );
    }
}
`,
                },
            ],
        },

        java: {
            arquivos: [
                {
                    caminho: 'backend/src/main/java/biblioteca/livro/Livro.java',
                    codigo: String.raw`
package biblioteca.livro;

/**
 * Entidade do domínio: um livro do acervo da biblioteca.
 * Um "record" cria automaticamente o construtor, os atributos imutáveis
 * e os métodos de acesso: livro.titulo(), livro.autor() etc.
 */
public record Livro( long id, String titulo, String autor, int ano ) {
}
`,
                },
                {
                    caminho: 'backend/src/main/java/biblioteca/leitor/Leitor.java',
                    codigo: String.raw`
package biblioteca.leitor;

/**
 * Entidade do domínio: uma pessoa cadastrada que pega livros emprestados.
 * Como record, já tem construtor e métodos de acesso gerados automaticamente.
 */
public record Leitor( long id, String nome, String telefone ) {

    // Regra R3: quantidade máxima de empréstimos em aberto por leitor.
    public static final int LIMITE_EMPRESTIMOS = 3;

    /**
     * Regra R3: diz se o leitor ainda pode pegar mais um livro,
     * a partir da quantidade de empréstimos que ele tem em aberto.
     */
    public boolean podePegarEmprestado( int emprestimosEmAberto ) {
        return emprestimosEmAberto < LIMITE_EMPRESTIMOS;
    }
}
`,
                },
                {
                    caminho: 'backend/src/main/java/biblioteca/infra/DominioException.java',
                    codigo: String.raw`
package biblioteca.infra;

import java.util.List;

/**
 * Exceção lançada quando uma regra de negócio é violada.
 * Herda de RuntimeException, então não precisa ser declarada com "throws".
 */
public class DominioException extends RuntimeException {

    /**
     * Construtor: recebe uma ou mais mensagens ("String..." aceita vários argumentos)
     * e chama o construtor da classe pai com "super".
     */
    public DominioException( String... mensagens ) {
        super( String.join( "|", mensagens ) );
    }

    /**
     * Retorna as mensagens como uma lista, separando o texto pelo caractere "|".
     */
    public List< String > mensagens() {
        return List.of( getMessage().split( "\\|" ) );
    }
}
`,
                },
            ],
        },
    };

})( window.Guia );
