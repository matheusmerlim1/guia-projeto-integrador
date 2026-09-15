(function ( Guia ) {
    'use strict';

    const { USUARIO_ANA, PROJETOS, PROJETO, REPOSITORIO } = Guia.nucleo.terminal;

    Guia.dados.terminais[ 'git.configurar' ] = {
        titulo: 'Prompt de Comando — computador da Ana',
        entradas: [
            {
                titulo: 'Confira se o Git está instalado',
                explicacao: '<code>git --version</code> mostra a versão do Git instalada. Se aparecer a mensagem <em>“git” não é reconhecido como um comando interno</em>, o Git não foi instalado ou o Prompt de Comando precisa ser fechado e aberto de novo.',
                observe: 'A resposta traz o número da versão instalada.',
                pasta: USUARIO_ANA,
                comando: 'git --version',
                saida: 'git version 2.55.0.windows.1',
            },
            {
                titulo: 'Informe seu nome',
                explicacao: '<code>git config</code> grava uma configuração. A opção <code>--global</code> faz ela valer para todos os projetos deste computador. O nome aparece como autor de cada commit que você fizer.',
                observe: 'Não aparece nada: no Git, isso significa que o comando deu certo.',
                pasta: USUARIO_ANA,
                comando: 'git config --global user.name "Ana Souza"',
            },
            {
                titulo: 'Informe seu e-mail',
                explicacao: 'Use o <strong>mesmo e-mail da sua conta do GitHub</strong>. É por ele que o GitHub liga cada commit ao seu perfil.',
                pasta: USUARIO_ANA,
                comando: 'git config --global user.email ana.souza@exemplo.com',
            },
            {
                titulo: 'Confira as configurações',
                explicacao: '<code>git config --global --list</code> lista tudo o que foi configurado com <code>--global</code>.',
                observe: '<code>user.name</code> e <code>user.email</code> devem aparecer exatamente como você digitou. Se errar, basta repetir o comando com o valor certo.',
                pasta: USUARIO_ANA,
                comando: 'git config --global --list',
                saida: String.raw`
user.name=Ana Souza
user.email=ana.souza@exemplo.com
`,
            },
        ],
    };

    Guia.dados.terminais[ 'git.clonar' ] = {
        titulo: 'Prompt de Comando — computador da Ana',
        entradas: [
            {
                titulo: 'Vá para a pasta onde ficam seus projetos',
                explicacao: '<code>cd</code> (<em>change directory</em>) muda a pasta em que o terminal está. O caminho antes do sinal <code>&gt;</code> mostra sempre a pasta atual.',
                observe: 'O início da linha muda para <code>C:\\projetos&gt;</code>.',
                pasta: USUARIO_ANA,
                comando: String.raw`cd C:\projetos`,
            },
            {
                titulo: 'Baixe o repositório',
                explicacao: '<code>git clone</code> copia o repositório do GitHub para uma pasta nova, com todos os arquivos e todo o histórico, e guarda o endereço do GitHub com o apelido <code>origin</code>. A pasta recebe o nome do repositório; para escolher outro nome, coloque-o no final: <code>git clone endereço minha-pasta</code>.',
                observe: '<code>Cloning into \'biblioteca-comunitaria\'</code> informa a pasta criada. As linhas seguintes mostram o download dos objetos (arquivos e commits).',
                pasta: PROJETOS,
                comando: 'git clone ' + REPOSITORIO,
                saida: String.raw`
Cloning into 'biblioteca-comunitaria'...
remote: Enumerating objects: 3, done.
remote: Counting objects: 100% (3/3), done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
Receiving objects: 100% (3/3), done.
`,
            },
            {
                titulo: 'Entre na pasta do projeto',
                explicacao: 'Todos os comandos do Git daqui em diante precisam ser executados <strong>dentro da pasta do projeto</strong>.',
                pasta: PROJETOS,
                comando: 'cd biblioteca-comunitaria',
            },
            {
                titulo: 'Veja a situação do projeto',
                explicacao: '<code>git status</code> é o comando que você mais vai usar: diz em qual branch você está, se ela está igual à do GitHub e quais arquivos mudaram. Na dúvida, rode <code>git status</code>.',
                observe: '<code>On branch main</code>: você está na branch <code>main</code>. <code>up to date with \'origin/main\'</code>: igual ao GitHub. <code>working tree clean</code>: nenhum arquivo foi alterado.',
                pasta: PROJETO,
                comando: 'git status',
                saida: String.raw`
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
`,
            },
            {
                titulo: 'Veja o histórico',
                explicacao: '<code>git log</code> lista os commits do mais recente para o mais antigo. Com <code>--oneline</code>, cada commit ocupa uma linha. O código no início é o identificador (<em>hash</em>) do commit.',
                observe: 'Por enquanto existe só o commit que o GitHub criou junto com o <code>README.md</code>.',
                pasta: PROJETO,
                comando: 'git log --oneline',
                saida: '730498c Initial commit',
            },
        ],
    };

    Guia.dados.terminais[ 'git.primeiro-commit' ] = {
        titulo: 'Prompt de Comando — computador da Ana',
        entradas: [
            {
                titulo: 'Veja o que mudou',
                explicacao: 'Depois de criar o <code>.gitignore</code> e editar o <code>README.md</code>, o Git percebe as mudanças, mas ainda não guarda nada.',
                observe: '<code>Changes not staged for commit</code>: arquivos que o Git já conhecia e foram modificados. <code>Untracked files</code>: arquivos novos, que o Git ainda não acompanha. No terminal de verdade, os dois aparecem em vermelho.',
                pasta: PROJETO,
                comando: 'git status',
                saida: String.raw`
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   README.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .gitignore

no changes added to commit (use "git add" and/or "git commit -a")
`,
            },
            {
                titulo: 'Adicione os arquivos à área de preparação',
                explicacao: '<code>git add</code> escolhe o que vai entrar no próximo commit. Aceita um ou vários arquivos separados por espaço, uma pasta inteira (<code>git add backend</code>) ou um ponto para tudo o que mudou na pasta atual (<code>git add .</code>).',
                observe: 'Não aparece nada: os dois arquivos foram adicionados.',
                pasta: PROJETO,
                comando: 'git add .gitignore README.md',
            },
            {
                titulo: 'Confira o que vai para o commit',
                explicacao: 'Rodar <code>git status</code> de novo evita commitar algo por engano.',
                observe: '<code>Changes to be committed</code> lista o que está na área de preparação — em verde no terminal: um arquivo novo (<code>new file</code>) e um modificado (<code>modified</code>).',
                pasta: PROJETO,
                comando: 'git status',
                saida: String.raw`
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   .gitignore
        modified:   README.md
`,
            },
            {
                titulo: 'Grave o commit',
                explicacao: '<code>git commit</code> cria um ponto no histórico com tudo o que está na área de preparação. A opção <code>-m</code> informa a mensagem, que deve dizer em poucas palavras o que foi feito, começando com um verbo: <em>Adiciona</em>, <em>Corrige</em>, <em>Remove</em>, <em>Altera</em>.',
                observe: '<code>[main 90f1753]</code>: a branch e o identificador do novo commit. <code>2 files changed, 12 insertions(+), 1 deletion(-)</code>: resumo das linhas alteradas. <strong>O commit ainda está só no seu computador.</strong>',
                pasta: PROJETO,
                comando: 'git commit -m "Adiciona .gitignore e instruções iniciais no README"',
                saida: String.raw`
[main 90f1753] Adiciona .gitignore e instruções iniciais no README
 2 files changed, 12 insertions(+), 1 deletion(-)
 create mode 100644 .gitignore
`,
            },
            {
                titulo: 'Envie para o GitHub',
                explicacao: '<code>git push</code> envia os commits da branch atual para o GitHub. Na primeira vez, abre uma janela do navegador para você entrar na sua conta do GitHub; depois disso, o Git lembra do acesso.',
                observe: 'A última linha, <code>730498c..90f1753  main -&gt; main</code>, mostra que a <code>main</code> do GitHub avançou do commit antigo para o novo. Atualize a página do repositório para ver os arquivos.',
                pasta: PROJETO,
                comando: 'git push',
                saida: String.raw`
Enumerating objects: 6, done.
Counting objects: 100% (6/6), done.
Delta compression using up to 8 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (4/4), 471 bytes | 471.00 KiB/s, done.
Total 4 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
To https://github.com/ana-souza/biblioteca-comunitaria.git
   730498c..90f1753  main -> main
`,
            },
        ],
    };

})( window.Guia );
