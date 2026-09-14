// Arquivo gerado por ferramentas/gerar-dados-projeto.cjs. Não edite à mão.
window.Guia.dados.projetos[ "frontend-typescript" ] = {
 "nome": "frontend/",
 "nota": "Aplicação web em TypeScript com Vite",
 "filhos": [
  {
   "nome": "e2e/",
   "filhos": [
    {
     "nome": "pom/",
     "filhos": [
      {
       "nome": "TelaEmprestimos.ts",
       "etapa": 6,
       "nota": "Page Object: ações e verificações da tela usadas nos testes.",
       "codigo": "import { expect, type Page } from '@playwright/test';\n\n/**\n * Page Object: reúne em métodos com nomes do negócio tudo o que o teste faz na tela.\n * Se o HTML mudar, só esta classe precisa ser ajustada; os testes continuam iguais.\n */\nexport class TelaEmprestimos {\n\n    /**\n     * Construtor: recebe a página do navegador controlada pelo Playwright.\n     */\n    constructor( private readonly page: Page ) {\n    }\n\n    async abrir(): Promise<void> {\n        await this.page.goto( '/emprestimos' );\n        // Espera as opções chegarem da API antes de continuar.\n        await expect( this.page.locator( '#livro option' ).nth( 1 ) ).toBeAttached();\n    }\n\n    async escolher( livro: string, leitor: string ): Promise<void> {\n        await this.page.selectOption( '#livro', { label: livro } );\n        await this.page.selectOption( '#leitor', { label: leitor } );\n    }\n\n    async acionarRegistrar(): Promise<void> {\n        await this.page.click( '#registrar' );\n    }\n\n    async acionarDevolverDo( livro: string ): Promise<void> {\n        const linha = this.page.locator( '#emprestimos tr', { hasText: livro } );\n        await linha.getByRole( 'button', { name: 'Devolver' } ).click();\n    }\n\n    async devoVerMensagem( texto: string ): Promise<void> {\n        await expect( this.page.locator( '#mensagem' ) ).toContainText( texto );\n    }\n\n    async devoVerNaLista( livro: string ): Promise<void> {\n        await expect( this.page.locator( '#emprestimos' ) ).toContainText( livro );\n    }\n\n    async naoDevoVerNaLista( livro: string ): Promise<void> {\n        await expect( this.page.locator( '#emprestimos' ) ).not.toContainText( livro );\n    }\n}\n"
      }
     ]
    },
    {
     "nome": "emprestimos.spec.ts",
     "etapa": 6,
     "nota": "Testes de ponta a ponta com Playwright, um para cada cenário do .feature.",
     "codigo": "import { test } from '@playwright/test';\nimport { TelaEmprestimos } from './pom/TelaEmprestimos';\n\n// Pré-requisitos: a API rodando e o banco carregado com db/dados-teste.sql.\n// Os testes rodam na ordem em que aparecem, porque cada um altera os dados do banco.\ntest.describe( 'Empréstimo de livros', () => {\n\n    let tela: TelaEmprestimos;\n\n    test.beforeEach( async ( { page } ) => {\n        // Dado que estou na tela de empréstimos\n        tela = new TelaEmprestimos( page );\n        await tela.abrir();\n    } );\n\n    test( 'Registrar um empréstimo', async () => {\n        // Quando escolho o livro \"O Cortiço\" e o leitor \"Bruno Lima\"\n        await tela.escolher( 'O Cortiço', 'Bruno Lima' );\n        // E aciono a opção Registrar\n        await tela.acionarRegistrar();\n        // Então vejo a mensagem \"Empréstimo registrado\"\n        await tela.devoVerMensagem( 'Empréstimo registrado' );\n        // E vejo \"O Cortiço\" na lista de empréstimos em aberto\n        await tela.devoVerNaLista( 'O Cortiço' );\n    } );\n\n    test( 'Tentar emprestar um livro já emprestado', async () => {\n        await tela.escolher( 'Dom Casmurro', 'Bruno Lima' );\n        await tela.acionarRegistrar();\n        await tela.devoVerMensagem( 'O livro já está emprestado.' );\n    } );\n\n    test( 'Devolver um livro emprestado', async () => {\n        await tela.acionarDevolverDo( 'Dom Casmurro' );\n        await tela.devoVerMensagem( 'Livro devolvido' );\n        await tela.naoDevoVerNaLista( 'Dom Casmurro' );\n    } );\n\n} );\n"
    }
   ]
  },
  {
   "nome": "feature/",
   "filhos": [
    {
     "nome": "emprestimo.feature",
     "etapa": 6,
     "nota": "Cenários da funcionalidade escritos em Gherkin.",
     "codigo": "# language: pt\n# Cenários escritos em Gherkin: descrevem o comportamento esperado em linguagem natural.\n# Cada cenário vira um teste de ponta a ponta em e2e/emprestimos.spec.ts.\n\nFuncionalidade: Empréstimo de livros\n  Como atendente da biblioteca\n  Quero registrar empréstimos e devoluções\n  Para saber quais livros estão com os leitores e cobrar os atrasos\n\n  Cenário: Registrar um empréstimo\n    Dado que estou na tela de empréstimos\n    Quando escolho o livro \"O Cortiço\" e o leitor \"Bruno Lima\"\n    E aciono a opção Registrar\n    Então vejo a mensagem \"Empréstimo registrado\"\n    E vejo \"O Cortiço\" na lista de empréstimos em aberto\n\n  Cenário: Tentar emprestar um livro já emprestado\n    Dado que estou na tela de empréstimos\n    Quando escolho o livro \"Dom Casmurro\" e o leitor \"Bruno Lima\"\n    E aciono a opção Registrar\n    Então vejo a mensagem \"O livro já está emprestado.\"\n\n  Cenário: Devolver um livro emprestado\n    Dado que estou na tela de empréstimos\n    Quando aciono a opção Devolver do livro \"Dom Casmurro\"\n    Então vejo a mensagem \"Livro devolvido\"\n    E não vejo \"Dom Casmurro\" na lista de empréstimos em aberto\n"
    }
   ]
  },
  {
   "nome": "pages/",
   "filhos": [
    {
     "nome": "404.html",
     "etapa": 6,
     "nota": "Página exibida quando o endereço não existe.",
     "codigo": "<!-- Exibida quando o endereço digitado não corresponde a nenhuma página. -->\n<section class=\"text-center py-5\">\n    <h1 class=\"display-5\">Página não encontrada</h1>\n    <p class=\"lead\">O endereço digitado não existe.</p>\n    <a class=\"btn btn-success\" href=\"/emprestimos\">Ir para os empréstimos</a>\n</section>\n"
    },
    {
     "nome": "emprestimos.html",
     "etapa": 6,
     "nota": "HTML da tela de empréstimos: formulário e tabela.",
     "codigo": "<!-- Conteúdo da tela de empréstimos. As classes (card, form-select, table...) são do Bootstrap. -->\n<section>\n    <h1 class=\"h3 mb-3\">Empréstimos</h1>\n\n    <!-- Área de mensagens: fica escondida (d-none) até a visão exibir algo. -->\n    <div id=\"mensagem\" class=\"alert d-none\" role=\"status\"></div>\n\n    <form id=\"form-emprestimo\" class=\"card card-body mb-4\">\n        <h2 class=\"h5 mb-3\">Novo empréstimo</h2>\n        <div class=\"row g-3 align-items-end\">\n            <div class=\"col-md-5\">\n                <label for=\"livro\" class=\"form-label\">Livro</label>\n                <select id=\"livro\" class=\"form-select\" required></select>\n            </div>\n            <div class=\"col-md-5\">\n                <label for=\"leitor\" class=\"form-label\">Leitor</label>\n                <select id=\"leitor\" class=\"form-select\" required></select>\n            </div>\n            <div class=\"col-md-2\">\n                <button id=\"registrar\" type=\"submit\" class=\"btn btn-success w-100\">Registrar</button>\n            </div>\n        </div>\n    </form>\n\n    <h2 class=\"h5\">Em aberto</h2>\n    <div class=\"table-responsive\">\n        <table class=\"table align-middle\">\n            <thead>\n                <tr>\n                    <th>Livro</th>\n                    <th>Leitor</th>\n                    <th>Emprestado em</th>\n                    <th>Devolver até</th>\n                    <th>Situação</th>\n                    <th class=\"text-end\">Multa</th>\n                    <th></th>\n                </tr>\n            </thead>\n            <tbody id=\"emprestimos\"></tbody>\n        </table>\n    </div>\n    <p id=\"vazio\" class=\"text-body-secondary d-none\">Nenhum empréstimo em aberto.</p>\n</section>\n"
    }
   ]
  },
  {
   "nome": "src/",
   "filhos": [
    {
     "nome": "emprestimo/",
     "filhos": [
      {
       "nome": "controladora-emprestimos.ts",
       "etapa": 6,
       "nota": "Controladora: recebe as ações da visão, usa o serviço e manda a visão exibir o resultado.",
       "codigo": "import type { ServicoEmprestimos } from './servico-emprestimos';\nimport type { VisaoEmprestimos } from './visao-emprestimos';\n\n/**\n * Controladora: liga a visão ao serviço.\n * Recebe as ações do usuário pela visão, chama o serviço e manda a visão exibir o resultado.\n * Não mexe no HTML diretamente, por isso pode ser testada sem navegador.\n */\nexport class ControladoraEmprestimos {\n\n    /**\n     * Construtor: recebe a visão e o serviço prontos, em vez de criá-los.\n     */\n    constructor(\n        private readonly visao: VisaoEmprestimos,\n        private readonly servico: ServicoEmprestimos,\n    ) {\n    }\n\n    /**\n     * Liga os eventos da tela e carrega os dados iniciais.\n     */\n    async iniciar(): Promise<void> {\n        this.visao.aoRegistrar( ( livroId, leitorId ) => this.registrar( livroId, leitorId ) );\n        this.visao.aoDevolver( id => this.devolver( id ) );\n        try {\n            // Promise.all faz as duas requisições ao mesmo tempo e espera ambas terminarem.\n            const [ livros, leitores ] = await Promise.all( [\n                this.servico.listarLivros(),\n                this.servico.listarLeitores(),\n            ] );\n            this.visao.exibirOpcoes( livros, leitores );\n            await this.atualizarLista();\n        } catch ( erro ) {\n            this.visao.exibirErro( mensagemDoErro( erro ) );\n        }\n    }\n\n    async registrar( livroId: number, leitorId: number ): Promise<void> {\n        try {\n            const emprestimo = await this.servico.registrar( livroId, leitorId );\n            this.visao.exibirEmprestimoRegistrado( emprestimo );\n            await this.atualizarLista();\n        } catch ( erro ) {\n            this.visao.exibirErro( mensagemDoErro( erro ) );\n        }\n    }\n\n    async devolver( id: number ): Promise<void> {\n        try {\n            const devolucao = await this.servico.devolver( id );\n            this.visao.exibirDevolucao( devolucao );\n            await this.atualizarLista();\n        } catch ( erro ) {\n            this.visao.exibirErro( mensagemDoErro( erro ) );\n        }\n    }\n\n    private async atualizarLista(): Promise<void> {\n        this.visao.exibirEmprestimos( await this.servico.listarEmAberto() );\n    }\n}\n\n/**\n * Extrai o texto de um erro. Em TypeScript, o valor capturado no catch tem tipo desconhecido.\n */\nfunction mensagemDoErro( erro: unknown ): string {\n    return erro instanceof Error ? erro.message : 'Erro inesperado.';\n}\n"
      },
      {
       "nome": "emprestimo.ts",
       "etapa": 5,
       "nota": "Tipos com o formato dos dados recebidos da API.",
       "codigo": "/**\n * Tipos com o formato dos dados que a API envia.\n * No front-end não há regras de negócio: elas ficam no back-end.\n */\n\nexport type Livro = {\n    id: number;\n    titulo: string;\n    autor: string;\n    ano: number;\n};\n\nexport type Leitor = {\n    id: number;\n    nome: string;\n    telefone: string;\n};\n\nexport type Emprestimo = {\n    id: number;\n    livro: { id: number; titulo: string; autor: string };\n    leitor: { id: number; nome: string };\n    dataEmprestimo: string;\n    dataLimite: string;\n    diasDeAtraso: number;\n    multa: number;\n};\n\nexport type Devolucao = {\n    id: number;\n    dataDevolucao: string;\n    diasDeAtraso: number;\n    multa: number;\n};\n"
      },
      {
       "nome": "servico-emprestimos.ts",
       "etapa": 5,
       "nota": "Chamadas fetch para a API de empréstimos, livros e leitores.",
       "codigo": "import { API } from '../infra/conf';\nimport type { Devolucao, Emprestimo, Leitor, Livro } from './emprestimo';\n\n/**\n * Serviço: conversa com a API usando fetch.\n * Não sabe nada da tela; só envia requisições e devolve os dados ou lança erros.\n */\nexport class ServicoEmprestimos {\n\n    listarEmAberto(): Promise<Emprestimo[]> {\n        return this.requisitar( '/emprestimos' );\n    }\n\n    listarLivros(): Promise<Livro[]> {\n        return this.requisitar( '/livros' );\n    }\n\n    listarLeitores(): Promise<Leitor[]> {\n        return this.requisitar( '/leitores' );\n    }\n\n    registrar( livroId: number, leitorId: number ): Promise<Emprestimo> {\n        return this.requisitar( '/emprestimos', {\n            method: 'POST',\n            // JSON.stringify converte o objeto no texto JSON enviado no corpo da requisição.\n            body: JSON.stringify( { livroId, leitorId } ),\n        } );\n    }\n\n    devolver( id: number ): Promise<Devolucao> {\n        return this.requisitar( '/emprestimos/' + id + '/devolucao', { method: 'PATCH' } );\n    }\n\n    /**\n     * Faz a requisição e trata os erros em um só lugar.\n     * <T> é um tipo genérico: quem chama diz qual tipo de dado espera receber.\n     */\n    private async requisitar<T>( caminho: string, opcoes: RequestInit = {} ): Promise<T> {\n        let resposta: Response;\n        try {\n            resposta = await fetch( API + caminho, {\n                ...opcoes,\n                headers: { 'Content-Type': 'application/json' },\n            } );\n        } catch {\n            // fetch só falha assim quando não consegue chegar ao servidor.\n            throw new Error( 'Não foi possível conectar à API. Verifique se o back-end está rodando.' );\n        }\n\n        // Se o corpo não for JSON, usa um objeto vazio no lugar.\n        const corpo = await resposta.json().catch( () => ( {} ) );\n        if ( ! resposta.ok ) {\n            // resposta.ok é false para códigos de erro, como 400 e 500.\n            const mensagens: string[] = corpo.mensagens ?? [ 'Erro ao comunicar com a API.' ];\n            throw new Error( mensagens.join( ' ' ) );\n        }\n        return corpo as T;\n    }\n}\n"
      },
      {
       "nome": "visao-emprestimos-em-html.ts",
       "etapa": 6,
       "nota": "Implementação da visão que manipula o HTML.",
       "codigo": "import type { Devolucao, Emprestimo, Leitor, Livro } from './emprestimo';\nimport type { VisaoEmprestimos } from './visao-emprestimos';\n\n/**\n * Implementação da visão que manipula o HTML da página.\n * É a única classe que conhece os ids e as classes CSS da tela.\n */\nexport class VisaoEmprestimosEmHtml implements VisaoEmprestimos {\n\n    private readonly formulario: HTMLFormElement;\n    private readonly campoLivro: HTMLSelectElement;\n    private readonly campoLeitor: HTMLSelectElement;\n    private readonly corpoTabela: HTMLTableSectionElement;\n    private readonly mensagem: HTMLElement;\n    private readonly avisoVazio: HTMLElement;\n\n    /**\n     * Construtor: localiza os elementos uma única vez, dentro da área da página.\n     * O \"!\" diz ao TypeScript que o elemento com certeza existe no HTML.\n     */\n    constructor( raiz: HTMLElement ) {\n        this.formulario = raiz.querySelector<HTMLFormElement>( '#form-emprestimo' )!;\n        this.campoLivro = raiz.querySelector<HTMLSelectElement>( '#livro' )!;\n        this.campoLeitor = raiz.querySelector<HTMLSelectElement>( '#leitor' )!;\n        this.corpoTabela = raiz.querySelector<HTMLTableSectionElement>( '#emprestimos' )!;\n        this.mensagem = raiz.querySelector<HTMLElement>( '#mensagem' )!;\n        this.avisoVazio = raiz.querySelector<HTMLElement>( '#vazio' )!;\n    }\n\n    aoRegistrar( funcao: ( livroId: number, leitorId: number ) => void ): void {\n        this.formulario.addEventListener( 'submit', evento => {\n            // Impede o envio padrão do formulário, que recarregaria a página.\n            evento.preventDefault();\n            funcao( Number( this.campoLivro.value ), Number( this.campoLeitor.value ) );\n        } );\n    }\n\n    aoDevolver( funcao: ( id: number ) => void ): void {\n        // Um único evento na tabela atende todos os botões, inclusive os criados depois.\n        this.corpoTabela.addEventListener( 'click', evento => {\n            const botao = ( evento.target as HTMLElement ).closest<HTMLButtonElement>( 'button[data-id]' );\n            if ( botao ) {\n                funcao( Number( botao.dataset.id ) );\n            }\n        } );\n    }\n\n    exibirOpcoes( livros: Livro[], leitores: Leitor[] ): void {\n        this.preencherLista( this.campoLivro, 'Escolha um livro', livros.map( livro => [ livro.id, livro.titulo ] ) );\n        this.preencherLista( this.campoLeitor, 'Escolha um leitor', leitores.map( leitor => [ leitor.id, leitor.nome ] ) );\n    }\n\n    exibirEmprestimos( emprestimos: Emprestimo[] ): void {\n        this.corpoTabela.replaceChildren( ...emprestimos.map( emprestimo => this.criarLinha( emprestimo ) ) );\n        this.avisoVazio.classList.toggle( 'd-none', emprestimos.length > 0 );\n    }\n\n    exibirEmprestimoRegistrado( emprestimo: Emprestimo ): void {\n        this.exibirMensagem( 'Empréstimo registrado. Devolver até ' + formatarData( emprestimo.dataLimite ) + '.', 'success' );\n        this.formulario.reset();\n    }\n\n    exibirDevolucao( devolucao: Devolucao ): void {\n        const texto = devolucao.multa > 0\n            ? 'Livro devolvido com ' + devolucao.diasDeAtraso + ' dia(s) de atraso. Multa: ' + formatarMoeda( devolucao.multa ) + '.'\n            : 'Livro devolvido dentro do prazo.';\n        this.exibirMensagem( texto, 'success' );\n    }\n\n    exibirErro( mensagem: string ): void {\n        this.exibirMensagem( mensagem, 'danger' );\n    }\n\n    private exibirMensagem( texto: string, tipo: 'success' | 'danger' ): void {\n        this.mensagem.textContent = texto;\n        this.mensagem.className = 'alert alert-' + tipo;\n    }\n\n    /**\n     * Recria as opções de um <select>, começando por uma opção vazia.\n     */\n    private preencherLista( campo: HTMLSelectElement, textoInicial: string, opcoes: [ number, string ][] ): void {\n        const inicial = new Option( textoInicial, '' );\n        campo.replaceChildren( inicial, ...opcoes.map( ( [ valor, texto ] ) => new Option( texto, String( valor ) ) ) );\n    }\n\n    /**\n     * Cria a linha da tabela. textContent é usado no lugar de innerHTML\n     * para que nenhum texto vindo da API seja interpretado como HTML.\n     */\n    private criarLinha( emprestimo: Emprestimo ): HTMLTableRowElement {\n        const linha = document.createElement( 'tr' );\n        const atrasado = emprestimo.diasDeAtraso > 0;\n        linha.classList.toggle( 'linha-atrasada', atrasado );\n\n        const celulaLivro = document.createElement( 'td' );\n        const autor = document.createElement( 'span' );\n        autor.className = 'autor-livro';\n        autor.textContent = emprestimo.livro.autor;\n        celulaLivro.append( emprestimo.livro.titulo, autor );\n\n        const situacao = document.createElement( 'span' );\n        situacao.className = atrasado ? 'badge text-bg-danger' : 'badge text-bg-success';\n        situacao.textContent = atrasado ? emprestimo.diasDeAtraso + ' dia(s) de atraso' : 'No prazo';\n\n        const botao = document.createElement( 'button' );\n        botao.type = 'button';\n        botao.className = 'btn btn-outline-secondary btn-sm';\n        botao.dataset.id = String( emprestimo.id );\n        botao.textContent = 'Devolver';\n\n        linha.append(\n            celulaLivro,\n            this.criarCelula( emprestimo.leitor.nome ),\n            this.criarCelula( formatarData( emprestimo.dataEmprestimo ) ),\n            this.criarCelula( formatarData( emprestimo.dataLimite ) ),\n            this.criarCelula( situacao ),\n            this.criarCelula( formatarMoeda( emprestimo.multa ), 'text-end' ),\n            this.criarCelula( botao, 'text-end' ),\n        );\n        return linha;\n    }\n\n    private criarCelula( conteudo: string | HTMLElement, classe = '' ): HTMLTableCellElement {\n        const celula = document.createElement( 'td' );\n        celula.className = classe;\n        celula.append( conteudo );\n        return celula;\n    }\n}\n\n/**\n * Converte \"2026-09-01\" em \"01/09/2026\".\n */\nfunction formatarData( texto: string ): string {\n    const [ ano, mes, dia ] = texto.split( '-' );\n    return dia + '/' + mes + '/' + ano;\n}\n\n/**\n * Formata um número como moeda brasileira: 3 vira \"R$ 3,00\".\n */\nfunction formatarMoeda( valor: number ): string {\n    return valor.toLocaleString( 'pt-BR', { style: 'currency', currency: 'BRL' } );\n}\n"
      },
      {
       "nome": "visao-emprestimos.ts",
       "etapa": 6,
       "nota": "Interface da visão: o que a tela sabe fazer.",
       "codigo": "import type { Devolucao, Emprestimo, Leitor, Livro } from './emprestimo';\n\n/**\n * Interface da visão: lista o que a tela sabe fazer, sem dizer como.\n * A controladora conversa só com esta interface. Nos testes, uma visão falsa a implementa,\n * e assim a controladora é testada sem navegador.\n */\nexport interface VisaoEmprestimos {\n\n    /**\n     * Guarda a função a ser chamada quando o usuário pedir para registrar um empréstimo.\n     */\n    aoRegistrar( funcao: ( livroId: number, leitorId: number ) => void ): void;\n\n    /**\n     * Guarda a função a ser chamada quando o usuário pedir para devolver um empréstimo.\n     */\n    aoDevolver( funcao: ( id: number ) => void ): void;\n\n    exibirOpcoes( livros: Livro[], leitores: Leitor[] ): void;\n\n    exibirEmprestimos( emprestimos: Emprestimo[] ): void;\n\n    exibirEmprestimoRegistrado( emprestimo: Emprestimo ): void;\n\n    exibirDevolucao( devolucao: Devolucao ): void;\n\n    exibirErro( mensagem: string ): void;\n}\n"
      }
     ]
    },
    {
     "nome": "infra/",
     "filhos": [
      {
       "nome": "conf.ts",
       "etapa": 5,
       "nota": "Endereço da API.",
       "codigo": "/**\n * Endereço da API. Se o back-end mudar de porta ou de servidor, basta alterar aqui.\n */\nexport const API = 'http://localhost:8080';\n"
      },
      {
       "nome": "spa.ts",
       "etapa": 6,
       "nota": "Exibe o HTML de uma página sem recarregar o navegador.",
       "codigo": "/**\n * Exibe o HTML de uma página dentro do elemento de destino, sem recarregar o navegador.\n * É assim que uma aplicação de página única (SPA) troca de tela.\n */\nexport function exibirPagina( destino: HTMLElement, html: string, titulo: string ): void {\n    destino.innerHTML = html;\n    document.title = titulo + ' | Cantinho da Leitura';\n}\n"
      }
     ]
    },
    {
     "nome": "index.ts",
     "etapa": 6,
     "nota": "Ponto de entrada: escolhe a página pelo endereço e monta visão, serviço e controladora.",
     "codigo": "// Estilos: primeiro o Bootstrap, depois os estilos próprios, que podem sobrescrevê-lo.\nimport 'bootstrap/dist/css/bootstrap.min.css';\nimport '../style/emprestimos.css';\n\n// \"?raw\" faz o Vite importar o arquivo HTML como texto.\nimport html404 from '../pages/404.html?raw';\nimport htmlEmprestimos from '../pages/emprestimos.html?raw';\n\nimport { ControladoraEmprestimos } from './emprestimo/controladora-emprestimos';\nimport { ServicoEmprestimos } from './emprestimo/servico-emprestimos';\nimport { VisaoEmprestimosEmHtml } from './emprestimo/visao-emprestimos-em-html';\nimport { exibirPagina } from './infra/spa';\n\n/**\n * Escolhe a página de acordo com o endereço e monta visão, serviço e controladora.\n */\nasync function iniciar(): Promise<void> {\n    const conteudo = document.getElementById( 'conteudo' )!;\n    const rota = location.pathname;\n\n    if ( rota === '/' || rota === '/emprestimos' ) {\n        exibirPagina( conteudo, htmlEmprestimos, 'Empréstimos' );\n        const controladora = new ControladoraEmprestimos( new VisaoEmprestimosEmHtml( conteudo ), new ServicoEmprestimos() );\n        await controladora.iniciar();\n    } else {\n        exibirPagina( conteudo, html404, 'Página não encontrada' );\n    }\n}\n\niniciar();\n"
    }
   ]
  },
  {
   "nome": "style/",
   "filhos": [
    {
     "nome": "emprestimos.css",
     "etapa": 6,
     "nota": "Estilos próprios da aplicação, somados aos do Bootstrap.",
     "codigo": "/* Estilos próprios da aplicação, somados aos do Bootstrap. */\n\n/* Cor do cabeçalho, com a identidade da biblioteca. */\n.cabecalho-app {\n    background-color: #0f6e6e;\n}\n\n/* Destaca as linhas dos empréstimos atrasados. */\n.linha-atrasada > td {\n    background-color: #fdecea;\n}\n\n/* Autor do livro em letra menor, abaixo do título. */\n.autor-livro {\n    display: block;\n    font-size: 0.85em;\n    color: #6c757d;\n}\n"
    }
   ]
  },
  {
   "nome": "test/",
   "filhos": [
    {
     "nome": "controladora-emprestimos.spec.ts",
     "etapa": 6,
     "nota": "Testes da controladora com uma visão falsa, com Vitest.",
     "codigo": "import { beforeEach, describe, expect, it, vi } from 'vitest';\nimport { ControladoraEmprestimos } from '../src/emprestimo/controladora-emprestimos';\nimport type { Emprestimo } from '../src/emprestimo/emprestimo';\nimport { ServicoEmprestimos } from '../src/emprestimo/servico-emprestimos';\nimport type { VisaoEmprestimos } from '../src/emprestimo/visao-emprestimos';\n\n/**\n * Visão falsa: implementa a interface sem HTML.\n * vi.fn() cria funções que registram como foram chamadas, para conferir nos testes.\n */\nclass VisaoFalsa implements VisaoEmprestimos {\n    registrar: ( livroId: number, leitorId: number ) => void = () => {};\n    devolver: ( id: number ) => void = () => {};\n\n    aoRegistrar( funcao: ( livroId: number, leitorId: number ) => void ) { this.registrar = funcao; }\n    aoDevolver( funcao: ( id: number ) => void ) { this.devolver = funcao; }\n    exibirOpcoes = vi.fn();\n    exibirEmprestimos = vi.fn();\n    exibirEmprestimoRegistrado = vi.fn();\n    exibirDevolucao = vi.fn();\n    exibirErro = vi.fn();\n}\n\nconst emprestimo: Emprestimo = {\n    id: 1,\n    livro: { id: 1, titulo: 'Dom Casmurro', autor: 'Machado de Assis' },\n    leitor: { id: 1, nome: 'Ana Souza' },\n    dataEmprestimo: '2026-09-01',\n    dataLimite: '2026-09-08',\n    diasDeAtraso: 0,\n    multa: 0,\n};\n\ndescribe( ControladoraEmprestimos.name, () => {\n\n    let visao: VisaoFalsa;\n    let servico: ServicoEmprestimos;\n    let controladora: ControladoraEmprestimos;\n\n    beforeEach( () => {\n        visao = new VisaoFalsa();\n        servico = new ServicoEmprestimos();\n        // vi.spyOn troca o método real por um falso: nenhuma requisição é feita.\n        vi.spyOn( servico, 'listarLivros' ).mockResolvedValue( [] );\n        vi.spyOn( servico, 'listarLeitores' ).mockResolvedValue( [] );\n        vi.spyOn( servico, 'listarEmAberto' ).mockResolvedValue( [ emprestimo ] );\n        controladora = new ControladoraEmprestimos( visao, servico );\n    } );\n\n    it( 'exibe as opções e os empréstimos ao iniciar', async () => {\n        await controladora.iniciar();\n        expect( visao.exibirOpcoes ).toHaveBeenCalledWith( [], [] );\n        expect( visao.exibirEmprestimos ).toHaveBeenCalledWith( [ emprestimo ] );\n    } );\n\n    it( 'exibe o empréstimo registrado e atualiza a lista', async () => {\n        vi.spyOn( servico, 'registrar' ).mockResolvedValue( emprestimo );\n        await controladora.registrar( 1, 1 );\n        expect( visao.exibirEmprestimoRegistrado ).toHaveBeenCalledWith( emprestimo );\n        expect( visao.exibirEmprestimos ).toHaveBeenCalled();\n    } );\n\n    it( 'exibe a mensagem da API quando o registro falha', async () => {\n        vi.spyOn( servico, 'registrar' ).mockRejectedValue( new Error( 'O livro já está emprestado.' ) );\n        await controladora.registrar( 1, 2 );\n        expect( visao.exibirErro ).toHaveBeenCalledWith( 'O livro já está emprestado.' );\n    } );\n\n    it( 'exibe a devolução com a multa', async () => {\n        const devolucao = { id: 1, dataDevolucao: '2026-09-11', diasDeAtraso: 3, multa: 3 };\n        vi.spyOn( servico, 'devolver' ).mockResolvedValue( devolucao );\n        await controladora.devolver( 1 );\n        expect( visao.exibirDevolucao ).toHaveBeenCalledWith( devolucao );\n    } );\n\n} );\n"
    },
    {
     "nome": "servico-emprestimos.spec.ts",
     "etapa": 5,
     "nota": "Testes do serviço com um fetch falso, com Vitest.",
     "codigo": "import { afterEach, describe, expect, it, vi } from 'vitest';\nimport { ServicoEmprestimos } from '../src/emprestimo/servico-emprestimos';\n\ndescribe( ServicoEmprestimos.name, () => {\n\n    afterEach( () => {\n        // Devolve o fetch original depois de cada teste.\n        vi.unstubAllGlobals();\n    } );\n\n    it( 'retorna os empréstimos enviados pela API', async () => {\n        // vi.stubGlobal troca o fetch do ambiente por uma função falsa com resposta pronta.\n        const fetchFalso = vi.fn().mockResolvedValue( new Response( JSON.stringify( [ { id: 1 } ] ), { status: 200 } ) );\n        vi.stubGlobal( 'fetch', fetchFalso );\n\n        const emprestimos = await new ServicoEmprestimos().listarEmAberto();\n\n        expect( emprestimos ).toEqual( [ { id: 1 } ] );\n        expect( fetchFalso ).toHaveBeenCalledWith( 'http://localhost:8080/emprestimos', expect.anything() );\n    } );\n\n    it( 'lança erro com as mensagens da API quando a resposta é de erro', async () => {\n        const corpo = JSON.stringify( { mensagens: [ 'O livro já está emprestado.' ] } );\n        vi.stubGlobal( 'fetch', vi.fn().mockResolvedValue( new Response( corpo, { status: 400 } ) ) );\n\n        await expect( new ServicoEmprestimos().registrar( 1, 2 ) ).rejects.toThrow( 'O livro já está emprestado.' );\n    } );\n\n    it( 'lança erro explicativo quando a API está fora do ar', async () => {\n        vi.stubGlobal( 'fetch', vi.fn().mockRejectedValue( new TypeError( 'Failed to fetch' ) ) );\n\n        await expect( new ServicoEmprestimos().listarLivros() ).rejects.toThrow( 'Não foi possível conectar à API' );\n    } );\n\n} );\n"
    }
   ]
  },
  {
   "nome": "index.html",
   "etapa": 6,
   "nota": "Casca da aplicação: cabeçalho, menu e a área onde as páginas são exibidas.",
   "codigo": "<!DOCTYPE html>\n<html lang=\"pt-BR\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Cantinho da Leitura</title>\n    <!-- O Vite carrega o TypeScript e o converte para JavaScript automaticamente. -->\n    <script type=\"module\" src=\"/src/index.ts\"></script>\n</head>\n<body>\n    <!-- Casca da aplicação: o cabeçalho fica fixo e cada página é exibida dentro de <main>. -->\n    <header class=\"cabecalho-app navbar navbar-dark mb-4\">\n        <div class=\"container\">\n            <a class=\"navbar-brand fw-semibold\" href=\"/\">Cantinho da Leitura</a>\n            <nav class=\"navbar-nav flex-row gap-3\">\n                <a class=\"nav-link\" href=\"/emprestimos\">Empréstimos</a>\n            </nav>\n        </div>\n    </header>\n\n    <main id=\"conteudo\" class=\"container pb-5\"></main>\n</body>\n</html>\n"
  },
  {
   "nome": "package.json",
   "etapa": 6,
   "nota": "Dependências (Bootstrap, Vite, Vitest, Playwright) e scripts: dev, build, test, e2e.",
   "codigo": "{\n  \"name\": \"biblioteca-frontend\",\n  \"version\": \"1.0.0\",\n  \"description\": \"Aplicação web da Biblioteca Comunitária\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"tsc && vite build\",\n    \"preview\": \"vite preview\",\n    \"test\": \"vitest run test\",\n    \"e2e\": \"playwright test\"\n  },\n  \"dependencies\": {\n    \"bootstrap\": \"^5.3.8\"\n  },\n  \"devDependencies\": {\n    \"@playwright/test\": \"^1.63.0\",\n    \"typescript\": \"^7.0.2\",\n    \"vite\": \"^8.3.0\",\n    \"vitest\": \"^4.1.11\"\n  }\n}\n"
  },
  {
   "nome": "playwright.config.ts",
   "etapa": 6,
   "nota": "Configuração dos testes de ponta a ponta.",
   "codigo": "import { defineConfig, devices } from '@playwright/test';\n\n/**\n * Configuração dos testes de ponta a ponta com Playwright.\n */\nexport default defineConfig( {\n    // Pasta com os testes.\n    testDir: './e2e',\n    // Um teste por vez e na ordem do arquivo, porque eles compartilham o mesmo banco de dados.\n    fullyParallel: false,\n    workers: 1,\n    use: {\n        // Com baseURL, page.goto( '/emprestimos' ) abre http://localhost:5173/emprestimos.\n        baseURL: 'http://localhost:5173',\n        // Guarda um rastro (trace) para investigar falhas.\n        trace: 'retain-on-failure',\n    },\n    projects: [\n        { name: 'chromium', use: { ...devices[ 'Desktop Chrome' ] } },\n    ],\n    // Inicia o Vite antes dos testes, se ele ainda não estiver rodando.\n    webServer: {\n        command: 'pnpm dev',\n        url: 'http://localhost:5173',\n        reuseExistingServer: true,\n    },\n} );\n"
  },
  {
   "nome": "tsconfig.json",
   "etapa": 6,
   "nota": "Configuração do compilador TypeScript.",
   "codigo": "{\n  \"compilerOptions\": {\n    \"target\": \"ES2022\",\n    \"module\": \"ESNext\",\n    \"moduleResolution\": \"bundler\",\n    \"lib\": [\"ES2022\", \"DOM\", \"DOM.Iterable\"],\n    \"strict\": true,\n    \"skipLibCheck\": true,\n    \"noEmit\": true,\n    \"types\": [\"vite/client\"]\n  },\n  \"include\": [\"src\", \"test\", \"e2e\", \"playwright.config.ts\"]\n}\n"
  }
 ]
};
