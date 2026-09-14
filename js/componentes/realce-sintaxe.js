(function ( Guia ) {
    'use strict';

    const PALAVRAS_CHAVE = {
        php: 'abstract array as bool break case catch class const continue default do echo else elseif enum extends false final float fn for foreach function if implements int interface match mixed namespace new null private protected public readonly require require_once return self static string throw true try use void while',
        typescript: 'as async await boolean break case catch class const constructor continue default else enum export extends false finally for from function if implements import in instanceof interface let new null number private protected public readonly return static string super this throw true try type undefined void while',
        javascript: 'async await break case catch class const constructor continue default else export extends false finally for from function if import in instanceof let new null return static super this throw true try undefined while',
        java: 'abstract boolean break case catch class double else extends false final finally for if implements import int interface long new null package private protected public record return static super this throw throws true try var void while',
        sql: 'AND AUTO_INCREMENT BY CHAR CHARACTER COLLATE CREATE DATABASE DATE DEFAULT DELETE DROP ENGINE EXISTS FOREIGN FROM IF INNODB INSERT INT INTO KEY NOT NULL ON ORDER PRIMARY REFERENCES SELECT SET TABLE UPDATE USE VALUES VARCHAR WHERE',
        bash: 'add branch checkout clone commit config fetch git log merge pull push reset revert stash status switch',
    };

    const TIPOS_CLASSE = {
        'rs-comentario': 'comentario',
        'rs-texto': 'texto',
        'rs-variavel': 'variavel',
        'rs-anotacao': 'anotacao',
        'rs-numero': 'numero',
    };

    class RealceSintaxe {

        constructor( linguagem ) {
            this.linguagem = linguagem;
            this.palavras = new Set( ( PALAVRAS_CHAVE[ linguagem ] || '' ).split( ' ' ) );
            this.padrao = this.criarPadrao();
        }

        criarPadrao() {
            const comentario = this.linguagem === 'bash'
                ? '#[^\\n]*'
                : this.linguagem === 'sql'
                    ? '--[^\\n]*'
                    : '\\/\\*[\\s\\S]*?\\*\\/|\\/\\/[^\\n]*';
            const partes = [
                '(?<comentario>' + comentario + ')',
                '(?<texto>\'(?:\\\\.|[^\'\\\\\\n])*\'|"(?:\\\\.|[^"\\\\\\n])*"|`(?:\\\\.|[^`\\\\])*`)',
                '(?<variavel>\\$[A-Za-z_]\\w*)',
                '(?<anotacao>@[A-Za-z_]\\w*)',
                '(?<numero>\\b\\d+(?:\\.\\d+)?\\b)',
                '(?<palavra>[A-Za-z_]\\w*)',
            ];
            return new RegExp( partes.join( '|' ), 'g' );
        }

        realcar( codigo ) {
            if ( this.linguagem === 'texto' ) {
                return this.escapar( codigo ).split( '\n' );
            }
            let html = '';
            let ultimo = 0;
            for ( const encontrado of codigo.matchAll( this.padrao ) ) {
                html += this.escapar( codigo.slice( ultimo, encontrado.index ) );
                html += this.envolver( encontrado, codigo );
                ultimo = encontrado.index + encontrado[ 0 ].length;
            }
            html += this.escapar( codigo.slice( ultimo ) );
            return html.split( '\n' );
        }

        envolver( encontrado, codigo ) {
            const texto = encontrado[ 0 ];
            const grupos = encontrado.groups;
            for ( const [ classe, grupo ] of Object.entries( TIPOS_CLASSE ) ) {
                if ( grupos[ grupo ] !== undefined ) {
                    return this.marcar( classe, texto );
                }
            }
            return this.marcar( this.classePalavra( texto, codigo, encontrado.index ), texto );
        }

        classePalavra( palavra, codigo, posicao ) {
            const ehPalavraChave = this.linguagem === 'sql'
                ? this.palavras.has( palavra.toUpperCase() )
                : this.palavras.has( palavra );
            if ( ehPalavraChave ) {
                return 'rs-palavra-chave';
            }
            const depois = codigo.slice( posicao + palavra.length, posicao + palavra.length + 3 );
            if ( /^\s*\(/.test( depois ) ) {
                return 'rs-funcao';
            }
            if ( /^[A-Z]/.test( palavra ) && this.linguagem !== 'sql' ) {
                return 'rs-tipo';
            }
            return '';
        }

        marcar( classe, texto ) {
            const escapado = this.escapar( texto );
            if ( ! classe ) {
                return escapado;
            }
            return escapado
                .split( '\n' )
                .map( trecho => '<span class="' + classe + '">' + trecho + '</span>' )
                .join( '\n' );
        }

        escapar( texto ) {
            return texto
                .replace( /&/g, '&amp;' )
                .replace( /</g, '&lt;' )
                .replace( />/g, '&gt;' );
        }
    }

    Guia.componentes.RealceSintaxe = RealceSintaxe;

})( window.Guia );
