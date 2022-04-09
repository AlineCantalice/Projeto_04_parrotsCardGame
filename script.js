/*
* DECLARAÇÃO DE VARIÁVEIS GLOBAIS
*/
let quantidade;
let quantidadeViradas;
let rodadas;
let primeiraCarta;
let deck;
let lockClick;

// CHAMADA DA FUNÇÃO QUE INICIA O JOGO
iniciarJogo();

/*
* FUNÇÃO QUE INICIA O JOGO
*/
function iniciarJogo() {
  // Inicia as variáveis
  document.querySelector("ul").innerHTML = '';
  rodadas = 0;
  primeiraCarta = null;
  deck = [];
  quantidadeViradas = 0;

  // Pergunta a quantidade de cartas e atribui a variável quantidade
  quantidade = parseInt(prompt("Com quantas cartas deseja jogar? \n O número de cartas deve ser par e estar entre 4 e 14."));

  // Pergunta pela quantidade enquanto valores informados são incorretos
  while ((quantidade % 2) !== 0 || quantidade < 4 || quantidade > 14) {
    quantidade = parseInt(prompt("Com quantas cartas deseja jogar? \n O número de cartas deve ser par e estar entre 4 e 14."));
  }

  // Camada de funções necessárias
  adicionarCartas();
  embaralharCartas();
  colocarCartas();
}

/* 
* FUNÇÃO RESPONSÁVEL POR ADICIONAR AS CARTAS A LISTA (LI)
*/
function adicionarCartas() {
  let li;
  let img;

  //cria novas li de acordo com a quantidade desejada
  for (let i = 1; i <= quantidade; i++) {
    li = document.createElement("li");
    img = document.createElement("img");
    li.classList.add("carta");
    li.setAttribute("data-identifier", "carta");
    li.innerHTML = `<div class="back-face face">
                      <img src="images/front.png" alt="">
                    </div>
                    <div class="front-face face"></div>`;

    // divide a quantidade antes de adicionar, pois precisa de 2 cartas de cada tipo
    if (i % 2 === 1)
      img.src = `images/carta_${((i + 1) / 2)}.gif`;
    else
      img.src = `images/carta_${i / 2}.gif`;

    li.querySelector(".front-face.face").appendChild(img);
    li.addEventListener("click", virarCarta);
    deck.push(li);
  }
}

/*
* FUNÇÃO RESPONSÁVEL POR COLOCAR AS CARTAS NA (UL) E APRESENTA-LAS NA TELA
*/
function colocarCartas() {
  let lista = document.querySelector("ul");
  deck.forEach(carta => {
    lista.appendChild(carta);
  });
}

/*
* FUNÇÃO RESPONSAVEL POR EMBARALHAR AS CARTAS 
*/
function embaralharCartas() {
  deck.sort(function () {
    return Math.random() - 0.5;
  });
}

/*
* FUNÇÃO RESPONSAVEL POR VIRAR AS CARTAS QUE FOREM CLICADAS
*/
function virarCarta(event) {

  // verifica se as cartas podem ser clicadas
  if (lockClick) {
    return;
  }

  let carta = event.currentTarget;

  carta.querySelector(".front-face.face").classList.add("show");
  carta.querySelector(".back-face.face").classList.add("show");

  quantidadeViradas = document.querySelectorAll(".show").length / 2;

  // atualiza o número de jogadas
  if (quantidadeViradas % 2 === 0 && quantidadeViradas !== 0) {
    rodadas++;

    if (carta.querySelector(".front-face.face img").src !== primeiraCarta.querySelector(".front-face.face img").src) {
      // desvira a carta depois de 1s
      desvirarCarta(carta);
    } else {
      // modifica o background do ṕar correto
      manterCartaCorreta(carta);
      // verifica se o jogo foi concluido
      setTimeout(verificarFimJogo, 300);
    }
  } else {
    primeiraCarta = carta;
  }
}

/*
* FUNÇÃO RESPONSAVEL POR DESVIRAR AS CARTAS ABERTAS 
*/
function desvirarCarta(carta) {

  // libera o click a carta
  lockClick = true;

  setTimeout(() => {
    carta.querySelector(".front-face.face").classList.remove("show");
    carta.querySelector(".back-face.face").classList.remove("show");
    primeiraCarta.querySelector(".front-face.face").classList.remove("show");
    primeiraCarta.querySelector(".back-face.face").classList.remove("show");

    // bloqueia os clicks por 1s
    lockClick = false;
  }, 1000);
}

/*
* FUNÇÃO RESPONSÁVEL POR VERIFICAR SE É O FIM DO JOGO
*/
function verificarFimJogo() {
  let viradas = document.querySelectorAll(".show").length / 2;
  let escolha;

  // compara as cartas viradas com a quantidade de cartas no jogo
  if (viradas === quantidade) {
    escolha = prompt(`Você ganhou em ${rodadas} jogadas! Deseja jogar novamente? (sim/não)`);
    escolha.toLowerCase();
    if (escolha === 'sim'){
      alert(`Vamos lá!`);
      // inicia novamente o jogo
      iniciarJogo();
    } else{
      if (escolha === 'não' || escolha === 'nao'){
        alert(`Volte sempre!`);
      }
    } 
  }
}

/*
* FUNÇÃO RESPONSAVEL POR DESATIVAR O CLICK DAS CARTAS CORRETAS E MODIFICA SEUS BACKGROUND
*/
function manterCartaCorreta(carta) {
  let carta1 = carta.querySelector(".front-face.face.show");
  let carta2 = primeiraCarta.querySelector(".front-face.face.show");
  carta.removeEventListener('click', virarCarta);
  carta1.classList.add("correct");
  primeiraCarta.removeEventListener('click', virarCarta);
  carta2.classList.add("correct");
}