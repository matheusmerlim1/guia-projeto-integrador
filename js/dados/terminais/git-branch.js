(function ( Guia ) {
    'use strict';

    const { PROJETO } = Guia.nucleo.terminal;

    Guia.dados.terminais[ 'git.branch-criar' ] = {
        titulo: 'Prompt de Comando — computador da Ana',
        entradas: [
            {
                titulo: 'Crie a branch e entre nela',
                explicacao: '<code>git checkout -b nome</code> cria uma branch a partir do ponto em que você está e já muda para ela. Sem o <code>-b</code>, <code>git checkout nome</code> apenas troca para uma branch que já existe. Nas versões novas do Git, <code>git switch -c nome</code> faz o mesmo. Use nomes curtos que digam o que será feito.',
                observe: '<code>Switched to a new branch</code> confirma que você já está na branch nova.',
                pasta: PROJETO,
                comando: 'git checkout -b emprestimo-dominio',
                saida: "Switched to a new branch 'emprestimo-dominio'",
            },
            {
                titulo: 'Liste as branches',
                explicacao: '<code>git branch</code> lista as branches do seu computador. Com <code>-a</code>, lista também as do GitHub.',
                observe: 'O asterisco marca a branch atual. A <code>main</code> continua existindo e não vai receber nada do que você fizer agora, até o merge.',
                pasta: PROJETO,
                comando: 'git branch',
                saida: String.raw`
* emprestimo-dominio
  main
`,
            },
        ],
    };

    Guia.dados.terminais[ 'git.branch-commit' ] = {
        titulo: 'Prompt de Comando — computador da Ana',
        entradas: [
            {
                titulo: 'Veja o arquivo novo',
                explicacao: 'Com o <code>Emprestimo.php</code> criado, confira a situação.',
                observe: 'Como a pasta <code>backend/</code> inteira é nova, o Git mostra só a pasta em <code>Untracked files</code>, e não cada arquivo dentro dela.',
                pasta: PROJETO,
                comando: 'git status',
                saida: String.raw`
On branch emprestimo-dominio
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        backend/

nothing added to commit but untracked files present (use "git add" to track)
`,
            },
            {
                titulo: 'Adicione o arquivo',
                explicacao: 'Informe o caminho a partir da pasta do projeto, usando barras normais (<code>/</code>). Para adicionar a pasta toda, <code>git add backend</code> também funcionaria.',
                pasta: PROJETO,
                comando: 'git add backend/src/emprestimo/Emprestimo.php',
            },
            {
                titulo: 'Grave o commit na branch',
                explicacao: 'O commit sempre vai para a branch atual.',
                observe: 'O início da resposta, <code>[emprestimo-dominio a8643ae]</code>, confirma que o commit foi feito na branch nova. <code>create mode 100644</code> aparece quando o arquivo é novo.',
                pasta: PROJETO,
                comando: 'git commit -m "Cria entidade Emprestimo com prazo de devolução"',
                saida: String.raw`
[emprestimo-dominio a8643ae] Cria entidade Emprestimo com prazo de devolução
 1 file changed, 60 insertions(+)
 create mode 100644 backend/src/emprestimo/Emprestimo.php
`,
            },
            {
                titulo: 'Envie a branch para o GitHub',
                explicacao: 'Na primeira vez que uma branch é enviada, é preciso dizer para onde: <code>--set-upstream origin emprestimo-dominio</code> cria a branch no GitHub e liga as duas. Nos envios seguintes dessa branch, basta <code>git push</code>.',
                observe: '<code>[new branch]</code> indica que a branch foi criada no GitHub. O próprio GitHub responde com o link para abrir um <em>pull request</em>.',
                pasta: PROJETO,
                comando: 'git push --set-upstream origin emprestimo-dominio',
                saida: String.raw`
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Delta compression using up to 8 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (6/6), 1.25 KiB | 1.25 MiB/s, done.
Total 6 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
remote:
remote: Create a pull request for 'emprestimo-dominio' on GitHub by visiting:
remote:      https://github.com/ana-souza/biblioteca-comunitaria/pull/new/emprestimo-dominio
remote:
To https://github.com/ana-souza/biblioteca-comunitaria.git
 * [new branch]      emprestimo-dominio -> emprestimo-dominio
branch 'emprestimo-dominio' set up to track 'origin/emprestimo-dominio'.
`,
            },
        ],
    };

    Guia.dados.terminais[ 'git.alterar' ] = {
        titulo: 'Prompt de Comando — computador da Ana',
        entradas: [
            {
                titulo: 'Veja que o arquivo foi modificado',
                explicacao: 'Depois de adicionar os métodos <code>diasDeAtraso()</code> e <code>calcularMulta()</code> no editor, confira a situação.',
                observe: '<code>modified</code>: o arquivo já é acompanhado pelo Git e foi alterado desde o último commit.',
                pasta: PROJETO,
                comando: 'git status',
                saida: String.raw`
On branch emprestimo-dominio
Your branch is up to date with 'origin/emprestimo-dominio'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   backend/src/emprestimo/Emprestimo.php

no changes added to commit (use "git add" and/or "git commit -a")
`,
            },
            {
                titulo: 'Veja exatamente o que mudou',
                explicacao: '<code>git diff</code> compara os arquivos com o último commit e mostra só as linhas diferentes. Use antes de cada commit para revisar o que vai ser gravado. Se a resposta não couber na tela, use as setas para rolar e aperte <kbd>q</kbd> para sair.',
                observe: 'Linhas começando com <code>+</code> (verde) foram adicionadas; com <code>-</code> (vermelho), removidas; as demais são contexto. <code>@@ -57,4 +59,21 @@</code> indica em que linha do arquivo está cada trecho.',
                pasta: PROJETO,
                comando: 'git diff',
                saida: String.raw`
diff --git a/backend/src/emprestimo/Emprestimo.php b/backend/src/emprestimo/Emprestimo.php
index 02e1cf3..6c44994 100644
--- a/backend/src/emprestimo/Emprestimo.php
+++ b/backend/src/emprestimo/Emprestimo.php
@@ -2,6 +2,8 @@

 // Regra R1: prazo de devolução, em dias.
 const EMPRESTIMO_PRAZO_DIAS = 7;
+// Regra R2: valor da multa por dia de atraso.
+const EMPRESTIMO_MULTA_POR_DIA = 1.00;

 /**
  * Entidade do domínio: representa o empréstimo de um livro a um leitor.
@@ -57,4 +59,21 @@ class Emprestimo {
         $this->dataDevolucao = $data;
     }

+    /**
+     * Retorna quantos dias se passaram depois da data limite.
+     * Retorna 0 quando a data informada está dentro do prazo.
+     */
+    public function diasDeAtraso( DateTimeImmutable $data ): int {
+        if ( $data <= $this->dataLimite() ) {
+            return 0;
+        }
+        return (int) $this->dataLimite()->diff( $data )->days;
+    }
+
+    /**
+     * Regra R2: calcula a multa multiplicando os dias de atraso pelo valor diário.
+     */
+    public function calcularMulta( DateTimeImmutable $data ): float {
+        return $this->diasDeAtraso( $data ) * EMPRESTIMO_MULTA_POR_DIA;
+    }
 }
`,
            },
            {
                titulo: 'Adicione a alteração',
                explicacao: 'Todo arquivo modificado precisa passar pelo <code>git add</code> de novo antes do commit, mesmo que já tenha sido adicionado antes.',
                pasta: PROJETO,
                comando: 'git add backend/src/emprestimo/Emprestimo.php',
            },
            {
                titulo: 'Grave o commit',
                observe: '<code>19 insertions(+)</code>: são as 19 linhas com <code>+</code> que apareceram no <code>git diff</code>.',
                pasta: PROJETO,
                comando: 'git commit -m "Adiciona cálculo de dias de atraso e multa"',
                saida: String.raw`
[emprestimo-dominio 65f0f9d] Adiciona cálculo de dias de atraso e multa
 1 file changed, 19 insertions(+)
`,
            },
            {
                titulo: 'Envie a alteração',
                explicacao: 'Como a branch já foi ligada ao GitHub no passo anterior, agora basta <code>git push</code>.',
                observe: 'A branch <code>emprestimo-dominio</code> do GitHub avançou de <code>a8643ae</code> para <code>65f0f9d</code>.',
                pasta: PROJETO,
                comando: 'git push',
                saida: String.raw`
Enumerating objects: 11, done.
Counting objects: 100% (11/11), done.
Delta compression using up to 8 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (6/6), 789 bytes | 789.00 KiB/s, done.
Total 6 (delta 2), reused 0 (delta 0), pack-reused 0 (from 0)
To https://github.com/ana-souza/biblioteca-comunitaria.git
   a8643ae..65f0f9d  emprestimo-dominio -> emprestimo-dominio
`,
            },
        ],
    };

    Guia.dados.terminais[ 'git.merge' ] = {
        titulo: 'Prompt de Comando — computador da Ana',
        entradas: [
            {
                titulo: 'Volte para a main',
                explicacao: 'O merge traz as mudanças de outra branch <strong>para a branch atual</strong>. Por isso, primeiro entre na branch que vai receber as mudanças.',
                pasta: PROJETO,
                comando: 'git checkout main',
                saida: String.raw`
Switched to branch 'main'
Your branch is up to date with 'origin/main'.
`,
            },
            {
                titulo: 'Atualize a main',
                explicacao: '<code>git pull</code> baixa os commits novos do GitHub e os junta na branch atual. Faça sempre antes do merge, para juntar com a versão mais recente.',
                observe: '<code>Already up to date</code>: ninguém enviou nada novo para a <code>main</code>.',
                pasta: PROJETO,
                comando: 'git pull',
                saida: 'Already up to date.',
            },
            {
                titulo: 'Junte a branch na main',
                explicacao: '<code>git merge nome</code> traz para a branch atual todos os commits da branch informada.',
                observe: '<code>Fast-forward</code>: como a <code>main</code> não tinha commits novos, o Git só avançou a <code>main</code> até o último commit da branch, sem criar commit de junção. <code>79 insertions(+)</code>: o arquivo inteiro entrou na <code>main</code>.',
                pasta: PROJETO,
                comando: 'git merge emprestimo-dominio',
                saida: String.raw`
Updating 90f1753..65f0f9d
Fast-forward
 backend/src/emprestimo/Emprestimo.php | 79 +++++++++++++++++++++++++++++++++++
 1 file changed, 79 insertions(+)
 create mode 100644 backend/src/emprestimo/Emprestimo.php
`,
            },
            {
                titulo: 'Envie a main atualizada',
                explicacao: 'O merge aconteceu só no seu computador; é preciso enviar a <code>main</code>.',
                observe: '<code>90f1753..65f0f9d  main -&gt; main</code>: a <code>main</code> do GitHub agora tem o <code>Emprestimo.php</code>.',
                pasta: PROJETO,
                comando: 'git push',
                saida: String.raw`
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
To https://github.com/ana-souza/biblioteca-comunitaria.git
   90f1753..65f0f9d  main -> main
`,
            },
            {
                titulo: 'Veja o histórico em forma de gráfico',
                explicacao: '<code>--graph</code> desenha as linhas das branches à esquerda e <code>--all</code> inclui todas as branches.',
                observe: 'Uma coluna reta de <code>*</code> mostra que o histórico ficou linear.',
                pasta: PROJETO,
                comando: 'git log --oneline --graph --all',
                saida: String.raw`
* 65f0f9d Adiciona cálculo de dias de atraso e multa
* a8643ae Cria entidade Emprestimo com prazo de devolução
* 90f1753 Adiciona .gitignore e instruções iniciais no README
* 730498c Initial commit
`,
            },
            {
                titulo: 'Apague a branch no seu computador',
                explicacao: '<code>git branch -d nome</code> só apaga a branch se ela já foi juntada, então é seguro. Os commits continuam na <code>main</code>.',
                pasta: PROJETO,
                comando: 'git branch -d emprestimo-dominio',
                saida: 'Deleted branch emprestimo-dominio (was 65f0f9d).',
            },
            {
                titulo: 'Apague a branch no GitHub',
                explicacao: 'Remove a branch do repositório remoto, para não acumular branches que já foram juntadas.',
                pasta: PROJETO,
                comando: 'git push origin --delete emprestimo-dominio',
                saida: String.raw`
To https://github.com/ana-souza/biblioteca-comunitaria.git
 - [deleted]         emprestimo-dominio
`,
            },
        ],
    };

})( window.Guia );
