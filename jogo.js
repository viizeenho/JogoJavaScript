var timerId = null;

function iniciarJogo(){
    var url = window.location.search;
    var nivel_jogo = url.replace("?", "");
    var tempo_jogo = 0;
/*
    if (nivel_jogo == 1) {
        tempo_jogo = 120;
    } if (nivel_jogo == 2) {
        tempo_jogo = 60;
    } if (nivel_jogo == 3) {
        tempo_jogo = 30;
    }
 */

switch (nivel_jogo) {
    case '1':
        //1 facil -> 120 segundos
        tempo_jogo= 120;
        break;
    case '2':
        //2 normal -> 60 segundos
        tempo_jogo = 60;
        break;                
    case '3':
        //3 dificil -> 30 segundos
        tempo_jogo = 30;
        break;        
    default:
        echo="erro";
        break;
}
    //inserindo segundo no Span
    document.getElementById('time').innerHTML = tempo_jogo;

    //quantidade de baloes
    var qtdeBaloes = 80;
    criar_baloes(qtdeBaloes);
    contagem_tempo(tempo_jogo + 1);
}   
    function contagem_tempo(segundos){
        segundos-=1;
        if(segundos == -1){
            clearTimeout(timerId);
            game_over();
            return false;
        }
        document.getElementById('time').innerHTML = segundos;
        timerId = setTimeout("contagem_tempo("+segundos+")",1000);
    }

    function game_over(){
        remove_eventos_baloes();
        alert("Voce não conseguiu estourar todos os baloes")
    }

    function criar_baloes(qtdeBaloes){
        for (var i= 1; i <=qtdeBaloes; i++) {
         //Criando atributo/tag html com DOM
           var balao = document.createElement("img");
           balao.src = 'imagens/balao_azul_pequeno.png';
           balao.style.margin= '10px';
           balao.id = 'b'+i;
           balao.onclick = function(){estourar(this);};
         //atribuindo baloes a div cenario
            document.getElementById('cenario').appendChild(balao);
            document.getElementById('Baloes_inteiros').innerHTML=qtdeBaloes;
            document.getElementById('Baloes_estourados').innerHTML= 0;
        }
    }

    function estourar(e){
        var id_balao = e.id;
        document.getElementById(id_balao).src='imagens/balao_azul_pequeno_estourado.png';
        document.getElementById(id_balao).setAttribute("onclick","");
        pontuacao(-1);
    }

    function pontuacao(acao){
        var baloes_estourados = document.getElementById('Baloes_estourados').innerHTML;
        var baloes_inteiro = document.getElementById('Baloes_inteiros').innerHTML;

        baloes_estourados = parseInt(baloes_estourados);
        baloes_inteiro = parseInt(baloes_inteiro);

        baloes_inteiro = baloes_inteiro + acao;
        baloes_estourados = baloes_estourados - acao;

        document.getElementById('Baloes_inteiros').innerHTML=baloes_inteiro;
        document.getElementById('Baloes_estourados').innerHTML= baloes_estourados;

        situacao_jogo(baloes_inteiro);
    }

    function situacao_jogo(baloes_inteiro){
        if (baloes_inteiro == 0) {
            clearTimeout(timerId);
            alert('PARABENS VOCÊ GANHOU');
        }
    }
    function remove_eventos_baloes() {
        var i = 1; //contado para recuperar balões por id
        
        //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
        while(document.getElementById('b'+i)) {
            //retira o evento onclick do elemnto
            document.getElementById('b'+i).onclick = '';
            i++; //faz a iteração da variávei i
        }
    }
    