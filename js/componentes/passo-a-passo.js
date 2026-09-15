(function ( Guia ) {
    'use strict';

    class PassoAPasso {

        constructor( elemento, preferencias ) {
            this.elemento = elemento;
            this.preferencias = preferencias;
            this.origem = Guia.dados.terminais[ elemento.dataset.passoAPasso ];
        }

        iniciar() {
            if ( ! this.origem ) {
                return;
            }
            this.desenhar();
            // Passos com variantes por linguagem são redesenhados quando a linguagem muda.
            if ( this.origem.variantes ) {
                this.preferencias.aoAlterarLinguagem( this.origem.camada, () => this.desenhar() );
            }
        }

        dadosAtuais() {
            if ( ! this.origem.variantes ) {
                return this.origem;
            }
            const linguagem = this.preferencias.linguagem( this.origem.camada );
            return this.origem.variantes[ linguagem ];
        }

        desenhar() {
            this.dados = this.dadosAtuais();
            // Uma variante pode não ter comandos, apenas um aviso explicando por quê.
            if ( this.dados.aviso ) {
                const aviso = document.createElement( 'div' );
                aviso.className = 'aviso aviso--dica';
                aviso.append( this.criarTexto( '', this.dados.aviso ) );
                this.elemento.replaceChildren( aviso );
                return;
            }
            const lista = document.createElement( 'ol' );
            lista.className = 'passos';
            lista.append( ...this.dados.entradas.map( entrada => this.criarPasso( entrada ) ) );

            const conteudo = [ lista ];
            if ( this.dados.entradas.length > 1 ) {
                conteudo.push( this.criarSequenciaCompleta() );
            }
            this.elemento.replaceChildren( ...conteudo );
        }

        criarPasso( entrada ) {
            const item = document.createElement( 'li' );
            item.className = 'passo';

            const corpo = document.createElement( 'div' );
            corpo.className = 'passo__corpo';

            const titulo = document.createElement( 'p' );
            titulo.className = 'passo__titulo';
            titulo.textContent = entrada.titulo;
            corpo.append( titulo );

            if ( entrada.explicacao ) {
                corpo.append( this.criarTexto( 'passo__explicacao', entrada.explicacao ) );
            }

            const terminal = new Guia.componentes.Terminal( {
                titulo: this.dados.titulo,
                entradas: [ entrada ],
            } );
            corpo.append( terminal.criarElemento() );

            if ( entrada.observe ) {
                const observe = this.criarTexto( 'passo__observe', entrada.observe );
                const rotulo = document.createElement( 'strong' );
                rotulo.className = 'passo__rotulo';
                rotulo.textContent = 'Na resposta: ';
                observe.prepend( rotulo );
                corpo.append( observe );
            }

            item.append( corpo );
            return item;
        }

        criarTexto( classe, html ) {
            const paragrafo = document.createElement( 'p' );
            paragrafo.className = classe;
            paragrafo.innerHTML = html;
            return paragrafo;
        }

        criarSequenciaCompleta() {
            const detalhes = document.createElement( 'details' );
            detalhes.className = 'expansivel passos__sequencia';

            const resumo = document.createElement( 'summary' );
            resumo.className = 'expansivel__resumo';
            resumo.textContent = 'Ver todos os comandos deste passo em um único terminal';

            const terminal = new Guia.componentes.Terminal( this.dados );
            const area = document.createElement( 'div' );
            area.className = 'expansivel__conteudo';
            area.append( terminal.criarElemento() );

            detalhes.append( resumo, area );
            return detalhes;
        }
    }

    Guia.componentes.PassoAPasso = PassoAPasso;

})( window.Guia );
