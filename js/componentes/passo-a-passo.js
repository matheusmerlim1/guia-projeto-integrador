(function ( Guia ) {
    'use strict';

    class PassoAPasso {

        constructor( elemento ) {
            this.elemento = elemento;
            this.dados = Guia.dados.terminais[ elemento.dataset.passoAPasso ];
        }

        iniciar() {
            if ( ! this.dados ) {
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
