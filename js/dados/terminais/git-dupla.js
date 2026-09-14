(function ( Guia ) {
    'use strict';

    const { PROJETOS, PROJETO, REPOSITORIO } = Guia.nucleo.terminal;

    Guia.dados.terminais[ 'git.bruno-branch' ] = {
        titulo: 'Prompt de Comando — computador do Bruno',
        entradas: [
            {
                titulo: 'Bruno baixa o projeto',
                explicacao: 'Depois de ser adicionado como colaborador pela Ana, Bruno clona o repositório no computador dele, do mesmo jeito que a Ana fez.',
                observe: 'Agora são 19 objetos, porque o projeto já tem vários commits.',
                pasta: PROJETOS,
                comando: 'git clone ' + REPOSITORIO,
                saida: String.raw`
Cloning into 'biblioteca-comunitaria'...
remote: Enumerating objects: 19, done.
remote: Counting objects: 100% (19/19), done.
remote: Compressing objects: 100% (10/10), done.
remote: Total 19 (delta 3), reused 0 (delta 0), pack-reused 0 (from 0)
Receiving objects: 100% (19/19), done.
Resolving deltas: 100% (3/3), done.
`,
            },
            {
                titulo: 'Bruno entra na pasta',
                pasta: PROJETOS,
                comando: 'cd biblioteca-comunitaria',
            },
            {
                titulo: 'Bruno cria a branch dele',
                explicacao: 'Cada pessoa trabalha na sua própria branch.',
                pasta: PROJETO,
                comando: 'git checkout -b readme-execucao',
                saida: "Switched to a new branch 'readme-execucao'",
            },
            {
                titulo: 'Bruno grava a alteração',
                explicacao: 'Bruno troca a linha <em>Em construção.</em> do <code>README.md</code> pelo passo de instalação. A opção <code>-a</code> adiciona automaticamente os arquivos modificados que o Git já acompanha (não serve para arquivos novos). <code>git commit -am "..."</code> é o mesmo que <code>git add README.md</code> seguido de <code>git commit -m "..."</code>.',
                observe: '<code>1 insertion(+), 1 deletion(-)</code>: uma linha foi trocada por outra.',
                pasta: PROJETO,
                comando: 'git commit -am "Descreve instalação das dependências no README"',
                saida: String.raw`
[readme-execucao f6bcebe] Descreve instalação das dependências no README
 1 file changed, 1 insertion(+), 1 deletion(-)
`,
            },
        ],
    };

    Guia.dados.terminais[ 'git.ana-readme' ] = {
        titulo: 'Prompt de Comando — computador da Ana',
        entradas: [
            {
                titulo: 'Ana altera a mesma linha na main',
                explicacao: 'Ao mesmo tempo, sem saber da mudança do Bruno, Ana troca a mesma linha <em>Em construção.</em> pelo passo de criação do banco.',
                pasta: PROJETO,
                comando: 'git commit -am "Descreve criação do banco no README"',
                saida: String.raw`
[main a7bac3b] Descreve criação do banco no README
 1 file changed, 1 insertion(+), 1 deletion(-)
`,
            },
            {
                titulo: 'Ana envia primeiro',
                observe: 'A <code>main</code> do GitHub avançou para <code>a7bac3b</code>. O Bruno ainda não tem esse commit.',
                pasta: PROJETO,
                comando: 'git push',
                saida: String.raw`
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 8 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 467 bytes | 467.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
To https://github.com/ana-souza/biblioteca-comunitaria.git
   65f0f9d..a7bac3b  main -> main
`,
            },
        ],
    };

    Guia.dados.terminais[ 'git.bruno-atualizar' ] = {
        titulo: 'Prompt de Comando — computador do Bruno',
        entradas: [
            {
                titulo: 'Bruno volta para a main',
                pasta: PROJETO,
                comando: 'git checkout main',
                saida: String.raw`
Switched to branch 'main'
Your branch is up to date with 'origin/main'.
`,
            },
            {
                titulo: 'Bruno baixa as novidades sem juntar',
                explicacao: '<code>git fetch</code> baixa os commits novos do GitHub, mas <strong>não altera seus arquivos</strong>. Serve para ver o que chegou antes de juntar.',
                observe: '<code>main -&gt; origin/main</code>: a cópia local da <code>main</code> do GitHub, chamada <code>origin/main</code>, foi atualizada.',
                pasta: PROJETO,
                comando: 'git fetch',
                saida: String.raw`
From https://github.com/ana-souza/biblioteca-comunitaria.git
   65f0f9d..a7bac3b  main       -> origin/main
`,
            },
            {
                titulo: 'Bruno compara com o GitHub',
                observe: '<code>behind \'origin/main\' by 1 commit</code>: existe 1 commit no GitHub que ainda não está na <code>main</code> do Bruno.',
                pasta: PROJETO,
                comando: 'git status',
                saida: String.raw`
On branch main
Your branch is behind 'origin/main' by 1 commit, and can be fast-forwarded.
  (use "git pull" to update your local branch)

nothing to commit, working tree clean
`,
            },
            {
                titulo: 'Bruno traz o commit da Ana',
                explicacao: '<code>git pull</code> é o mesmo que <code>git fetch</code> seguido de <code>git merge</code>. Como o fetch já foi feito, agora ele só junta.',
                observe: 'O <code>README.md</code> do Bruno agora tem a linha escrita pela Ana.',
                pasta: PROJETO,
                comando: 'git pull',
                saida: String.raw`
Updating 65f0f9d..a7bac3b
Fast-forward
 README.md | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
`,
            },
        ],
    };

    Guia.dados.terminais[ 'git.bruno-conflito' ] = {
        titulo: 'Prompt de Comando — computador do Bruno',
        entradas: [
            {
                titulo: 'Bruno junta a branch dele e surge um conflito',
                explicacao: 'Os dois alteraram a mesma linha do mesmo arquivo. O Git não sabe qual versão manter e interrompe o merge para você decidir.',
                observe: '<code>CONFLICT (content): Merge conflict in README.md</code> informa o arquivo com conflito. Nada foi perdido: as duas versões estão dentro do arquivo.',
                pasta: PROJETO,
                comando: 'git merge readme-execucao',
                saida: String.raw`
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
`,
            },
            {
                titulo: 'Veja os arquivos em conflito',
                observe: '<code>both modified</code>: os dois lados alteraram o arquivo. Para desistir do merge e voltar ao estado anterior, use <code>git merge --abort</code>.',
                pasta: PROJETO,
                comando: 'git status',
                saida: String.raw`
On branch main
Your branch is up to date with 'origin/main'.

You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")
`,
            },
        ],
    };

    Guia.dados.terminais[ 'git.bruno-resolver' ] = {
        titulo: 'Prompt de Comando — computador do Bruno',
        entradas: [
            {
                titulo: 'Marque o conflito como resolvido',
                explicacao: 'Depois de editar o arquivo e apagar as marcações, <code>git add</code> avisa ao Git que o conflito daquele arquivo foi resolvido.',
                pasta: PROJETO,
                comando: 'git add README.md',
            },
            {
                titulo: 'Conclua o merge com um commit',
                explicacao: 'Diferente do <em>fast-forward</em>, este merge gera um <strong>commit de junção</strong>, que une as duas linhas do histórico.',
                pasta: PROJETO,
                comando: 'git commit -m "Mescla readme-execucao com os dois passos de execução"',
                saida: '[main 4f382be] Mescla readme-execucao com os dois passos de execução',
            },
            {
                titulo: 'Envie o resultado',
                pasta: PROJETO,
                comando: 'git push',
                saida: String.raw`
Enumerating objects: 10, done.
Counting objects: 100% (10/10), done.
Delta compression using up to 8 threads
Compressing objects: 100% (6/6), done.
Writing objects: 100% (6/6), 781 bytes | 781.00 KiB/s, done.
Total 6 (delta 2), reused 0 (delta 0), pack-reused 0 (from 0)
To https://github.com/ana-souza/biblioteca-comunitaria.git
   a7bac3b..4f382be  main -> main
`,
            },
            {
                titulo: 'Veja as duas linhas se juntando',
                explicacao: '<code>-6</code> limita a lista aos 6 últimos commits.',
                observe: 'As barras <code>|</code>, <code>/</code> e <code>\\</code> mostram o commit do Bruno (<code>f6bcebe</code>) e o da Ana (<code>a7bac3b</code>) saindo do mesmo ponto e se juntando no commit <code>4f382be</code>.',
                pasta: PROJETO,
                comando: 'git log --oneline --graph -6',
                saida: String.raw`
*   4f382be Mescla readme-execucao com os dois passos de execução
|\
| * f6bcebe Descreve instalação das dependências no README
* | a7bac3b Descreve criação do banco no README
|/
* 65f0f9d Adiciona cálculo de dias de atraso e multa
* a8643ae Cria entidade Emprestimo com prazo de devolução
* 90f1753 Adiciona .gitignore e instruções iniciais no README
`,
            },
        ],
    };

})( window.Guia );
