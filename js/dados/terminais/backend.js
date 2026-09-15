// Arquivo gerado a partir das saídas reais dos comandos. Não edite à mão.
(function ( Guia ) {
    'use strict';

    Guia.dados.terminais[ "backend.instalar" ] = {
     "camada": "backend",
     "variantes": {
      "php": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Entre na pasta do back-end",
         "explicacao": "Os comandos do back-end são executados dentro da pasta <code>backend</code>, onde está o arquivo de configuração do projeto.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria",
         "comando": "cd backend"
        },
        {
         "titulo": "Instale as dependências",
         "explicacao": "<code>composer install</code> lê o <code>composer.json</code>, baixa as bibliotecas para a pasta <code>vendor</code> e gera o <code>vendor/autoload.php</code>, que carrega as classes automaticamente. Na primeira vez, cria o <code>composer.lock</code> com as versões exatas instaladas: envie esse arquivo para o repositório.",
         "observe": "<code>Writing lock file</code>: o <code>composer.lock</code> foi criado. <code>Generating autoload files</code>: o carregamento automático das classes está pronto. Sempre que criar uma pasta nova em <code>src</code>, inclua-a no <code>autoload</code> do <code>composer.json</code> e rode <code>composer dump-autoload</code>.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "composer install",
         "saida": "No composer.lock file present. Updating dependencies to latest instead of installing from lock file. See https://getcomposer.org/install for more information.\nLoading composer repositories with package information\nUpdating dependencies\nLock file operations: 4 installs, 0 updates, 0 removals\n  - Locking kahlan/kahlan (6.1.1)\n  - Locking phpstan/phpstan (2.2.14)\n  - Locking phputil/cors (v0.5.3)\n  - Locking phputil/router (v0.4.0)\nWriting lock file\nInstalling dependencies from lock file (including require-dev)\nPackage operations: 4 installs, 0 updates, 0 removals\n  - Installing kahlan/kahlan (6.1.1): Extracting archive\n  - Installing phpstan/phpstan (2.2.14): Extracting archive\n  - Installing phputil/cors (v0.5.3): Extracting archive\n  - Installing phputil/router (v0.4.0): Extracting archive\nGenerating autoload files\n1 package you are using is looking for funding.\nUse the `composer fund` command to find out more!"
        }
       ]
      },
      "typescript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Entre na pasta do back-end",
         "explicacao": "Os comandos do back-end são executados dentro da pasta <code>backend</code>, onde está o arquivo de configuração do projeto.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria",
         "comando": "cd backend"
        },
        {
         "titulo": "Instale as dependências",
         "explicacao": "<code>pnpm install</code> lê o <code>package.json</code>, baixa os pacotes para <code>node_modules</code> e cria o <code>pnpm-lock.yaml</code> com as versões exatas: envie esse arquivo para o repositório. O <code>pnpm-workspace.yaml</code> autoriza o script de instalação do esbuild, usado pelo <code>tsx</code>.",
         "observe": "<code>dependencies</code> são usadas pela aplicação; <code>devDependencies</code>, só durante o desenvolvimento, como o TypeScript e o Vitest.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "pnpm install",
         "saida": "Packages: +137\n++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\nPackages are hard linked from the content-addressable store to the virtual store.\n  Content-addressable store is at: C:\\Users\\ana\\AppData\\Local\\pnpm\\store\\v11\n  Virtual store is at:             node_modules/.pnpm\nProgress: resolved 206, reused 137, downloaded 0, added 137, done\n\ndependencies:\n+ cors 2.8.6\n+ express 5.2.1\n+ mysql2 3.24.4\n\ndevDependencies:\n+ @types/cors 2.8.19\n+ @types/express 5.0.6\n+ @types/node 26.5.1\n+ tsx 4.23.13\n+ typescript 7.0.2\n+ vitest 4.1.11 (5.0.0 is available)\n\nDone in 3.3s using pnpm v11.24.0"
        }
       ]
      },
      "javascript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Entre na pasta do back-end",
         "explicacao": "Os comandos do back-end são executados dentro da pasta <code>backend</code>, onde está o arquivo de configuração do projeto.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria",
         "comando": "cd backend"
        },
        {
         "titulo": "Instale as dependências",
         "explicacao": "<code>pnpm install</code> lê o <code>package.json</code>, baixa os pacotes para <code>node_modules</code> e cria o <code>pnpm-lock.yaml</code> com as versões exatas: envie esse arquivo para o repositório.",
         "observe": "<code>dependencies</code> são usadas pela aplicação; <code>devDependencies</code>, só durante o desenvolvimento, como o Vitest.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "pnpm install",
         "saida": "Packages: +122\n++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\nPackages are hard linked from the content-addressable store to the virtual store.\n  Content-addressable store is at: C:\\Users\\ana\\AppData\\Local\\pnpm\\store\\v11\n  Virtual store is at:             node_modules/.pnpm\nProgress: resolved 147, reused 122, downloaded 0, added 122, done\n\ndependencies:\n+ cors 2.8.6\n+ express 5.2.1\n+ mysql2 3.24.4\n\ndevDependencies:\n+ vitest 4.1.11 (5.0.0 is available)\n\nDone in 1.6s using pnpm v11.24.0"
        }
       ]
      },
      "java": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Entre na pasta do back-end",
         "explicacao": "Os comandos do back-end são executados dentro da pasta <code>backend</code>, onde está o arquivo de configuração do projeto.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria",
         "comando": "cd backend"
        },
        {
         "titulo": "Baixe as dependências e compile",
         "explicacao": "<code>mvn compile</code> lê o <code>pom.xml</code>, baixa as bibliotecas para a pasta <code>.m2</code> do seu usuário (só na primeira vez) e compila o código para <code>target</code>. A opção <code>-q</code> (<em>quiet</em>) esconde as mensagens de andamento.",
         "observe": "Não aparece nada: com <code>-q</code>, o Maven só escreve quando há erro. Sem o <code>-q</code>, termina com <code>BUILD SUCCESS</code>.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "mvn -q compile"
        }
       ]
      }
     }
    };

    Guia.dados.terminais[ "backend.testes" ] = {
     "camada": "backend",
     "variantes": {
      "php": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Rode os testes do gestor",
         "explicacao": "<code>composer test</code> executa o Kahlan, que roda todos os arquivos da pasta <code>spec</code>. Os testes de integração precisam do banco, criado na Etapa 5; por enquanto, rode só os do gestor: o que vem depois de <code>--</code> é repassado ao Kahlan, e <code>--spec</code> escolhe o arquivo.",
         "observe": "Cada ponto é um teste que passou. <code>Passed 6 of 6 PASS</code>: todos passaram. <code>Expectations: 9 Executed</code>: foram conferidos 9 <code>expect</code>.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "composer test -- --spec=spec/GestorEmprestimos.spec.php",
         "saida": "            _     _\n  /\\ /\\__ _| |__ | | __ _ _ __\n / //_/ _` | '_ \\| |/ _` | '_ \\\n/ __ \\ (_| | | | | | (_| | | | |\n\\/  \\/\\__,_|_| |_|_|\\__,_|_| |_|\n\nThe PHP Test Framework for Freedom, Truth and Justice.\n\nsrc directory  : C:\\projetos\\biblioteca-comunitaria\\backend\\src\nspec directory : C:\\projetos\\biblioteca-comunitaria\\backend\\spec\\GestorEmprestimos.spec.php\n\n......                                                              6 / 6 (100%)\n\n\n\nExpectations   : 9 Executed\nSpecifications : 0 Pending, 0 Excluded, 0 Skipped\n\nPassed 6 of 6 PASS in 0.015 seconds (using 2MB)"
        },
        {
         "titulo": "Veja como aparece um teste que falha",
         "explicacao": "Para conhecer a mensagem de falha, quebre a regra de propósito: em <code>src/leitor/Leitor.php</code>, troque <code>LEITOR_LIMITE_EMPRESTIMOS = 3</code> por <code>4</code> e rode de novo.",
         "observe": "O <code>F</code> marca o teste que falhou. Abaixo, o Kahlan mostra o nome do teste, a linha do <code>expect</code> e a diferença: esperava a exceção <code>DominioException</code>, mas nada foi lançado (<code>null</code>). Volte o valor para <code>3</code> e rode de novo: todos passam.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "composer test -- --spec=spec/GestorEmprestimos.spec.php",
         "saida": "            _     _\n  /\\ /\\__ _| |__ | | __ _ _ __\n / //_/ _` | '_ \\| |/ _` | '_ \\\n/ __ \\ (_| | | | | | (_| | | | |\n\\/  \\/\\__,_|_| |_|_|\\__,_|_| |_|\n\nThe PHP Test Framework for Freedom, Truth and Justice.\n\nsrc directory  : C:\\projetos\\biblioteca-comunitaria\\backend\\src\nspec directory : C:\\projetos\\biblioteca-comunitaria\\backend\\spec\\GestorEmprestimos.spec.php\n\n...F..                                                              6 / 6 (100%)\n\n\nGestorEmprestimos\n  registrar\n    ✖ it não permite o quarto empréstimo\n      expect->toThrow() failed in `.spec\\GestorEmprestimos.spec.php` line 70\n\n      It expect actual to throw a compatible exception.\n\n      actual:\n        (NULL) null\n      expected:\n        (object) `DominioException` Code(0) with message \"O leitor já tem 3 empréstimos em aberto.\" in C:\\projetos\\biblioteca-comunitaria\\backend\\spec\\GestorEmprestimos.spec.php:70\n\n\nExpectations   : 9 Executed\nSpecifications : 0 Pending, 0 Excluded, 0 Skipped\n\nPassed 5 of 6 FAIL (FAILURE: 1) in 0.015 seconds (using 2MB)\n\nScript kahlan handling the test event returned with error code 1"
        }
       ]
      },
      "typescript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Rode os testes do gestor",
         "explicacao": "<code>pnpm test</code> executa o Vitest. Os testes de integração precisam do banco, criado na Etapa 5; por enquanto, rode só os do gestor: <code>gestor</code> filtra os arquivos pelo nome, e <code>--reporter=verbose</code> lista cada teste.",
         "observe": "<code>✓</code> marca cada teste que passou, com o caminho <code>arquivo &gt; describe &gt; it</code>. <code>Tests 6 passed (6)</code>: todos passaram.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "pnpm test gestor --reporter=verbose",
         "saida": "$ vitest run \"gestor\" \"--reporter=verbose\"\n\n RUN  v4.1.11 C:/projetos/biblioteca-comunitaria/backend\n\n ✓ test/gestor-emprestimos.spec.ts > GestorEmprestimos > registrar > registra o empréstimo e informa a data limite 2ms\n ✓ test/gestor-emprestimos.spec.ts > GestorEmprestimos > registrar > lança exceção quando o livro não é informado 1ms\n ✓ test/gestor-emprestimos.spec.ts > GestorEmprestimos > registrar > lança exceção quando o livro já está emprestado 1ms\n ✓ test/gestor-emprestimos.spec.ts > GestorEmprestimos > registrar > não permite o quarto empréstimo 0ms\n ✓ test/gestor-emprestimos.spec.ts > GestorEmprestimos > devolver > registra a devolução e informa a multa 1ms\n ✓ test/gestor-emprestimos.spec.ts > GestorEmprestimos > devolver > lança exceção quando o empréstimo não está em aberto 0ms\n\n Test Files  1 passed (1)\n      Tests  6 passed (6)\n   Start at  20:34:20\n   Duration  323ms (transform 64ms, setup 0ms, import 92ms, tests 7ms, environment 0ms)"
        },
        {
         "titulo": "Veja como aparece um teste que falha",
         "explicacao": "Para conhecer a mensagem de falha, quebre a regra de propósito: em <code>src/leitor/leitor.ts</code>, troque <code>LEITOR_LIMITE_EMPRESTIMOS = 3</code> por <code>4</code> e rode de novo.",
         "observe": "<code>×</code> marca o teste que falhou. O Vitest explica que a promessa foi resolvida em vez de rejeitada, mostra o valor recebido e aponta a linha do teste com <code>^</code>. Volte o valor para <code>3</code> e rode de novo: todos passam.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "pnpm test gestor --reporter=verbose",
         "saida": "$ vitest run \"gestor\" \"--reporter=verbose\"\n\n RUN  v4.1.11 C:/projetos/biblioteca-comunitaria/backend\n\n ✓ test/gestor-emprestimos.spec.ts > GestorEmprestimos > registrar > registra o empréstimo e informa a data limite 2ms\n ✓ test/gestor-emprestimos.spec.ts > GestorEmprestimos > registrar > lança exceção quando o livro não é informado 2ms\n ✓ test/gestor-emprestimos.spec.ts > GestorEmprestimos > registrar > lança exceção quando o livro já está emprestado 1ms\n × test/gestor-emprestimos.spec.ts > GestorEmprestimos > registrar > não permite o quarto empréstimo 8ms\n   → promise resolved \"{ id: 10, livro: { id: 1, …(2) }, …(5) }\" instead of rejecting\n ✓ test/gestor-emprestimos.spec.ts > GestorEmprestimos > devolver > registra a devolução e informa a multa 1ms\n ✓ test/gestor-emprestimos.spec.ts > GestorEmprestimos > devolver > lança exceção quando o empréstimo não está em aberto 0ms\n\n⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯\n\n FAIL  test/gestor-emprestimos.spec.ts > GestorEmprestimos > registrar > não permite o quarto empréstimo\nAssertionError: promise resolved \"{ id: 10, livro: { id: 1, …(2) }, …(5) }\" instead of rejecting\n\n- Expected\n+ Received\n\n- Error {\n-   \"message\": \"rejected promise\",\n+ {\n+   \"dataEmprestimo\": \"2026-09-10\",\n+   \"dataLimite\": \"2026-09-17\",\n+   \"diasDeAtraso\": 0,\n+   \"id\": 10,\n+   \"leitor\": {\n+     \"id\": 1,\n+     \"nome\": \"Ana Souza\",\n+   },\n+   \"livro\": {\n+     \"autor\": \"Machado de Assis\",\n+     \"id\": 1,\n+     \"titulo\": \"Dom Casmurro\",\n+   },\n+   \"multa\": 0,\n  }\n\n ❯ test/gestor-emprestimos.spec.ts:65:82\n     63|         it( 'não permite o quarto empréstimo', async () => {\n     64|             emprestimos.emAbertoDoLeitor = 3;\n     65|             await expect( gestor.registrar( { livroId: 1, leitorId: 1 …\n       |                                                                                  ^\n     66|                 .rejects.toThrow( 'O leitor já tem 3 empréstimos em ab…\n     67|         } );\n\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯\n\n\n Test Files  1 failed (1)\n      Tests  1 failed | 5 passed (6)\n   Start at  20:34:21\n   Duration  347ms (transform 62ms, setup 0ms, import 91ms, tests 17ms, environment 0ms)\n\n[ELIFECYCLE] Test failed. See above for more details."
        }
       ]
      },
      "javascript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Rode os testes do gestor",
         "explicacao": "<code>pnpm test</code> executa o Vitest. Os testes de integração precisam do banco, criado na Etapa 5; por enquanto, rode só os do gestor: <code>gestor</code> filtra os arquivos pelo nome, e <code>--reporter=verbose</code> lista cada teste.",
         "observe": "<code>✓</code> marca cada teste que passou, com o caminho <code>arquivo &gt; describe &gt; it</code>. <code>Tests 6 passed (6)</code>: todos passaram.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "pnpm test gestor --reporter=verbose",
         "saida": "$ vitest run \"gestor\" \"--reporter=verbose\"\n\n RUN  v4.1.11 C:/projetos/biblioteca-comunitaria/backend\n\n ✓ test/gestor-emprestimos.spec.js > GestorEmprestimos > registrar > registra o empréstimo e informa a data limite 2ms\n ✓ test/gestor-emprestimos.spec.js > GestorEmprestimos > registrar > lança exceção quando o livro não é informado 1ms\n ✓ test/gestor-emprestimos.spec.js > GestorEmprestimos > registrar > lança exceção quando o livro já está emprestado 1ms\n ✓ test/gestor-emprestimos.spec.js > GestorEmprestimos > registrar > não permite o quarto empréstimo 0ms\n ✓ test/gestor-emprestimos.spec.js > GestorEmprestimos > devolver > registra a devolução e informa a multa 1ms\n ✓ test/gestor-emprestimos.spec.js > GestorEmprestimos > devolver > lança exceção quando o empréstimo não está em aberto 0ms\n\n Test Files  1 passed (1)\n      Tests  6 passed (6)\n   Start at  20:34:23\n   Duration  322ms (transform 50ms, setup 0ms, import 79ms, tests 8ms, environment 0ms)"
        },
        {
         "titulo": "Veja como aparece um teste que falha",
         "explicacao": "Para conhecer a mensagem de falha, quebre a regra de propósito: em <code>src/leitor/leitor.js</code>, troque <code>LEITOR_LIMITE_EMPRESTIMOS = 3</code> por <code>4</code> e rode de novo.",
         "observe": "<code>×</code> marca o teste que falhou. O Vitest explica que a promessa foi resolvida em vez de rejeitada, mostra o valor recebido e aponta a linha do teste com <code>^</code>. Volte o valor para <code>3</code> e rode de novo: todos passam.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "pnpm test gestor --reporter=verbose",
         "saida": "$ vitest run \"gestor\" \"--reporter=verbose\"\n\n RUN  v4.1.11 C:/projetos/biblioteca-comunitaria/backend\n\n ✓ test/gestor-emprestimos.spec.js > GestorEmprestimos > registrar > registra o empréstimo e informa a data limite 2ms\n ✓ test/gestor-emprestimos.spec.js > GestorEmprestimos > registrar > lança exceção quando o livro não é informado 2ms\n ✓ test/gestor-emprestimos.spec.js > GestorEmprestimos > registrar > lança exceção quando o livro já está emprestado 2ms\n × test/gestor-emprestimos.spec.js > GestorEmprestimos > registrar > não permite o quarto empréstimo 9ms\n   → promise resolved \"{ id: 10, livro: { id: 1, …(2) }, …(5) }\" instead of rejecting\n ✓ test/gestor-emprestimos.spec.js > GestorEmprestimos > devolver > registra a devolução e informa a multa 1ms\n ✓ test/gestor-emprestimos.spec.js > GestorEmprestimos > devolver > lança exceção quando o empréstimo não está em aberto 1ms\n\n⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯\n\n FAIL  test/gestor-emprestimos.spec.js > GestorEmprestimos > registrar > não permite o quarto empréstimo\nAssertionError: promise resolved \"{ id: 10, livro: { id: 1, …(2) }, …(5) }\" instead of rejecting\n\n- Expected\n+ Received\n\n- Error {\n-   \"message\": \"rejected promise\",\n+ {\n+   \"dataEmprestimo\": \"2026-09-10\",\n+   \"dataLimite\": \"2026-09-17\",\n+   \"diasDeAtraso\": 0,\n+   \"id\": 10,\n+   \"leitor\": {\n+     \"id\": 1,\n+     \"nome\": \"Ana Souza\",\n+   },\n+   \"livro\": {\n+     \"autor\": \"Machado de Assis\",\n+     \"id\": 1,\n+     \"titulo\": \"Dom Casmurro\",\n+   },\n+   \"multa\": 0,\n  }\n\n ❯ test/gestor-emprestimos.spec.js:65:17\n     63|             emprestimos.emAbertoDoLeitor = 3;\n     64|             await expect( gestor.registrar( { livroId: 1, leitorId: 1 …\n     65|                 .rejects.toThrow( 'O leitor já tem 3 empréstimos em ab…\n       |                 ^\n     66|         } );\n     67|     } );\n\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯\n\n\n Test Files  1 failed (1)\n      Tests  1 failed | 5 passed (6)\n   Start at  20:34:25\n   Duration  332ms (transform 51ms, setup 0ms, import 78ms, tests 18ms, environment 0ms)\n\n[ELIFECYCLE] Test failed. See above for more details."
        }
       ]
      },
      "java": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Rode os testes do gestor",
         "explicacao": "<code>mvn test</code> compila o código e os testes e executa o JUnit. Os testes de integração precisam do banco, criado na Etapa 5; por enquanto, rode só os do gestor: <code>-Dtest=GestorEmprestimosTest*</code> escolhe a classe, e o <code>*</code> inclui os grupos <code>@Nested</code>.",
         "observe": "Cada grupo aparece em uma linha <code>Tests run</code>. No resumo, <code>Tests run: 6, Failures: 0</code> e <code>BUILD SUCCESS</code>: todos passaram.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "mvn test -Dtest=GestorEmprestimosTest*",
         "saida": "[INFO] Scanning for projects...\n[INFO]\n[INFO] -------------------< biblioteca:biblioteca-backend >--------------------\n[INFO] Building biblioteca-backend 1.0.0\n[INFO]   from pom.xml\n[INFO] --------------------------------[ jar ]---------------------------------\n[INFO]\n[INFO] --- resources:3.3.1:resources (default-resources) @ biblioteca-backend ---\n[INFO] Copying 3 resources from src\\main\\resources to target\\classes\n[INFO]\n[INFO] --- compiler:3.14.1:compile (default-compile) @ biblioteca-backend ---\n[INFO] Nothing to compile - all classes are up to date.\n[INFO]\n[INFO] --- resources:3.3.1:testResources (default-testResources) @ biblioteca-backend ---\n[INFO] skip non existing resourceDirectory C:\\projetos\\biblioteca-comunitaria\\backend\\src\\test\\resources\n[INFO]\n[INFO] --- compiler:3.14.1:testCompile (default-testCompile) @ biblioteca-backend ---\n[INFO] Recompiling the module because of changed source code.\n[INFO] Compiling 3 source files with javac [debug release 17] to target\\test-classes\n[INFO]\n[INFO] --- surefire:3.5.4:test (default-test) @ biblioteca-backend ---\n[INFO] Using auto detected provider org.apache.maven.surefire.junitplatform.JUnitPlatformProvider\n[INFO]\n[INFO] -------------------------------------------------------\n[INFO]  T E S T S\n[INFO] -------------------------------------------------------\n[INFO] Running biblioteca.emprestimo.GestorEmprestimosTest\n[INFO] Running biblioteca.emprestimo.GestorEmprestimosTest$Devolver\n[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.028 s -- in biblioteca.emprestimo.GestorEmprestimosTest$Devolver\n[INFO] Running biblioteca.emprestimo.GestorEmprestimosTest$Registrar\n[INFO] Tests run: 4, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.018 s -- in biblioteca.emprestimo.GestorEmprestimosTest$Registrar\n[INFO] Tests run: 0, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.081 s -- in biblioteca.emprestimo.GestorEmprestimosTest\n[INFO]\n[INFO] Results:\n[INFO]\n[INFO] Tests run: 6, Failures: 0, Errors: 0, Skipped: 0\n[INFO]\n[INFO] ------------------------------------------------------------------------\n[INFO] BUILD SUCCESS\n[INFO] ------------------------------------------------------------------------\n[INFO] Total time:  2.878 s\n[INFO] Finished at: 2026-09-14T20:34:53-03:00\n[INFO] ------------------------------------------------------------------------"
        },
        {
         "titulo": "Veja como aparece um teste que falha",
         "explicacao": "Para conhecer a mensagem de falha, quebre a regra de propósito: em <code>Leitor.java</code>, troque <code>LIMITE_EMPRESTIMOS = 3</code> por <code>4</code> e rode de novo.",
         "observe": "<code>FAILURE!</code> aponta o grupo e o teste que falharam, com a mensagem <code>Expected ... DominioException to be thrown, but nothing was thrown</code> e a linha do teste. O resumo termina com <code>BUILD FAILURE</code>. Volte o valor para <code>3</code> e rode de novo: todos passam.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "mvn test -Dtest=GestorEmprestimosTest*",
         "saida": "[INFO] Scanning for projects...\n[INFO]\n[INFO] -------------------< biblioteca:biblioteca-backend >--------------------\n[INFO] Building biblioteca-backend 1.0.0\n[INFO]   from pom.xml\n[INFO] --------------------------------[ jar ]---------------------------------\n[INFO]\n[INFO] --- resources:3.3.1:resources (default-resources) @ biblioteca-backend ---\n[INFO] Copying 3 resources from src\\main\\resources to target\\classes\n[INFO]\n[INFO] --- compiler:3.14.1:compile (default-compile) @ biblioteca-backend ---\n[INFO] Recompiling the module because of changed source code.\n[INFO] Compiling 19 source files with javac [debug release 17] to target\\classes\n[INFO]\n[INFO] --- resources:3.3.1:testResources (default-testResources) @ biblioteca-backend ---\n[INFO] skip non existing resourceDirectory C:\\projetos\\biblioteca-comunitaria\\backend\\src\\test\\resources\n[INFO]\n[INFO] --- compiler:3.14.1:testCompile (default-testCompile) @ biblioteca-backend ---\n[INFO] Recompiling the module because of changed dependency.\n[INFO] Compiling 3 source files with javac [debug release 17] to target\\test-classes\n[INFO]\n[INFO] --- surefire:3.5.4:test (default-test) @ biblioteca-backend ---\n[INFO] Using auto detected provider org.apache.maven.surefire.junitplatform.JUnitPlatformProvider\n[INFO]\n[INFO] -------------------------------------------------------\n[INFO]  T E S T S\n[INFO] -------------------------------------------------------\n[INFO] Running biblioteca.emprestimo.GestorEmprestimosTest\n[INFO] Running biblioteca.emprestimo.GestorEmprestimosTest$Devolver\n[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.039 s -- in biblioteca.emprestimo.GestorEmprestimosTest$Devolver\n[INFO] Running biblioteca.emprestimo.GestorEmprestimosTest$Registrar\n[ERROR] Tests run: 4, Failures: 1, Errors: 0, Skipped: 0, Time elapsed: 0.039 s <<< FAILURE! -- in biblioteca.emprestimo.GestorEmprestimosTest$Registrar\n[ERROR] biblioteca.emprestimo.GestorEmprestimosTest.naoPermiteOQuartoEmprestimo -- Time elapsed: 0.015 s <<< FAILURE!\norg.opentest4j.AssertionFailedError: Expected biblioteca.infra.DominioException to be thrown, but nothing was thrown.\n\tat org.junit.jupiter.api.AssertionFailureBuilder.build(AssertionFailureBuilder.java:152)\n\tat org.junit.jupiter.api.AssertThrows.assertThrows(AssertThrows.java:73)\n\tat org.junit.jupiter.api.AssertThrows.assertThrows(AssertThrows.java:35)\n\tat org.junit.jupiter.api.Assertions.assertThrows(Assertions.java:3128)\n\tat biblioteca.emprestimo.GestorEmprestimosTest$Registrar.naoPermiteOQuartoEmprestimo(GestorEmprestimosTest.java:93)\n\tat java.base/java.lang.reflect.Method.invoke(Method.java:578)\n\tat java.base/java.util.ArrayList.forEach(ArrayList.java:1511)\n\tat java.base/java.util.ArrayList.forEach(ArrayList.java:1511)\n\tat java.base/java.util.ArrayList.forEach(ArrayList.java:1511)\n\n[INFO] Tests run: 0, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.101 s -- in biblioteca.emprestimo.GestorEmprestimosTest\n[INFO]\n[INFO] Results:\n[INFO]\n[ERROR] Failures:\n[ERROR]   GestorEmprestimosTest.naoPermiteOQuartoEmprestimo Expected biblioteca.infra.DominioException to be thrown, but nothing was thrown.\n[INFO]\n[ERROR] Tests run: 6, Failures: 1, Errors: 0, Skipped: 0\n[INFO]\n[INFO] ------------------------------------------------------------------------\n[INFO] BUILD FAILURE\n[INFO] ------------------------------------------------------------------------\n[INFO] Total time:  2.999 s\n[INFO] Finished at: 2026-09-14T20:34:57-03:00\n[INFO] ------------------------------------------------------------------------\n[ERROR] Failed to execute goal org.apache.maven.plugins:maven-surefire-plugin:3.5.4:test (default-test) on project biblioteca-backend: There are test failures.\n[ERROR]\n[ERROR] See C:\\projetos\\biblioteca-comunitaria\\backend\\target\\surefire-reports for the individual test results.\n[ERROR] See dump files (if any exist) [date].dump, [date]-jvmRun[N].dump and [date].dumpstream.\n[ERROR] -> [Help 1]\n[ERROR]\n[ERROR] To see the full stack trace of the errors, re-run Maven with the -e switch.\n[ERROR] Re-run Maven using the -X switch to enable full debug logging.\n[ERROR]\n[ERROR] For more information about the errors and possible solutions, please read the following articles:\n[ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/MojoFailureException"
        }
       ]
      }
     }
    };

    Guia.dados.terminais[ "backend.analise" ] = {
     "camada": "backend",
     "variantes": {
      "php": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Rode o PHPStan",
         "explicacao": "<code>composer check</code> executa o PHPStan com as regras do <code>phpstan.neon</code>. Ele lê o código sem executá-lo e aponta erros como método inexistente, tipo errado ou retorno esquecido. O nível 6 exige tipos em parâmetros e retornos, inclusive o conteúdo dos arrays, descrito em comentários como <code>@return Livro[]</code>.",
         "observe": "<code>[OK] No errors</code>: nenhum problema encontrado. Quando há erros, cada um aparece com o arquivo, a linha e a explicação.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "composer check",
         "saida": "Note: Using configuration file C:\\projetos\\biblioteca-comunitaria\\backend\\phpstan.neon.\n\n [OK] No errors"
        }
       ]
      },
      "typescript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Verifique os tipos",
         "explicacao": "<code>pnpm check</code> executa <code>tsc --noEmit</code>: o compilador do TypeScript confere todos os tipos do projeto sem gerar arquivos. O Vitest e o <code>tsx</code> executam o código sem conferir os tipos, por isso este passo é separado.",
         "observe": "Só aparece o comando executado: nenhum erro de tipo. Quando há erros, cada um aparece com o arquivo, a linha e a explicação.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "pnpm check",
         "saida": "$ tsc --noEmit"
        }
       ]
      },
      "javascript": {
       "aviso": "JavaScript não tem verificação de tipos: erros como chamar um método inexistente só aparecem ao executar o código. Por isso os testes são ainda mais importantes. Se quiser uma análise estática, adicione o ESLint ao projeto.",
       "titulo": "Prompt de Comando",
       "entradas": []
      },
      "java": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Compile para conferir os tipos",
         "explicacao": "Em Java, o próprio compilador confere os tipos: se o código compila, não há erro de tipo. O <code>mvn test</code> já compila antes de testar.",
         "observe": "Não aparece nada: compilou sem erros.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "mvn -q compile"
        }
       ]
      }
     }
    };

    Guia.dados.terminais[ "backend.iniciar" ] = {
     "camada": "backend",
     "variantes": {
      "php": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Inicie a API",
         "explicacao": "<code>composer start</code> executa <code>php -S localhost:8080</code>, o servidor embutido do PHP. Toda requisição para um endereço que não é arquivo vai para o <code>index.php</code>, que entrega ao roteador. O terminal fica ocupado enquanto a API roda; para parar, aperte <kbd>Ctrl</kbd>+<kbd>C</kbd>.",
         "observe": "A API está no ar em <code>http://localhost:8080</code>. Cada requisição recebida aparece neste terminal.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "composer start",
         "saida": "[Mon Sep 14 20:36:43 2026] PHP 8.5.10 Development Server (http://localhost:8080) started"
        },
        {
         "titulo": "Em outro terminal, faça uma requisição",
         "explicacao": "Deixe a API rodando e abra outro Prompt de Comando. <code>curl</code> faz requisições HTTP pelo terminal e já vem no Windows; <code>-i</code> mostra também o código de status e os cabeçalhos da resposta.",
         "observe": "<code>500</code> é esperado neste momento: o banco de dados ainda não foi criado, e a API responde com a mensagem de erro em JSON. Na Etapa 5, com o banco pronto, a mesma requisição devolve a lista de livros. O PHP escreve os acentos como <code>\\u00e3</code>; o navegador e o <code>fetch</code> convertem de volta para “ã”.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "curl -i http://localhost:8080/livros",
         "saida": "HTTP/1.1 500 Internal Server Error\nHost: localhost:8080\nDate: Mon, 14 Sep 2026 23:36:45 GMT\nConnection: close\nX-Powered-By: PHP/8.5.10\nContent-Type: application/json\n\n{\"mensagens\":[\"N\\u00e3o foi poss\\u00edvel conectar ao banco de dados.\"]}"
        }
       ]
      },
      "typescript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Inicie a API",
         "explicacao": "<code>pnpm dev</code> executa <code>tsx watch src/index.ts</code>: roda o TypeScript direto e reinicia a API a cada arquivo salvo. O terminal fica ocupado enquanto a API roda; para parar, aperte <kbd>Ctrl</kbd>+<kbd>C</kbd>.",
         "observe": "A mensagem do <code>console.log</code> do <code>index.ts</code> confirma que a API está no ar.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "pnpm dev",
         "saida": "$ tsx watch src/index.ts\nAPI rodando em http://localhost:8080\n20:34:20 [tsx] change in ./src\\leitor\\leitor.ts Rerunning...\nAPI rodando em http://localhost:8080\n20:34:22 [tsx] change in ./src\\leitor\\leitor.ts Restarting...\nAPI rodando em http://localhost:8080\n[ELIFECYCLE] Command failed with exit code 4294967295."
        },
        {
         "titulo": "Em outro terminal, faça uma requisição",
         "explicacao": "Deixe a API rodando e abra outro Prompt de Comando. <code>curl</code> faz requisições HTTP pelo terminal e já vem no Windows; <code>-i</code> mostra também o código de status e os cabeçalhos da resposta.",
         "observe": "<code>500</code> é esperado neste momento: o banco de dados ainda não foi criado, e a API responde com a mensagem de erro em JSON. Na Etapa 5, com o banco pronto, a mesma requisição devolve a lista de livros.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "curl -i http://localhost:8080/livros",
         "saida": "HTTP/1.1 500 Internal Server Error\nX-Powered-By: Express\nAccess-Control-Allow-Origin: *\nContent-Type: application/json; charset=utf-8\nContent-Length: 46\nETag: W/\"2e-7QQOBVCsT+bI3CppWJ2wDvfxh90\"\nDate: Mon, 14 Sep 2026 23:33:50 GMT\nConnection: keep-alive\nKeep-Alive: timeout=5\n\n{\"mensagens\":[\"Erro ao consultar os livros.\"]}"
        }
       ]
      },
      "javascript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Inicie a API",
         "explicacao": "<code>pnpm dev</code> executa <code>node --watch src/index.js</code>: roda a API e a reinicia a cada arquivo salvo. O terminal fica ocupado enquanto a API roda; para parar, aperte <kbd>Ctrl</kbd>+<kbd>C</kbd>.",
         "observe": "A mensagem do <code>console.log</code> do <code>index.js</code> confirma que a API está no ar.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "pnpm dev",
         "saida": "$ node --watch src/index.js\nAPI rodando em http://localhost:8080\nRestarting 'src/index.js'\nAPI rodando em http://localhost:8080\nCompleted running 'src/index.js'\nRestarting 'src/index.js'\nAPI rodando em http://localhost:8080\nCompleted running 'src/index.js'"
        },
        {
         "titulo": "Em outro terminal, faça uma requisição",
         "explicacao": "Deixe a API rodando e abra outro Prompt de Comando. <code>curl</code> faz requisições HTTP pelo terminal e já vem no Windows; <code>-i</code> mostra também o código de status e os cabeçalhos da resposta.",
         "observe": "<code>500</code> é esperado neste momento: o banco de dados ainda não foi criado, e a API responde com a mensagem de erro em JSON. Na Etapa 5, com o banco pronto, a mesma requisição devolve a lista de livros.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "curl -i http://localhost:8080/livros",
         "saida": "HTTP/1.1 500 Internal Server Error\nX-Powered-By: Express\nAccess-Control-Allow-Origin: *\nContent-Type: application/json; charset=utf-8\nContent-Length: 46\nETag: W/\"2e-7QQOBVCsT+bI3CppWJ2wDvfxh90\"\nDate: Mon, 14 Sep 2026 23:33:59 GMT\nConnection: keep-alive\nKeep-Alive: timeout=5\n\n{\"mensagens\":[\"Erro ao consultar os livros.\"]}"
        }
       ]
      },
      "java": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Inicie a API",
         "explicacao": "<code>mvn compile exec:java</code> compila e executa o método <code>main</code> da classe <code>biblioteca.App</code>, configurada no <code>pom.xml</code>. O terminal fica ocupado enquanto a API roda; para parar, aperte <kbd>Ctrl</kbd>+<kbd>C</kbd>.",
         "observe": "<code>Listening on http://localhost:8080/</code>: a API está no ar. As linhas do Jetty são do servidor web usado pelo Javalin.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "mvn compile exec:java",
         "saida": "[INFO] Scanning for projects...\n[INFO]\n[INFO] -------------------< biblioteca:biblioteca-backend >--------------------\n[INFO] Building biblioteca-backend 1.0.0\n[INFO]   from pom.xml\n[INFO] --------------------------------[ jar ]---------------------------------\n[INFO]\n[INFO] --- resources:3.3.1:resources (default-resources) @ biblioteca-backend ---\n[INFO] Copying 3 resources from src\\main\\resources to target\\classes\n[INFO]\n[INFO] --- compiler:3.14.1:compile (default-compile) @ biblioteca-backend ---\n[INFO] Recompiling the module because of changed source code.\n[INFO] Compiling 19 source files with javac [debug release 17] to target\\classes\n[INFO]\n[INFO] --- exec:3.6.4:java (default-cli) @ biblioteca-backend ---\n[biblioteca.App.main()] INFO io.javalin.Javalin - Starting Javalin ...\n[biblioteca.App.main()] INFO org.eclipse.jetty.server.Server - jetty-11.0.25; built: 2025-03-13T00:15:57.301Z; git: a2e9fae3ad8320f2a713d4fa29bba356a99d1295; jvm 20.0.2+9-78\n[biblioteca.App.main()] INFO org.eclipse.jetty.server.session.DefaultSessionIdManager - Session workerName=node0\n[biblioteca.App.main()] INFO org.eclipse.jetty.server.handler.ContextHandler - Started o.e.j.s.ServletContextHandler@17d95e51{/,null,AVAILABLE}\n[biblioteca.App.main()] INFO org.eclipse.jetty.server.AbstractConnector - Started ServerConnector@67d6d3ad{HTTP/1.1, (http/1.1)}{0.0.0.0:8080}\n[biblioteca.App.main()] INFO org.eclipse.jetty.server.Server - Started Server@2b1f71c4{STARTING}[11.0.25,sto=0] @3845ms\n[biblioteca.App.main()] INFO io.javalin.Javalin -\n       __                  ___           _____\n      / /___ __   ______ _/ (_)___      / ___/\n __  / / __ `/ | / / __ `/ / / __ \\    / __ \\\n/ /_/ / /_/ /| |/ / /_/ / / / / / /   / /_/ /\n\\____/\\__,_/ |___/\\__,_/_/_/_/ /_/    \\____/\n\n       https://javalin.io/documentation\n\n[biblioteca.App.main()] INFO io.javalin.Javalin - Javalin started in 281ms \\o/\n[biblioteca.App.main()] INFO io.javalin.Javalin - Listening on http://localhost:8080/\n[biblioteca.App.main()] INFO io.javalin.Javalin - You are running Javalin 6.7.0 (released June 22, 2025. Your Javalin version is 449 days old. Consider checking for a newer version.)."
        },
        {
         "titulo": "Em outro terminal, faça uma requisição",
         "explicacao": "Deixe a API rodando e abra outro Prompt de Comando. <code>curl</code> faz requisições HTTP pelo terminal e já vem no Windows; <code>-i</code> mostra também o código de status e os cabeçalhos da resposta.",
         "observe": "<code>500</code> é esperado neste momento: o banco de dados ainda não foi criado, e a API responde com a mensagem de erro em JSON. Na Etapa 5, com o banco pronto, a mesma requisição devolve a lista de livros.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "curl -i http://localhost:8080/livros",
         "saida": "HTTP/1.1 500 Server Error\nDate: Mon, 14 Sep 2026 23:35:45 GMT\nContent-Type: application/json\nContent-Length: 64\n\n{\"mensagens\":[\"Não foi possível conectar ao banco de dados.\"]}"
        }
       ]
      }
     }
    };

})( window.Guia );
