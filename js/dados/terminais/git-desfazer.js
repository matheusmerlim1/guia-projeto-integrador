(function ( Guia ) {
    'use strict';

    const { PROJETO } = Guia.nucleo.terminal;

    Guia.dados.terminais[ 'git.descartar' ] = {
        titulo: 'Prompt de Comando',
        entradas: [
            {
                titulo: 'Veja a situação resumida',
                explicacao: 'Alguém digitou um texto por engano no <code>README.md</code>. <code>git status --short</code> mostra uma linha por arquivo: a primeira coluna representa a área de preparação e a segunda, a pasta de trabalho.',
                observe: '<code> M</code> (M na segunda coluna): modificado e ainda não adicionado.',
                pasta: PROJETO,
                comando: 'git status --short',
                saida: ' M README.md',
            },
            {
                titulo: 'Descarte a alteração',
                explicacao: '<code>git restore arquivo</code> volta o arquivo para como estava no último commit. <strong>Atenção:</strong> o que foi digitado é perdido de vez.',
                pasta: PROJETO,
                comando: 'git restore README.md',
            },
            {
                titulo: 'Confira',
                observe: 'Nenhuma linha: não há mais alterações pendentes.',
                pasta: PROJETO,
                comando: 'git status --short',
            },
        ],
    };

    Guia.dados.terminais[ 'git.tirar-do-stage' ] = {
        titulo: 'Prompt de Comando',
        entradas: [
            {
                titulo: 'Adicione a alteração',
                explicacao: 'Agora foi adicionada uma seção de testes ao <code>README.md</code>, e o arquivo foi adicionado cedo demais.',
                pasta: PROJETO,
                comando: 'git add README.md',
            },
            {
                titulo: 'Veja que está na área de preparação',
                observe: '<code>M </code> (M na primeira coluna): o arquivo está na área de preparação.',
                pasta: PROJETO,
                comando: 'git status --short',
                saida: 'M  README.md',
            },
            {
                titulo: 'Tire da área de preparação',
                explicacao: '<code>git restore --staged arquivo</code> desfaz o <code>git add</code>, mas <strong>mantém</strong> a alteração no arquivo. Em versões antigas do Git, usa-se <code>git reset HEAD -- arquivo</code>.',
                pasta: PROJETO,
                comando: 'git restore --staged README.md',
            },
            {
                titulo: 'Confira',
                observe: '<code> M</code>: voltou a ser apenas uma alteração na pasta de trabalho.',
                pasta: PROJETO,
                comando: 'git status --short',
                saida: ' M README.md',
            },
        ],
    };

    Guia.dados.terminais[ 'git.amend' ] = {
        titulo: 'Prompt de Comando',
        entradas: [
            {
                titulo: 'Adicione o arquivo',
                pasta: PROJETO,
                comando: 'git add README.md',
            },
            {
                titulo: 'Faça o commit',
                explicacao: 'A mensagem ficou incompleta: não diz onde a seção foi adicionada.',
                pasta: PROJETO,
                comando: 'git commit -m "Adiciona seção de testes"',
                saida: String.raw`
[main 5b20619] Adiciona seção de testes
 1 file changed, 4 insertions(+)
`,
            },
            {
                titulo: 'Corrija a mensagem do último commit',
                explicacao: '<code>git commit --amend</code> substitui o último commit por um novo, com a mensagem corrigida e com o que estiver na área de preparação. <strong>Use apenas antes do <code>git push</code></strong>: depois de enviado, o commit já pode estar no computador dos colegas.',
                observe: 'O identificador mudou de <code>5b20619</code> para <code>ab933a8</code>: é um commit novo, que ocupa o lugar do anterior.',
                pasta: PROJETO,
                comando: 'git commit --amend -m "Adiciona seção de testes ao README"',
                saida: String.raw`
[main ab933a8] Adiciona seção de testes ao README
 Date: Tue Sep 15 21:00:00 2026 -0300
 1 file changed, 4 insertions(+)
`,
            },
        ],
    };

    Guia.dados.terminais[ 'git.revert' ] = {
        titulo: 'Prompt de Comando',
        entradas: [
            {
                titulo: 'Desfaça um commit criando outro',
                explicacao: '<code>git revert</code> cria um novo commit com o inverso das mudanças de um commit anterior. É a forma segura de desfazer algo que já foi enviado, porque não apaga o histórico. <code>HEAD</code> é o último commit; também é possível informar o identificador, como <code>git revert ab933a8</code>. <code>--no-edit</code> usa a mensagem padrão.',
                observe: '<code>4 deletions(-)</code>: as 4 linhas adicionadas pelo commit foram removidas.',
                pasta: PROJETO,
                comando: 'git revert --no-edit HEAD',
                saida: String.raw`
[main 212f7f5] Revert "Adiciona seção de testes ao README"
 1 file changed, 4 deletions(-)
`,
            },
            {
                titulo: 'Veja o histórico',
                observe: 'O commit original continua no histórico, seguido do commit que o desfaz.',
                pasta: PROJETO,
                comando: 'git log --oneline -3',
                saida: String.raw`
212f7f5 Revert "Adiciona seção de testes ao README"
ab933a8 Adiciona seção de testes ao README
4f382be Mescla readme-execucao com os dois passos de execução
`,
            },
        ],
    };

    Guia.dados.terminais[ 'git.stash' ] = {
        titulo: 'Prompt de Comando',
        entradas: [
            {
                titulo: 'Guarde as alterações sem fazer commit',
                explicacao: '<code>git stash push -m "mensagem"</code> guarda as alterações ainda não commitadas em uma pilha e deixa os arquivos como no último commit. Útil quando é preciso trocar de branch ou atualizar o projeto antes de terminar o que estava fazendo. Para guardar também arquivos novos, acrescente <code>-u</code>.',
                pasta: PROJETO,
                comando: 'git stash push -m "Rascunho da seção de banco de dados"',
                saida: 'Saved working directory and index state On main: Rascunho da seção de banco de dados',
            },
            {
                titulo: 'Liste o que foi guardado',
                observe: '<code>stash@{0}</code> é o item mais recente da pilha.',
                pasta: PROJETO,
                comando: 'git stash list',
                saida: 'stash@{0}: On main: Rascunho da seção de banco de dados',
            },
            {
                titulo: 'Confira que a pasta está limpa',
                observe: 'Nenhuma linha: as alterações saíram dos arquivos e estão guardadas.',
                pasta: PROJETO,
                comando: 'git status --short',
            },
            {
                titulo: 'Recupere as alterações',
                explicacao: '<code>git stash pop</code> aplica o item mais recente e o remove da pilha. <code>git stash apply</code> aplica sem remover.',
                observe: 'O <code>README.md</code> volta a aparecer como modificado, e <code>Dropped</code> confirma que o item saiu da pilha. <code>ahead of \'origin/main\' by 2 commits</code> lembra que os commits de <code>--amend</code> e <code>revert</code> ainda não foram enviados.',
                pasta: PROJETO,
                comando: 'git stash pop',
                saida: String.raw`
On branch main
Your branch is ahead of 'origin/main' by 2 commits.
  (use "git push" to publish your local commits)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")
Dropped refs/stash@{0} (ae7e4b42a9a222cd9c994d70ce5d76574721fa72)
`,
            },
        ],
    };

})( window.Guia );
