// Arquivo gerado a partir das saídas reais dos comandos. Não edite à mão.
(function ( Guia ) {
    'use strict';

    Guia.dados.terminais[ "frontend.instalar" ] = {
     "camada": "frontend",
     "variantes": {
      "typescript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Instale as dependências",
         "explicacao": "Na pasta <code>frontend</code>, <code>pnpm install</code> lê o <code>package.json</code> e baixa o Bootstrap e as ferramentas de desenvolvimento para <code>node_modules</code>.",
         "observe": "Em <code>dependencies</code> fica só o Bootstrap, que vai junto para o navegador. Em <code>devDependencies</code> ficam as ferramentas usadas apenas durante o desenvolvimento: TypeScript, Vite, Vitest e Playwright.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\frontend",
         "comando": "pnpm install",
         "saida": "Progress: resolved 1, reused 0, downloaded 0, added 0\nPackages: +51\n+++++++++++++++++++++++++++++++++++++++++++++++++++\nPackages are hard linked from the content-addressable store to the virtual store.\n  Content-addressable store is at: C:\\Users\\mathe\\AppData\\Local\\pnpm\\store\\v11\n  Virtual store is at:             node_modules/.pnpm\nProgress: resolved 95, reused 51, downloaded 0, added 20\nProgress: resolved 95, reused 51, downloaded 0, added 51, done\n\ndependencies:\n+ bootstrap 5.3.8\n\ndevDependencies:\n+ @playwright/test 1.63.0\n+ typescript 7.0.2\n+ vite 8.3.0\n+ vitest 4.1.11 (5.0.0 is available)\n\nDone in 1.8s using pnpm v11.24.0"
        }
       ]
      },
      "javascript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Instale as dependências",
         "explicacao": "Na pasta <code>frontend</code>, <code>pnpm install</code> lê o <code>package.json</code> e baixa o Bootstrap e as ferramentas de desenvolvimento para <code>node_modules</code>.",
         "observe": "Em <code>dependencies</code> fica só o Bootstrap, que vai junto para o navegador. Em <code>devDependencies</code> ficam as ferramentas usadas apenas durante o desenvolvimento: Vite, Vitest e Playwright. Não há TypeScript.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\frontend",
         "comando": "pnpm install",
         "saida": "Progress: resolved 1, reused 0, downloaded 0, added 0\nPackages: +49\n+++++++++++++++++++++++++++++++++++++++++++++++++\nPackages are hard linked from the content-addressable store to the virtual store.\n  Content-addressable store is at: C:\\Users\\mathe\\AppData\\Local\\pnpm\\store\\v11\n  Virtual store is at:             node_modules/.pnpm\nProgress: resolved 74, reused 49, downloaded 0, added 49, done\n\ndependencies:\n+ bootstrap 5.3.8\n\ndevDependencies:\n+ @playwright/test 1.63.0\n+ vite 8.3.0\n+ vitest 4.1.11 (5.0.0 is available)\n\nDone in 1.5s using pnpm v11.24.0"
        }
       ]
      }
     }
    };

    Guia.dados.terminais[ "frontend.iniciar" ] = {
     "camada": "frontend",
     "variantes": {
      "typescript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Inicie o servidor de desenvolvimento",
         "explicacao": "<code>pnpm dev</code> executa o Vite. Ele serve os arquivos do front-end e, a cada arquivo salvo, atualiza o navegador sozinho. O TypeScript é convertido para JavaScript na hora.",
         "observe": "O endereço <code>http://localhost:5173/</code>: abra-o no navegador. O terminal fica ocupado enquanto o Vite roda; para parar, use <kbd>Ctrl</kbd> + <kbd>C</kbd>. A API da <a href=\"#backend\">Etapa 4</a> precisa estar rodando em outro terminal.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\frontend",
         "comando": "pnpm dev",
         "saida": "$ vite\n\n  VITE v8.3.0  ready in 247 ms\n\n  ➜  Local:   http://localhost:5173/\n  ➜  Network: use --host to expose"
        }
       ]
      },
      "javascript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Inicie o servidor de desenvolvimento",
         "explicacao": "<code>pnpm dev</code> executa o Vite. Ele serve os arquivos do front-end e, a cada arquivo salvo, atualiza o navegador sozinho.",
         "observe": "O endereço <code>http://localhost:5173/</code>: abra-o no navegador. O terminal fica ocupado enquanto o Vite roda; para parar, use <kbd>Ctrl</kbd> + <kbd>C</kbd>. A API da <a href=\"#backend\">Etapa 4</a> precisa estar rodando em outro terminal.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\frontend",
         "comando": "pnpm dev",
         "saida": "$ vite\n\n  VITE v8.3.0  ready in 208 ms\n\n  ➜  Local:   http://localhost:5173/\n  ➜  Network: use --host to expose"
        }
       ]
      }
     }
    };

    Guia.dados.terminais[ "frontend.testes" ] = {
     "camada": "frontend",
     "variantes": {
      "typescript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Rode todos os testes de unidade",
         "explicacao": "<code>pnpm test</code> executa o script <code>vitest run test</code>, que roda os arquivos da pasta <code>test</code>. O <code>--reporter=verbose</code> mostra o nome de cada teste.",
         "observe": "<code>7 passed</code>: 3 testes do serviço e 4 da controladora. Nenhum deles precisa da API nem do navegador, por isso terminam em menos de um segundo.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\frontend",
         "comando": "pnpm test --reporter=verbose",
         "saida": "$ vitest run test \"--reporter=verbose\"\n\n RUN  v4.1.11 C:/projetos/biblioteca-comunitaria/frontend\n\n ✓ test/servico-emprestimos.spec.ts > ServicoEmprestimos > retorna os empréstimos enviados pela API 23ms\n ✓ test/servico-emprestimos.spec.ts > ServicoEmprestimos > lança erro com as mensagens da API quando a resposta é de erro 2ms\n ✓ test/servico-emprestimos.spec.ts > ServicoEmprestimos > lança erro explicativo quando a API está fora do ar 1ms\n ✓ test/controladora-emprestimos.spec.ts > ControladoraEmprestimos > exibe as opções e os empréstimos ao iniciar 4ms\n ✓ test/controladora-emprestimos.spec.ts > ControladoraEmprestimos > exibe o empréstimo registrado e atualiza a lista 1ms\n ✓ test/controladora-emprestimos.spec.ts > ControladoraEmprestimos > exibe a mensagem da API quando o registro falha 1ms\n ✓ test/controladora-emprestimos.spec.ts > ControladoraEmprestimos > exibe a devolução com a multa 1ms\n\n Test Files  2 passed (2)\n      Tests  7 passed (7)\n   Start at  20:48:00\n   Duration  371ms (transform 59ms, setup 0ms, import 101ms, tests 36ms, environment 0ms)"
        }
       ]
      },
      "javascript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Rode todos os testes de unidade",
         "explicacao": "<code>pnpm test</code> executa o script <code>vitest run test</code>, que roda os arquivos da pasta <code>test</code>. O <code>--reporter=verbose</code> mostra o nome de cada teste.",
         "observe": "<code>7 passed</code>: 3 testes do serviço e 4 da controladora. Nenhum deles precisa da API nem do navegador, por isso terminam em menos de um segundo.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\frontend",
         "comando": "pnpm test --reporter=verbose",
         "saida": "$ vitest run test \"--reporter=verbose\"\n\n RUN  v4.1.11 C:/projetos/biblioteca-comunitaria/frontend\n\n ✓ test/controladora-emprestimos.spec.js > ControladoraEmprestimos > exibe as opções e os empréstimos ao iniciar 5ms\n ✓ test/controladora-emprestimos.spec.js > ControladoraEmprestimos > exibe o empréstimo registrado e atualiza a lista 1ms\n ✓ test/controladora-emprestimos.spec.js > ControladoraEmprestimos > exibe a mensagem da API quando o registro falha 1ms\n ✓ test/controladora-emprestimos.spec.js > ControladoraEmprestimos > exibe a devolução com a multa 1ms\n ✓ test/servico-emprestimos.spec.js > ServicoEmprestimos > retorna os empréstimos enviados pela API 25ms\n ✓ test/servico-emprestimos.spec.js > ServicoEmprestimos > lança erro com as mensagens da API quando a resposta é de erro 2ms\n ✓ test/servico-emprestimos.spec.js > ServicoEmprestimos > lança erro explicativo quando a API está fora do ar 1ms\n\n Test Files  2 passed (2)\n      Tests  7 passed (7)\n   Start at  20:48:05\n   Duration  313ms (transform 42ms, setup 0ms, import 86ms, tests 38ms, environment 0ms)"
        }
       ]
      }
     }
    };

    Guia.dados.terminais[ "frontend.preparar-e2e" ] = {
     "camada": "backend",
     "variantes": {
      "php": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Recrie o banco com os dados de teste",
         "explicacao": "Na pasta <code>backend</code>, <code>composer db:e</code> recria o banco e <code>composer db:t</code> carrega <code>db/dados-teste.sql</code>. O <code>&amp;&amp;</code> só executa o segundo comando se o primeiro der certo.",
         "observe": "Não aparece nada: os dois scripts rodaram sem erro. Com o MySQL, cada comando <code>mysql</code> também mostra <code>mysql: [Warning] Using a password on the command line interface can be insecure.</code>: é só um lembrete de segurança.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "composer db:e && composer db:t",
         "saida": ""
        }
       ]
      },
      "typescript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Recrie o banco com os dados de teste",
         "explicacao": "Na pasta <code>backend</code>, <code>pnpm db:e</code> recria o banco e <code>pnpm db:t</code> carrega <code>db/dados-teste.sql</code>. O <code>&amp;&amp;</code> só executa o segundo comando se o primeiro der certo.",
         "observe": "O PNPM mostra cada script executado, sem mensagens de erro. Com o MySQL, cada comando <code>mysql</code> também mostra <code>mysql: [Warning] Using a password on the command line interface can be insecure.</code>: é só um lembrete de segurança.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "pnpm db:e && pnpm db:t",
         "saida": "$ mysql -u root --password=root < db/estrutura.sql\n$ mysql -u root --password=root biblioteca < db/dados-teste.sql"
        }
       ]
      },
      "javascript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Recrie o banco com os dados de teste",
         "explicacao": "Na pasta <code>backend</code>, <code>pnpm db:e</code> recria o banco e <code>pnpm db:t</code> carrega <code>db/dados-teste.sql</code>. O <code>&amp;&amp;</code> só executa o segundo comando se o primeiro der certo.",
         "observe": "O PNPM mostra cada script executado, sem mensagens de erro. Com o MySQL, cada comando <code>mysql</code> também mostra <code>mysql: [Warning] Using a password on the command line interface can be insecure.</code>: é só um lembrete de segurança.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "pnpm db:e && pnpm db:t",
         "saida": "$ mysql -u root --password=root < db/estrutura.sql\n$ mysql -u root --password=root biblioteca < db/dados-teste.sql"
        }
       ]
      },
      "java": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Recrie o banco",
         "explicacao": "Na pasta <code>backend</code>, o mesmo comando da <a href=\"#banco\">Etapa 5</a> apaga e cria o banco.",
         "observe": "Não aparece nada: o script rodou sem erro. Com o MySQL, cada comando <code>mysql</code> também mostra <code>mysql: [Warning] Using a password on the command line interface can be insecure.</code>: é só um lembrete de segurança.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "mysql -u root --password=root < src\\main\\resources\\db\\estrutura.sql"
        },
        {
         "titulo": "Carregue os dados de teste",
         "explicacao": "Agora com <code>dados-teste.sql</code> no lugar de <code>dados.sql</code>.",
         "observe": "Não aparece nada: os dados de teste foram carregados.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\backend",
         "comando": "mysql -u root --password=root biblioteca < src\\main\\resources\\db\\dados-teste.sql"
        }
       ]
      }
     }
    };

    Guia.dados.terminais[ "frontend.e2e" ] = {
     "camada": "frontend",
     "variantes": {
      "typescript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Instale o navegador do Playwright",
         "explicacao": "O Playwright controla uma versão própria do Chromium. <code>pnpm exec playwright install chromium</code> baixa esse navegador; só é preciso fazer isso uma vez no computador.",
         "observe": "Na primeira vez, aparece o progresso do download. Neste computador o navegador já estava instalado, então nada foi mostrado.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\frontend",
         "comando": "pnpm exec playwright install chromium"
        },
        {
         "titulo": "Rode os testes de ponta a ponta",
         "explicacao": "Com a API rodando e o banco com os dados de teste, <code>pnpm e2e</code> executa <code>playwright test</code>. Pelo <code>webServer</code> do <code>playwright.config.ts</code>, o Playwright inicia o Vite sozinho, abre o navegador sem janela e faz cada cenário como um usuário faria.",
         "observe": "<code>[WebServer] $ vite</code> mostra o Vite sendo iniciado. Os três cenários do <code>.feature</code> passam, um por vez e na ordem do arquivo. Como os cenários alteram o banco (o primeiro empresta “O Cortiço”), recrie o banco com os dados de teste antes de rodar de novo; senão o primeiro cenário falha, porque o livro já estará emprestado.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\frontend",
         "comando": "pnpm e2e",
         "saida": "$ playwright test\n[WebServer] $ vite\n\nRunning 3 tests using 1 worker\n\n  ok 1 [chromium] › e2e\\emprestimos.spec.ts:16:5 › Empréstimo de livros › Registrar um empréstimo (392ms)\n  ok 2 [chromium] › e2e\\emprestimos.spec.ts:27:5 › Empréstimo de livros › Tentar emprestar um livro já emprestado (298ms)\n  ok 3 [chromium] › e2e\\emprestimos.spec.ts:33:5 › Empréstimo de livros › Devolver um livro emprestado (278ms)\n\n  3 passed (3.9s)"
        }
       ]
      },
      "javascript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Instale o navegador do Playwright",
         "explicacao": "O Playwright controla uma versão própria do Chromium. <code>pnpm exec playwright install chromium</code> baixa esse navegador; só é preciso fazer isso uma vez no computador.",
         "observe": "Na primeira vez, aparece o progresso do download. Neste computador o navegador já estava instalado, então nada foi mostrado.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\frontend",
         "comando": "pnpm exec playwright install chromium"
        },
        {
         "titulo": "Rode os testes de ponta a ponta",
         "explicacao": "Com a API rodando e o banco com os dados de teste, <code>pnpm e2e</code> executa <code>playwright test</code>. Pelo <code>webServer</code> do <code>playwright.config.js</code>, o Playwright inicia o Vite sozinho, abre o navegador sem janela e faz cada cenário como um usuário faria.",
         "observe": "<code>[WebServer] $ vite</code> mostra o Vite sendo iniciado. Os três cenários do <code>.feature</code> passam, um por vez e na ordem do arquivo. Como os cenários alteram o banco (o primeiro empresta “O Cortiço”), recrie o banco com os dados de teste antes de rodar de novo; senão o primeiro cenário falha, porque o livro já estará emprestado.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\frontend",
         "comando": "pnpm e2e",
         "saida": "$ playwright test\n[WebServer] $ vite\n\nRunning 3 tests using 1 worker\n\n  ok 1 [chromium] › e2e\\emprestimos.spec.js:16:5 › Empréstimo de livros › Registrar um empréstimo (383ms)\n  ok 2 [chromium] › e2e\\emprestimos.spec.js:27:5 › Empréstimo de livros › Tentar emprestar um livro já emprestado (302ms)\n  ok 3 [chromium] › e2e\\emprestimos.spec.js:33:5 › Empréstimo de livros › Devolver um livro emprestado (283ms)\n\n  3 passed (2.9s)"
        }
       ]
      }
     }
    };

    Guia.dados.terminais[ "frontend.build" ] = {
     "camada": "frontend",
     "variantes": {
      "typescript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Gere a versão de produção",
         "explicacao": "<code>pnpm build</code> executa <code>tsc &amp;&amp; vite build</code>: primeiro o <code>tsc</code> confere os tipos de todo o código (se houver erro, para aqui), depois o Vite junta e reduz os arquivos na pasta <code>dist</code>.",
         "observe": "A pasta <code>dist</code> tem só três arquivos: o HTML, um CSS com o Bootstrap e os estilos próprios, e um JavaScript com todo o código. É essa pasta que vai para um servidor. Ela está no <code>.gitignore</code>, porque pode ser gerada de novo a qualquer momento.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\frontend",
         "comando": "pnpm build",
         "saida": "$ tsc && vite build\nvite v8.3.0 building client environment for production...\ntransforming...\n✓ 13 modules transformed.\nrendering chunks...\ncomputing gzip size...\ndist/index.html                   0.95 kB │ gzip:  0.53 kB\ndist/assets/index-D8_5V0gE.css  230.20 kB │ gzip: 30.78 kB\ndist/assets/index-D30mVHxW.js     7.10 kB │ gzip:  2.69 kB\n\n✓ built in 316ms"
        }
       ]
      },
      "javascript": {
       "titulo": "Prompt de Comando",
       "entradas": [
        {
         "titulo": "Gere a versão de produção",
         "explicacao": "<code>pnpm build</code> executa <code>vite build</code>, que junta e reduz os arquivos na pasta <code>dist</code>.",
         "observe": "A pasta <code>dist</code> tem só três arquivos: o HTML, um CSS com o Bootstrap e os estilos próprios, e um JavaScript com todo o código. É essa pasta que vai para um servidor. Ela está no <code>.gitignore</code>, porque pode ser gerada de novo a qualquer momento.",
         "pasta": "C:\\projetos\\biblioteca-comunitaria\\frontend",
         "comando": "pnpm build",
         "saida": "$ vite build\nvite v8.3.0 building client environment for production...\ntransforming...\n✓ 13 modules transformed.\nrendering chunks...\ncomputing gzip size...\ndist/index.html                   0.95 kB │ gzip:  0.54 kB\ndist/assets/index-D8_5V0gE.css  230.20 kB │ gzip: 30.78 kB\ndist/assets/index-DVL3OS--.js     6.96 kB │ gzip:  2.64 kB\n\n✓ built in 270ms"
        }
       ]
      }
     }
    };

})( window.Guia );
