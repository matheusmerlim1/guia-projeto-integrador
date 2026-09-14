// Arquivo gerado por ferramentas/gerar-dados-projeto.cjs. Não edite à mão.
window.Guia.dados.projetos[ "raiz-php" ] = {
 "nome": "",
 "nota": "",
 "filhos": [
  {
   "nome": ".gitignore",
   "etapa": 1,
   "nota": "Lista o que o Git deve ignorar: dependências baixadas e arquivos gerados.",
   "codigo": "# Dependências baixadas pelos gerenciadores de pacotes: cada pessoa reinstala no próprio computador.\nnode_modules\nvendor\n\n# Arquivos gerados pelo build e pelos testes.\ndist\ntarget\ntest-results\nplaywright-report\ncoverage\n"
  },
  {
   "nome": "README.md",
   "etapa": 1,
   "nota": "Integrantes, passos para colocar o projeto em funcionamento, testes e referências.",
   "codigo": "# Biblioteca Comunitária\n\nIntegrantes: Ana Souza e Bruno Lima.\n\nAplicação para registrar os empréstimos e as devoluções de livros da Biblioteca Comunitária Cantinho da Leitura.\n\n## Requisitos\n\n- PHP 8.2 ou superior, com a extensão `pdo_mysql`, e Composer\n- MariaDB ou MySQL, com o usuário `root` e a senha `root`\n- Node.js 22 ou superior e PNPM\n\n## Como executar\n\n1. Crie o banco de dados com o arquivo backend/db/estrutura.sql.\n2. Instale as dependências do back-end e do front-end.\n\n```bash\ncd backend\ncomposer install\ncomposer db\ncomposer start\n```\n\nA API fica em http://localhost:8080. Em outro terminal:\n\n```bash\ncd frontend\npnpm install\npnpm dev\n```\n\nA aplicação fica em http://localhost:5173.\n\n## Testes\n\n| O que | Pasta | Comando |\n|---|---|---|\n| Testes do back-end (Kahlan) | `backend` | `composer test` |\n| Análise estática (PHPStan) | `backend` | `composer check` |\n| Testes do front-end (Vitest) | `frontend` | `pnpm test` |\n| Testes de ponta a ponta (Playwright) | `frontend` | `pnpm e2e` |\n\n- Os testes de integração do back-end recriam o banco com os dados de teste. Depois deles, rode `composer db` para voltar aos dados iniciais.\n- Os testes de ponta a ponta precisam da API rodando e do banco com os dados de teste: `composer db:e && composer db:t`.\n- Na primeira vez, instale o navegador do Playwright com `pnpm exec playwright install chromium`.\n\n## Referências\n\n- Bootstrap: https://getbootstrap.com — estilos da interface.\n- phputil/router e phputil/cors: https://packagist.org/packages/phputil/router — rotas da API.\n"
  }
 ]
};
