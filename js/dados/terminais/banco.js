// Arquivo gerado a partir das saídas reais dos comandos, com MariaDB 11.4 e MySQL 8.4. Não edite à mão.
(function ( Guia ) {
    'use strict';

    Guia.dados.terminais[ "banco.conferir" ] = {
     "camada": "banco",
     "variantes": {
      "mariadb": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Confira a versão do cliente",
         "explicacao": "O MariaDB traz o programa <code>mariadb</code>, que conversa com o servidor pelo terminal. Ele também instala o <code>mysql</code>, um nome alternativo para o mesmo programa: por isso os scripts do projeto, que usam <code>mysql</code>, funcionam com os dois bancos.",
         "observe": "Se aparecer <em>“mariadb” não é reconhecido</em>, a pasta <code>bin</code> do MariaDB não está no PATH.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria",
         "comando": "mariadb --version",
         "saida": "C:\\Program Files\\MariaDB 11.4\\bin\\mariadb.exe from 11.4.4-MariaDB, client 15.2 for Win64 (AMD64), source revision e9a502df08bad16aa8a354e854f3c014b1380e32"
        },
        {
         "titulo": "Liste os bancos existentes",
         "explicacao": "<code>-u root</code> informa o usuário, <code>--password=root</code> a senha e <code>-e</code> executa um comando SQL e sai. Sem o <code>-e</code>, o cliente abre um terminal próprio, com o sinal <code>MariaDB [(none)]&gt;</code>, onde os comandos SQL são digitados; para sair, digite <code>exit</code>.",
         "observe": "Os quatro bancos listados são do próprio servidor. O banco <code>biblioteca</code> ainda não existe.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria",
         "comando": "mariadb -u root --password=root -e \"SHOW DATABASES;\"",
         "saida": "+--------------------+\n| Database           |\n+--------------------+\n| information_schema |\n| mysql              |\n| performance_schema |\n| sys                |\n+--------------------+"
        }
       ]
      },
      "mysql": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Confira a versão do cliente",
         "explicacao": "O MySQL traz o programa <code>mysql</code>, que conversa com o servidor pelo terminal. É o mesmo nome usado nos scripts do projeto.",
         "observe": "Se aparecer <em>“mysql” não é reconhecido</em>, a pasta <code>bin</code> do MySQL não está no PATH.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria",
         "comando": "mysql --version",
         "saida": "C:\\Program Files\\MySQL\\MySQL Server 8.4\\bin\\mysql.exe  Ver 8.4.6 for Win64 on x86_64 (MySQL Community Server - GPL)"
        },
        {
         "titulo": "Liste os bancos existentes",
         "explicacao": "<code>-u root</code> informa o usuário, <code>--password=root</code> a senha e <code>-e</code> executa um comando SQL e sai. Sem o <code>-e</code>, o cliente abre um terminal próprio, com o sinal <code>mysql&gt;</code>, onde os comandos SQL são digitados; para sair, digite <code>exit</code>.",
         "observe": "O <code>[Warning]</code> avisa que digitar a senha na linha de comando é inseguro, porque ela fica no histórico; em projetos de estudo, pode ser ignorado. Os quatro bancos listados são do próprio servidor. O banco <code>biblioteca</code> ainda não existe.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria",
         "comando": "mysql -u root --password=root -e \"SHOW DATABASES;\"",
         "saida": "mysql: [Warning] Using a password on the command line interface can be insecure.\n+--------------------+\n| Database           |\n+--------------------+\n| information_schema |\n| mysql              |\n| performance_schema |\n| sys                |\n+--------------------+"
        }
       ]
      }
     }
    };

    Guia.dados.terminais[ "banco.criar" ] = {
     "camada": "backend",
     "variantes": {
      "php": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Crie o banco e carregue os dados iniciais",
         "explicacao": "<code>composer db</code> executa os scripts <code>db:e</code> e <code>db:d</code> do <code>composer.json</code>: primeiro <code>mysql ... &lt; db/estrutura.sql</code>, depois <code>mysql ... biblioteca &lt; db/dados.sql</code>. O sinal <code>&lt;</code> entrega o conteúdo do arquivo ao programa <code>mysql</code>.",
         "observe": "Não aparece nada: os dois scripts rodaram sem erro. Com o MySQL, cada comando <code>mysql</code> que recebe a senha na linha de comando também mostra <code>mysql: [Warning] Using a password on the command line interface can be insecure.</code>: é só um lembrete de segurança, e o comando funciona normalmente.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "composer db",
         "saida": ""
        }
       ]
      },
      "typescript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Crie o banco e carregue os dados iniciais",
         "explicacao": "<code>pnpm db</code> executa os scripts <code>db:e</code> e <code>db:d</code> do <code>package.json</code>. O sinal <code>&lt;</code> entrega o conteúdo do arquivo ao programa <code>mysql</code>.",
         "observe": "O PNPM mostra cada script executado, com <code>$</code> na frente. Nenhuma mensagem de erro: o banco foi criado e os dados foram carregados. Com o MySQL, cada comando <code>mysql</code> que recebe a senha na linha de comando também mostra <code>mysql: [Warning] Using a password on the command line interface can be insecure.</code>: é só um lembrete de segurança, e o comando funciona normalmente.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "pnpm db",
         "saida": "$ pnpm db:e && pnpm db:d\n$ mysql -u root --password=root < db/estrutura.sql\n$ mysql -u root --password=root biblioteca < db/dados.sql"
        }
       ]
      },
      "javascript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Crie o banco e carregue os dados iniciais",
         "explicacao": "<code>pnpm db</code> executa os scripts <code>db:e</code> e <code>db:d</code> do <code>package.json</code>. O sinal <code>&lt;</code> entrega o conteúdo do arquivo ao programa <code>mysql</code>.",
         "observe": "O PNPM mostra cada script executado, com <code>$</code> na frente. Nenhuma mensagem de erro: o banco foi criado e os dados foram carregados. Com o MySQL, cada comando <code>mysql</code> que recebe a senha na linha de comando também mostra <code>mysql: [Warning] Using a password on the command line interface can be insecure.</code>: é só um lembrete de segurança, e o comando funciona normalmente.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "pnpm db",
         "saida": "$ pnpm db:e && pnpm db:d\n$ mysql -u root --password=root < db/estrutura.sql\n$ mysql -u root --password=root biblioteca < db/dados.sql"
        }
       ]
      },
      "java": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Crie o banco",
         "explicacao": "O Maven não tem scripts como o Composer e o PNPM, então o <code>mysql</code> é chamado diretamente. O sinal <code>&lt;</code> entrega o conteúdo do arquivo ao programa.",
         "observe": "Não aparece nada: o script rodou sem erro. Com o MySQL, cada comando <code>mysql</code> que recebe a senha na linha de comando também mostra <code>mysql: [Warning] Using a password on the command line interface can be insecure.</code>: é só um lembrete de segurança, e o comando funciona normalmente.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "mysql -u root --password=root < src\\main\\resources\\db\\estrutura.sql"
        },
        {
         "titulo": "Carregue os dados iniciais",
         "explicacao": "O nome do banco, <code>biblioteca</code>, vem antes do <code>&lt;</code>, porque <code>dados.sql</code> não tem o comando <code>USE</code>.",
         "observe": "Não aparece nada: os dados foram carregados.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "mysql -u root --password=root biblioteca < src\\main\\resources\\db\\dados.sql"
        }
       ]
      }
     }
    };

    Guia.dados.terminais[ "banco.consultar" ] = {
     "camada": "banco",
     "variantes": {
      "mariadb": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Confira os dados",
         "explicacao": "Informando o banco <code>biblioteca</code> antes do <code>-e</code>, o <code>SELECT</code> é executado dentro dele.",
         "observe": "Os seis livros de <code>dados.sql</code>, com os <code>id</code> gerados pelo <code>AUTO_INCREMENT</code>.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria",
         "comando": "mariadb -u root --password=root biblioteca -e \"SELECT id, titulo, autor FROM livro;\"",
         "saida": "+----+------------------------------------+-------------------+\n| id | titulo                             | autor             |\n+----+------------------------------------+-------------------+\n|  1 | Dom Casmurro                       | Machado de Assis  |\n|  2 | O Cortiço                          | Aluísio Azevedo   |\n|  3 | Vidas Secas                        | Graciliano Ramos  |\n|  4 | Capitães da Areia                  | Jorge Amado       |\n|  5 | A Hora da Estrela                  | Clarice Lispector |\n|  6 | Memórias Póstumas de Brás Cubas    | Machado de Assis  |\n+----+------------------------------------+-------------------+"
        }
       ]
      },
      "mysql": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Confira os dados",
         "explicacao": "Informando o banco <code>biblioteca</code> antes do <code>-e</code>, o <code>SELECT</code> é executado dentro dele.",
         "observe": "Os seis livros de <code>dados.sql</code>, com os <code>id</code> gerados pelo <code>AUTO_INCREMENT</code>. No Prompt de Comando, as linhas com acento podem sair desalinhadas: o cliente conta os bytes, e letras acentuadas ocupam dois. Os dados estão corretos.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria",
         "comando": "mysql -u root --password=root biblioteca -e \"SELECT id, titulo, autor FROM livro;\"",
         "saida": "mysql: [Warning] Using a password on the command line interface can be insecure.\n+----+------------------------------------+-------------------+\n| id | titulo                             | autor             |\n+----+------------------------------------+-------------------+\n|  1 | Dom Casmurro                       | Machado de Assis  |\n|  2 | O Cortiço                         | Aluísio Azevedo  |\n|  3 | Vidas Secas                        | Graciliano Ramos  |\n|  4 | Capitães da Areia                 | Jorge Amado       |\n|  5 | A Hora da Estrela                  | Clarice Lispector |\n|  6 | Memórias Póstumas de Brás Cubas | Machado de Assis  |\n+----+------------------------------------+-------------------+"
        }
       ]
      }
     }
    };

    Guia.dados.terminais[ "banco.integracao" ] = {
     "camada": "backend",
     "variantes": {
      "php": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Rode todos os testes, inclusive os de integração",
         "explicacao": "Com o banco no ar, <code>composer test</code> roda as três especificações. O PHP precisa da extensão <code>pdo_mysql</code>: se aparecer <em>could not find driver</em>, abra o <code>php.ini</code> e remova o <code>;</code> do início da linha <code>extension=pdo_mysql</code>.",
         "observe": "<code>Passed 15 of 15</code>: os 5 testes da entidade, os 6 do gestor e os 4 de integração. Os testes de integração recriam o banco com <code>dados-teste.sql</code>; depois deles, rode <code>composer db</code> para voltar aos dados iniciais.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "composer test",
         "saida": "            _     _\n  /\\ /\\__ _| |__ | | __ _ _ __\n / //_/ _` | '_ \\| |/ _` | '_ \\\n/ __ \\ (_| | | | | | (_| | | | |\n\\/  \\/\\__,_|_| |_|_|\\__,_|_| |_|\n\nThe PHP Test Framework for Freedom, Truth and Justice.\n\nsrc directory  : C:\\projetos\\biblioteca-comunitaria\\backend\\src\nspec directory : C:\\projetos\\biblioteca-comunitaria\\backend\\spec\n\n...............                                                   15 / 15 (100%)\n\n\n\nExpectations   : 22 Executed\nSpecifications : 0 Pending, 0 Excluded, 0 Skipped\n\nPassed 15 of 15 PASS in 0.245 seconds (using 3MB)"
        }
       ]
      },
      "typescript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Rode todos os testes, inclusive os de integração",
         "explicacao": "Com o banco no ar, <code>pnpm test</code> roda os três arquivos de teste. <code>--reporter=verbose</code> lista cada teste.",
         "observe": "Os testes de <code>repositorio-emprestimos-em-bdr.spec.ts</code> demoram mais, porque recriam o banco antes de cada um. Depois deles, rode <code>pnpm db</code> para voltar aos dados iniciais.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "pnpm test --reporter=verbose",
         "saida": "$ vitest run \"--reporter=verbose\"\n\n RUN  v4.1.11 C:/projetos/biblioteca-comunitaria/backend\n\n ✓ test/emprestimo.spec.ts > Emprestimo > dataLimite > é sete dias após a data do empréstimo 4ms\n ✓ test/emprestimo.spec.ts > Emprestimo > calcularMulta > não cobra multa quando devolvido dentro do prazo 0ms\n ✓ test/emprestimo.spec.ts > Emprestimo > calcularMulta > cobra um real por dia de atraso 0ms\n ✓ test/emprestimo.spec.ts > Emprestimo > devolver > encerra o empréstimo 0ms\n ✓ test/emprestimo.spec.ts > Emprestimo > devolver > lança exceção ao devolver um empréstimo já devolvido 0ms\n ✓ test/gestor-emprestimos.spec.ts > GestorEmprestimos > registrar > registra o empréstimo e informa a data limite 2ms\n ✓ test/gestor-emprestimos.spec.ts > GestorEmprestimos > registrar > lança exceção quando o livro não é informado 1ms\n ✓ test/gestor-emprestimos.spec.ts > GestorEmprestimos > registrar > lança exceção quando o livro já está emprestado 1ms\n ✓ test/gestor-emprestimos.spec.ts > GestorEmprestimos > registrar > não permite o quarto empréstimo 1ms\n ✓ test/gestor-emprestimos.spec.ts > GestorEmprestimos > devolver > registra a devolução e informa a multa 1ms\n ✓ test/gestor-emprestimos.spec.ts > GestorEmprestimos > devolver > lança exceção quando o empréstimo não está em aberto 0ms\n ✓ test/repositorio-emprestimos-em-bdr.spec.ts > RepositorioEmprestimosEmBDR > obtém os empréstimos em aberto com livro e leitor 82ms\n ✓ test/repositorio-emprestimos-em-bdr.spec.ts > RepositorioEmprestimosEmBDR > informa se o livro está emprestado 54ms\n ✓ test/repositorio-emprestimos-em-bdr.spec.ts > RepositorioEmprestimosEmBDR > adiciona um empréstimo e retorna o id gerado 52ms\n ✓ test/repositorio-emprestimos-em-bdr.spec.ts > RepositorioEmprestimosEmBDR > registra a devolução 50ms\n\n Test Files  3 passed (3)\n      Tests  15 passed (15)\n   Start at  20:45:19\n   Duration  664ms (transform 125ms, setup 0ms, import 321ms, tests 255ms, environment 0ms)"
        }
       ]
      },
      "javascript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Rode todos os testes, inclusive os de integração",
         "explicacao": "Com o banco no ar, <code>pnpm test</code> roda os três arquivos de teste. <code>--reporter=verbose</code> lista cada teste.",
         "observe": "Os testes de <code>repositorio-emprestimos-em-bdr.spec.js</code> demoram mais, porque recriam o banco antes de cada um. Depois deles, rode <code>pnpm db</code> para voltar aos dados iniciais.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "pnpm test --reporter=verbose",
         "saida": "$ vitest run \"--reporter=verbose\"\n\n RUN  v4.1.11 C:/projetos/biblioteca-comunitaria/backend\n\n ✓ test/emprestimo.spec.js > Emprestimo > dataLimite > é sete dias após a data do empréstimo 3ms\n ✓ test/emprestimo.spec.js > Emprestimo > calcularMulta > não cobra multa quando devolvido dentro do prazo 0ms\n ✓ test/emprestimo.spec.js > Emprestimo > calcularMulta > cobra um real por dia de atraso 0ms\n ✓ test/emprestimo.spec.js > Emprestimo > devolver > encerra o empréstimo 0ms\n ✓ test/emprestimo.spec.js > Emprestimo > devolver > lança exceção ao devolver um empréstimo já devolvido 0ms\n ✓ test/gestor-emprestimos.spec.js > GestorEmprestimos > registrar > registra o empréstimo e informa a data limite 2ms\n ✓ test/gestor-emprestimos.spec.js > GestorEmprestimos > registrar > lança exceção quando o livro não é informado 2ms\n ✓ test/gestor-emprestimos.spec.js > GestorEmprestimos > registrar > lança exceção quando o livro já está emprestado 1ms\n ✓ test/gestor-emprestimos.spec.js > GestorEmprestimos > registrar > não permite o quarto empréstimo 0ms\n ✓ test/gestor-emprestimos.spec.js > GestorEmprestimos > devolver > registra a devolução e informa a multa 1ms\n ✓ test/gestor-emprestimos.spec.js > GestorEmprestimos > devolver > lança exceção quando o empréstimo não está em aberto 0ms\n ✓ test/repositorio-emprestimos-em-bdr.spec.js > RepositorioEmprestimosEmBDR > obtém os empréstimos em aberto com livro e leitor 85ms\n ✓ test/repositorio-emprestimos-em-bdr.spec.js > RepositorioEmprestimosEmBDR > informa se o livro está emprestado 51ms\n ✓ test/repositorio-emprestimos-em-bdr.spec.js > RepositorioEmprestimosEmBDR > adiciona um empréstimo e retorna o id gerado 56ms\n ✓ test/repositorio-emprestimos-em-bdr.spec.js > RepositorioEmprestimosEmBDR > registra a devolução 49ms\n\n Test Files  3 passed (3)\n      Tests  15 passed (15)\n   Start at  20:45:21\n   Duration  664ms (transform 102ms, setup 0ms, import 294ms, tests 258ms, environment 0ms)"
        }
       ]
      },
      "java": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Rode todos os testes, inclusive os de integração",
         "explicacao": "Com o banco no ar, <code>mvn test</code> roda as três classes de teste.",
         "observe": "<code>RepositorioEmprestimosEmBDRTest</code> demora mais, porque recria o banco antes de cada teste. <code>Tests run: 15, Failures: 0</code> e <code>BUILD SUCCESS</code>. Depois, carregue <code>dados.sql</code> de novo para voltar aos dados iniciais.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "mvn test",
         "saida": "[INFO] Scanning for projects...\n[INFO]\n[INFO] -------------------< biblioteca:biblioteca-backend >--------------------\n[INFO] Building biblioteca-backend 1.0.0\n[INFO]   from pom.xml\n[INFO] --------------------------------[ jar ]---------------------------------\n[INFO]\n[INFO] --- resources:3.3.1:resources (default-resources) @ biblioteca-backend ---\n[INFO] Copying 3 resources from src\\main\\resources to target\\classes\n[INFO]\n[INFO] --- compiler:3.14.1:compile (default-compile) @ biblioteca-backend ---\n[INFO] Nothing to compile - all classes are up to date.\n[INFO]\n[INFO] --- resources:3.3.1:testResources (default-testResources) @ biblioteca-backend ---\n[INFO] skip non existing resourceDirectory C:\\projetos\\biblioteca-comunitaria\\backend\\src\\test\\resources\n[INFO]\n[INFO] --- compiler:3.14.1:testCompile (default-testCompile) @ biblioteca-backend ---\n[INFO] Nothing to compile - all classes are up to date.\n[INFO]\n[INFO] --- surefire:3.5.4:test (default-test) @ biblioteca-backend ---\n[INFO] Using auto detected provider org.apache.maven.surefire.junitplatform.JUnitPlatformProvider\n[INFO]\n[INFO] -------------------------------------------------------\n[INFO]  T E S T S\n[INFO] -------------------------------------------------------\n[INFO] Running biblioteca.emprestimo.EmprestimoTest\n[INFO] Running biblioteca.emprestimo.EmprestimoTest$Devolver\n[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.037 s -- in biblioteca.emprestimo.EmprestimoTest$Devolver\n[INFO] Running biblioteca.emprestimo.EmprestimoTest$CalcularMulta\n[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.009 s -- in biblioteca.emprestimo.EmprestimoTest$CalcularMulta\n[INFO] Running biblioteca.emprestimo.EmprestimoTest$DataLimite\n[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.005 s -- in biblioteca.emprestimo.EmprestimoTest$DataLimite\n[INFO] Tests run: 0, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.085 s -- in biblioteca.emprestimo.EmprestimoTest\n[INFO] Running biblioteca.emprestimo.GestorEmprestimosTest\n[INFO] Running biblioteca.emprestimo.GestorEmprestimosTest$Devolver\n[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.016 s -- in biblioteca.emprestimo.GestorEmprestimosTest$Devolver\n[INFO] Running biblioteca.emprestimo.GestorEmprestimosTest$Registrar\n[INFO] Tests run: 4, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.026 s -- in biblioteca.emprestimo.GestorEmprestimosTest$Registrar\n[INFO] Tests run: 0, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.049 s -- in biblioteca.emprestimo.GestorEmprestimosTest\n[INFO] Running biblioteca.emprestimo.RepositorioEmprestimosEmBDRTest\n[INFO] Tests run: 4, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.774 s -- in biblioteca.emprestimo.RepositorioEmprestimosEmBDRTest\n[INFO]\n[INFO] Results:\n[INFO]\n[INFO] Tests run: 15, Failures: 0, Errors: 0, Skipped: 0\n[INFO]\n[INFO] ------------------------------------------------------------------------\n[INFO] BUILD SUCCESS\n[INFO] ------------------------------------------------------------------------\n[INFO] Total time:  2.594 s\n[INFO] Finished at: 2026-09-14T20:45:26-03:00\n[INFO] ------------------------------------------------------------------------"
        }
       ]
      }
     }
    };

    Guia.dados.terminais[ "banco.rotas" ] = {
     "camada": "backend",
     "variantes": {
      "php": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Liste os empréstimos em aberto",
         "explicacao": "Com a API rodando (<a href=\"#backend\">Etapa 4</a>) e o banco com os dados iniciais, abra outro terminal. Uma requisição <code>GET</code> só lê dados.",
         "observe": "<code>200 OK</code> e a lista em JSON: “Dom Casmurro” foi emprestado há 10 dias, então tem 3 dias de atraso e multa de R$ 3,00; “Capitães da Areia” está no prazo. As datas dependem do dia em que os dados foram carregados, porque <code>dados.sql</code> usa <code>CURDATE()</code>.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria",
         "comando": "curl -i http://localhost:8080/emprestimos",
         "saida": "HTTP/1.1 200 OK\nHost: localhost:8080\nDate: Mon, 14 Sep 2026 23:45:32 GMT\nConnection: close\nX-Powered-By:  PHP/8.5.10\nAccess-Control-Allow-Origin: *\nAccess-Control-Allow-Credentials: true\nAccess-Control-Allow-Headers: *\nContent-Type: application/json;charset=UTF-8\n\n[{\"id\":1,\"livro\":{\"id\":1,\"titulo\":\"Dom Casmurro\",\"autor\":\"Machado de Assis\"},\"leitor\":{\"id\":1,\"nome\":\"Ana Souza\"},\"dataEmprestimo\":\"2026-09-04\",\"dataLimite\":\"2026-09-11\",\"diasDeAtraso\":3,\"multa\":3},{\"id\":2,\"livro\":{\"id\":4,\"titulo\":\"Capit\\u00e3es da Areia\",\"autor\":\"Jorge Amado\"},\"leitor\":{\"id\":2,\"nome\":\"Bruno Lima\"},\"dataEmprestimo\":\"2026-09-12\",\"dataLimite\":\"2026-09-19\",\"diasDeAtraso\":0,\"multa\":0}]"
        },
        {
         "titulo": "Registre um empréstimo",
         "explicacao": "<code>-X POST</code> escolhe o método, <code>-H</code> informa que o corpo é JSON e <code>-d</code> envia o corpo. No Prompt de Comando, as aspas dentro do JSON precisam de <code>\\</code> antes.",
         "observe": "<code>201 Created</code>: o empréstimo foi criado e a resposta traz o <code>id</code> gerado pelo banco e a data limite.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria",
         "comando": "curl -i -X POST http://localhost:8080/emprestimos -H \"Content-Type: application/json\" -d \"{\\\"livroId\\\":3,\\\"leitorId\\\":3}\"",
         "saida": "HTTP/1.1 201 Created\nHost: localhost:8080\nDate: Mon, 14 Sep 2026 23:45:32 GMT\nConnection: close\nX-Powered-By:  PHP/8.5.10\nAccess-Control-Allow-Origin: *\nAccess-Control-Allow-Credentials: true\nAccess-Control-Allow-Headers: *\nContent-Type: application/json;charset=UTF-8\n\n{\"id\":3,\"livro\":{\"id\":3,\"titulo\":\"Vidas Secas\",\"autor\":\"Graciliano Ramos\"},\"leitor\":{\"id\":3,\"nome\":\"Carla Mendes\"},\"dataEmprestimo\":\"2026-09-14\",\"dataLimite\":\"2026-09-21\",\"diasDeAtraso\":0,\"multa\":0}"
        },
        {
         "titulo": "Tente quebrar uma regra",
         "explicacao": "O livro 1, “Dom Casmurro”, já está emprestado. A regra R4 precisa impedir um novo empréstimo.",
         "observe": "<code>400 Bad Request</code> com a mensagem da <code>DominioException</code>: é essa mensagem que a tela vai mostrar ao usuário.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria",
         "comando": "curl -i -X POST http://localhost:8080/emprestimos -H \"Content-Type: application/json\" -d \"{\\\"livroId\\\":1,\\\"leitorId\\\":2}\"",
         "saida": "HTTP/1.1 400 Bad Request\nHost: localhost:8080\nDate: Mon, 14 Sep 2026 23:45:32 GMT\nConnection: close\nX-Powered-By:  PHP/8.5.10\nAccess-Control-Allow-Origin: *\nAccess-Control-Allow-Credentials: true\nAccess-Control-Allow-Headers: *\nContent-Type: application/json;charset=UTF-8\n\n{\"mensagens\":[\"O livro j\\u00e1 est\\u00e1 emprestado.\"]}"
        },
        {
         "titulo": "Registre a devolução com atraso",
         "explicacao": "<code>PATCH</code> altera parte de um recurso: aqui, registra a devolução do empréstimo 1.",
         "observe": "<code>diasDeAtraso: 3</code> e <code>multa: 3</code>: as regras R1 e R2 funcionando de ponta a ponta, com dados vindos do banco.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria",
         "comando": "curl -i -X PATCH http://localhost:8080/emprestimos/1/devolucao",
         "saida": "HTTP/1.1 200 OK\nHost: localhost:8080\nDate: Mon, 14 Sep 2026 23:45:32 GMT\nConnection: close\nX-Powered-By:  PHP/8.5.10\nAccess-Control-Allow-Origin: *\nAccess-Control-Allow-Credentials: true\nAccess-Control-Allow-Headers: *\nContent-Type: application/json;charset=UTF-8\n\n{\"id\":1,\"dataDevolucao\":\"2026-09-14\",\"diasDeAtraso\":3,\"multa\":3}"
        }
       ]
      },
      "typescript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Liste os empréstimos em aberto",
         "explicacao": "Com a API rodando (<a href=\"#backend\">Etapa 4</a>) e o banco com os dados iniciais, abra outro terminal. Uma requisição <code>GET</code> só lê dados.",
         "observe": "<code>200 OK</code> e a lista em JSON: “Dom Casmurro” foi emprestado há 10 dias, então tem 3 dias de atraso e multa de R$ 3,00; “Capitães da Areia” está no prazo. As datas dependem do dia em que os dados foram carregados, porque <code>dados.sql</code> usa <code>CURDATE()</code>.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria",
         "comando": "curl -i http://localhost:8080/emprestimos",
         "saida": "HTTP/1.1 200 OK\nX-Powered-By: Express\nAccess-Control-Allow-Origin: *\nContent-Type: application/json; charset=utf-8\nContent-Length: 397\nETag: W/\"18d-LgZK/g/74/NntsnvSi8heIL670c\"\nDate: Mon, 14 Sep 2026 23:45:39 GMT\nConnection: keep-alive\nKeep-Alive: timeout=5\n\n[{\"id\":1,\"livro\":{\"id\":1,\"titulo\":\"Dom Casmurro\",\"autor\":\"Machado de Assis\"},\"leitor\":{\"id\":1,\"nome\":\"Ana Souza\"},\"dataEmprestimo\":\"2026-09-04\",\"dataLimite\":\"2026-09-11\",\"diasDeAtraso\":3,\"multa\":3},{\"id\":2,\"livro\":{\"id\":4,\"titulo\":\"Capitães da Areia\",\"autor\":\"Jorge Amado\"},\"leitor\":{\"id\":2,\"nome\":\"Bruno Lima\"},\"dataEmprestimo\":\"2026-09-12\",\"dataLimite\":\"2026-09-19\",\"diasDeAtraso\":0,\"multa\":0}]"
        },
        {
         "titulo": "Registre um empréstimo",
         "explicacao": "<code>-X POST</code> escolhe o método, <code>-H</code> informa que o corpo é JSON e <code>-d</code> envia o corpo. No Prompt de Comando, as aspas dentro do JSON precisam de <code>\\</code> antes.",
         "observe": "<code>201 Created</code>: o empréstimo foi criado e a resposta traz o <code>id</code> gerado pelo banco e a data limite.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria",
         "comando": "curl -i -X POST http://localhost:8080/emprestimos -H \"Content-Type: application/json\" -d \"{\\\"livroId\\\":3,\\\"leitorId\\\":3}\"",
         "saida": "HTTP/1.1 201 Created\nX-Powered-By: Express\nAccess-Control-Allow-Origin: *\nContent-Type: application/json; charset=utf-8\nContent-Length: 198\nETag: W/\"c6-W1VmclTIalfCEnmlzDFrIEQeAdY\"\nDate: Mon, 14 Sep 2026 23:45:39 GMT\nConnection: keep-alive\nKeep-Alive: timeout=5\n\n{\"id\":3,\"livro\":{\"id\":3,\"titulo\":\"Vidas Secas\",\"autor\":\"Graciliano Ramos\"},\"leitor\":{\"id\":3,\"nome\":\"Carla Mendes\"},\"dataEmprestimo\":\"2026-09-14\",\"dataLimite\":\"2026-09-21\",\"diasDeAtraso\":0,\"multa\":0}"
        },
        {
         "titulo": "Tente quebrar uma regra",
         "explicacao": "O livro 1, “Dom Casmurro”, já está emprestado. A regra R4 precisa impedir um novo empréstimo.",
         "observe": "<code>400 Bad Request</code> com a mensagem da <code>DominioException</code>: é essa mensagem que a tela vai mostrar ao usuário.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria",
         "comando": "curl -i -X POST http://localhost:8080/emprestimos -H \"Content-Type: application/json\" -d \"{\\\"livroId\\\":1,\\\"leitorId\\\":2}\"",
         "saida": "HTTP/1.1 400 Bad Request\nX-Powered-By: Express\nAccess-Control-Allow-Origin: *\nContent-Type: application/json; charset=utf-8\nContent-Length: 47\nETag: W/\"2f-hiRf0V6EOJETmdlOlRL0WJ7KKLI\"\nDate: Mon, 14 Sep 2026 23:45:39 GMT\nConnection: keep-alive\nKeep-Alive: timeout=5\n\n{\"mensagens\":[\"O livro já está emprestado.\"]}"
        },
        {
         "titulo": "Registre a devolução com atraso",
         "explicacao": "<code>PATCH</code> altera parte de um recurso: aqui, registra a devolução do empréstimo 1.",
         "observe": "<code>diasDeAtraso: 3</code> e <code>multa: 3</code>: as regras R1 e R2 funcionando de ponta a ponta, com dados vindos do banco.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria",
         "comando": "curl -i -X PATCH http://localhost:8080/emprestimos/1/devolucao",
         "saida": "HTTP/1.1 200 OK\nX-Powered-By: Express\nAccess-Control-Allow-Origin: *\nContent-Type: application/json; charset=utf-8\nContent-Length: 64\nETag: W/\"40-ZuwgeWfHetm/3Gb5CL/uSZqzQz4\"\nDate: Mon, 14 Sep 2026 23:45:39 GMT\nConnection: keep-alive\nKeep-Alive: timeout=5\n\n{\"id\":1,\"dataDevolucao\":\"2026-09-14\",\"diasDeAtraso\":3,\"multa\":3}"
        }
       ]
      },
      "javascript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Liste os empréstimos em aberto",
         "explicacao": "Com a API rodando (<a href=\"#backend\">Etapa 4</a>) e o banco com os dados iniciais, abra outro terminal. Uma requisição <code>GET</code> só lê dados.",
         "observe": "<code>200 OK</code> e a lista em JSON: “Dom Casmurro” foi emprestado há 10 dias, então tem 3 dias de atraso e multa de R$ 3,00; “Capitães da Areia” está no prazo. As datas dependem do dia em que os dados foram carregados, porque <code>dados.sql</code> usa <code>CURDATE()</code>.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria",
         "comando": "curl -i http://localhost:8080/emprestimos",
         "saida": "HTTP/1.1 200 OK\nX-Powered-By: Express\nAccess-Control-Allow-Origin: *\nContent-Type: application/json; charset=utf-8\nContent-Length: 397\nETag: W/\"18d-LgZK/g/74/NntsnvSi8heIL670c\"\nDate: Mon, 14 Sep 2026 23:45:46 GMT\nConnection: keep-alive\nKeep-Alive: timeout=5\n\n[{\"id\":1,\"livro\":{\"id\":1,\"titulo\":\"Dom Casmurro\",\"autor\":\"Machado de Assis\"},\"leitor\":{\"id\":1,\"nome\":\"Ana Souza\"},\"dataEmprestimo\":\"2026-09-04\",\"dataLimite\":\"2026-09-11\",\"diasDeAtraso\":3,\"multa\":3},{\"id\":2,\"livro\":{\"id\":4,\"titulo\":\"Capitães da Areia\",\"autor\":\"Jorge Amado\"},\"leitor\":{\"id\":2,\"nome\":\"Bruno Lima\"},\"dataEmprestimo\":\"2026-09-12\",\"dataLimite\":\"2026-09-19\",\"diasDeAtraso\":0,\"multa\":0}]"
        },
        {
         "titulo": "Registre um empréstimo",
         "explicacao": "<code>-X POST</code> escolhe o método, <code>-H</code> informa que o corpo é JSON e <code>-d</code> envia o corpo. No Prompt de Comando, as aspas dentro do JSON precisam de <code>\\</code> antes.",
         "observe": "<code>201 Created</code>: o empréstimo foi criado e a resposta traz o <code>id</code> gerado pelo banco e a data limite.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria",
         "comando": "curl -i -X POST http://localhost:8080/emprestimos -H \"Content-Type: application/json\" -d \"{\\\"livroId\\\":3,\\\"leitorId\\\":3}\"",
         "saida": "HTTP/1.1 201 Created\nX-Powered-By: Express\nAccess-Control-Allow-Origin: *\nContent-Type: application/json; charset=utf-8\nContent-Length: 198\nETag: W/\"c6-W1VmclTIalfCEnmlzDFrIEQeAdY\"\nDate: Mon, 14 Sep 2026 23:45:46 GMT\nConnection: keep-alive\nKeep-Alive: timeout=5\n\n{\"id\":3,\"livro\":{\"id\":3,\"titulo\":\"Vidas Secas\",\"autor\":\"Graciliano Ramos\"},\"leitor\":{\"id\":3,\"nome\":\"Carla Mendes\"},\"dataEmprestimo\":\"2026-09-14\",\"dataLimite\":\"2026-09-21\",\"diasDeAtraso\":0,\"multa\":0}"
        },
        {
         "titulo": "Tente quebrar uma regra",
         "explicacao": "O livro 1, “Dom Casmurro”, já está emprestado. A regra R4 precisa impedir um novo empréstimo.",
         "observe": "<code>400 Bad Request</code> com a mensagem da <code>DominioException</code>: é essa mensagem que a tela vai mostrar ao usuário.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria",
         "comando": "curl -i -X POST http://localhost:8080/emprestimos -H \"Content-Type: application/json\" -d \"{\\\"livroId\\\":1,\\\"leitorId\\\":2}\"",
         "saida": "HTTP/1.1 400 Bad Request\nX-Powered-By: Express\nAccess-Control-Allow-Origin: *\nContent-Type: application/json; charset=utf-8\nContent-Length: 47\nETag: W/\"2f-hiRf0V6EOJETmdlOlRL0WJ7KKLI\"\nDate: Mon, 14 Sep 2026 23:45:46 GMT\nConnection: keep-alive\nKeep-Alive: timeout=5\n\n{\"mensagens\":[\"O livro já está emprestado.\"]}"
        },
        {
         "titulo": "Registre a devolução com atraso",
         "explicacao": "<code>PATCH</code> altera parte de um recurso: aqui, registra a devolução do empréstimo 1.",
         "observe": "<code>diasDeAtraso: 3</code> e <code>multa: 3</code>: as regras R1 e R2 funcionando de ponta a ponta, com dados vindos do banco.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria",
         "comando": "curl -i -X PATCH http://localhost:8080/emprestimos/1/devolucao",
         "saida": "HTTP/1.1 200 OK\nX-Powered-By: Express\nAccess-Control-Allow-Origin: *\nContent-Type: application/json; charset=utf-8\nContent-Length: 64\nETag: W/\"40-ZuwgeWfHetm/3Gb5CL/uSZqzQz4\"\nDate: Mon, 14 Sep 2026 23:45:46 GMT\nConnection: keep-alive\nKeep-Alive: timeout=5\n\n{\"id\":1,\"dataDevolucao\":\"2026-09-14\",\"diasDeAtraso\":3,\"multa\":3}"
        }
       ]
      },
      "java": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Liste os empréstimos em aberto",
         "explicacao": "Com a API rodando (<a href=\"#backend\">Etapa 4</a>) e o banco com os dados iniciais, abra outro terminal. Uma requisição <code>GET</code> só lê dados.",
         "observe": "<code>200 OK</code> e a lista em JSON: “Dom Casmurro” foi emprestado há 10 dias, então tem 3 dias de atraso e multa de R$ 3,00; “Capitães da Areia” está no prazo. As datas dependem do dia em que os dados foram carregados, porque <code>dados.sql</code> usa <code>CURDATE()</code>.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria",
         "comando": "curl -i http://localhost:8080/emprestimos",
         "saida": "HTTP/1.1 200 OK\nDate: Mon, 14 Sep 2026 23:45:55 GMT\nContent-Type: application/json\nContent-Length: 401\n\n[{\"id\":1,\"livro\":{\"id\":1,\"titulo\":\"Dom Casmurro\",\"autor\":\"Machado de Assis\"},\"leitor\":{\"id\":1,\"nome\":\"Ana Souza\"},\"dataEmprestimo\":\"2026-09-04\",\"dataLimite\":\"2026-09-11\",\"diasDeAtraso\":3,\"multa\":3.0},{\"id\":2,\"livro\":{\"id\":4,\"titulo\":\"Capitães da Areia\",\"autor\":\"Jorge Amado\"},\"leitor\":{\"id\":2,\"nome\":\"Bruno Lima\"},\"dataEmprestimo\":\"2026-09-12\",\"dataLimite\":\"2026-09-19\",\"diasDeAtraso\":0,\"multa\":0.0}]"
        },
        {
         "titulo": "Registre um empréstimo",
         "explicacao": "<code>-X POST</code> escolhe o método, <code>-H</code> informa que o corpo é JSON e <code>-d</code> envia o corpo. No Prompt de Comando, as aspas dentro do JSON precisam de <code>\\</code> antes.",
         "observe": "<code>201 Created</code>: o empréstimo foi criado e a resposta traz o <code>id</code> gerado pelo banco e a data limite.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria",
         "comando": "curl -i -X POST http://localhost:8080/emprestimos -H \"Content-Type: application/json\" -d \"{\\\"livroId\\\":3,\\\"leitorId\\\":3}\"",
         "saida": "HTTP/1.1 201 Created\nDate: Mon, 14 Sep 2026 23:45:55 GMT\nContent-Type: application/json\nContent-Length: 200\n\n{\"id\":3,\"livro\":{\"id\":3,\"titulo\":\"Vidas Secas\",\"autor\":\"Graciliano Ramos\"},\"leitor\":{\"id\":3,\"nome\":\"Carla Mendes\"},\"dataEmprestimo\":\"2026-09-14\",\"dataLimite\":\"2026-09-21\",\"diasDeAtraso\":0,\"multa\":0.0}"
        },
        {
         "titulo": "Tente quebrar uma regra",
         "explicacao": "O livro 1, “Dom Casmurro”, já está emprestado. A regra R4 precisa impedir um novo empréstimo.",
         "observe": "<code>400 Bad Request</code> com a mensagem da <code>DominioException</code>: é essa mensagem que a tela vai mostrar ao usuário.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria",
         "comando": "curl -i -X POST http://localhost:8080/emprestimos -H \"Content-Type: application/json\" -d \"{\\\"livroId\\\":1,\\\"leitorId\\\":2}\"",
         "saida": "HTTP/1.1 400 Bad Request\nDate: Mon, 14 Sep 2026 23:45:55 GMT\nContent-Type: application/json\nContent-Length: 47\n\n{\"mensagens\":[\"O livro já está emprestado.\"]}"
        },
        {
         "titulo": "Registre a devolução com atraso",
         "explicacao": "<code>PATCH</code> altera parte de um recurso: aqui, registra a devolução do empréstimo 1.",
         "observe": "<code>diasDeAtraso: 3</code> e <code>multa: 3</code>: as regras R1 e R2 funcionando de ponta a ponta, com dados vindos do banco.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria",
         "comando": "curl -i -X PATCH http://localhost:8080/emprestimos/1/devolucao",
         "saida": "HTTP/1.1 200 OK\nDate: Mon, 14 Sep 2026 23:45:55 GMT\nContent-Type: application/json\nContent-Length: 66\n\n{\"id\":1,\"dataDevolucao\":\"2026-09-14\",\"diasDeAtraso\":3,\"multa\":3.0}"
        }
       ]
      }
     }
    };

    Guia.dados.terminais[ "fetch.testes" ] = {
     "camada": "frontend",
     "variantes": {
      "typescript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Rode os testes do serviço",
         "explicacao": "<code>pnpm exec vitest run servico</code> roda só os arquivos de teste com “servico” no nome. Os testes não precisam da API: <code>vi.stubGlobal</code> troca o <code>fetch</code> por uma função falsa com a resposta pronta.",
         "observe": "Os três cenários do serviço passam: resposta com sucesso, resposta de erro com mensagens e API fora do ar.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\frontend",
         "comando": "pnpm exec vitest run servico --reporter=verbose",
         "saida": " RUN  v4.1.11 C:/projetos/biblioteca-comunitaria/frontend\n\n ✓ test/servico-emprestimos.spec.ts > ServicoEmprestimos > retorna os empréstimos enviados pela API 23ms\n ✓ test/servico-emprestimos.spec.ts > ServicoEmprestimos > lança erro com as mensagens da API quando a resposta é de erro 2ms\n ✓ test/servico-emprestimos.spec.ts > ServicoEmprestimos > lança erro explicativo quando a API está fora do ar 1ms\n\n Test Files  1 passed (1)\n      Tests  3 passed (3)\n   Start at  20:48:18\n   Duration  303ms (transform 37ms, setup 0ms, import 57ms, tests 27ms, environment 0ms)"
        }
       ]
      },
      "javascript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Rode os testes do serviço",
         "explicacao": "<code>pnpm exec vitest run servico</code> roda só os arquivos de teste com “servico” no nome. Os testes não precisam da API: <code>vi.stubGlobal</code> troca o <code>fetch</code> por uma função falsa com a resposta pronta.",
         "observe": "Os três cenários do serviço passam: resposta com sucesso, resposta de erro com mensagens e API fora do ar.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\frontend",
         "comando": "pnpm exec vitest run servico --reporter=verbose",
         "saida": " RUN  v4.1.11 C:/projetos/biblioteca-comunitaria/frontend\n\n ✓ test/servico-emprestimos.spec.js > ServicoEmprestimos > retorna os empréstimos enviados pela API 27ms\n ✓ test/servico-emprestimos.spec.js > ServicoEmprestimos > lança erro com as mensagens da API quando a resposta é de erro 2ms\n ✓ test/servico-emprestimos.spec.js > ServicoEmprestimos > lança erro explicativo quando a API está fora do ar 1ms\n\n Test Files  1 passed (1)\n      Tests  3 passed (3)\n   Start at  20:48:20\n   Duration  305ms (transform 30ms, setup 0ms, import 51ms, tests 32ms, environment 0ms)"
        }
       ]
      }
     }
    };

})( window.Guia );
