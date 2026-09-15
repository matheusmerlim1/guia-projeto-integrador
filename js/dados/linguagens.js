(function ( Guia ) {
    'use strict';

    Guia.dados.linguagens.backend = [
        { id: 'php', rotulo: 'PHP', realce: 'php', testes: 'Kahlan' },
        { id: 'typescript', rotulo: 'TypeScript', realce: 'typescript', testes: 'Vitest' },
        { id: 'javascript', rotulo: 'JavaScript', realce: 'javascript', testes: 'Vitest' },
        { id: 'java', rotulo: 'Java', realce: 'java', testes: 'JUnit 5' },
    ];

    Guia.dados.linguagens.frontend = [
        { id: 'typescript', rotulo: 'TypeScript', realce: 'typescript', testes: 'Vitest' },
        { id: 'javascript', rotulo: 'JavaScript', realce: 'javascript', testes: 'Vitest' },
    ];

    Guia.dados.linguagens.banco = [
        { id: 'mariadb', rotulo: 'MariaDB' },
        { id: 'mysql', rotulo: 'MySQL' },
    ];

    Guia.dados.realcePorExtensao = {
        php: 'php',
        ts: 'typescript',
        js: 'javascript',
        java: 'java',
        sql: 'sql',
    };

})( window.Guia );
