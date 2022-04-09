let quantidade;
let quantidadeViradas;
let rodadas;
let primeiraCarta;
let deck = [];

iniciarJogo();

function iniciarJogo() {
  quantidade = parseInt(prompt("Com quantas cartas você quer jogar? \n O número de cartas deve ser par e estar entre 4 e 14.")) * 2;

  while ((quantidade % 2) !== 0 || quantidade < 4 || quantidade > 14) {
    quantidade = parseInt(prompt("Com quantas cartas você quer jogar? \n O número de cartas deve ser par e estar entre 4 e 14.")) * 2;
  }

  adicionarCartas();
  embaralharCartas();
  colocarCartas();
}

function adicionarCartas() {
  let li;
  let img;

  for (let i = 1; i <= quantidade; i++) {
    li = document.createElement("li");
    img = document.createElement("img");
    li.classList.add("carta");
    li.setAttribute("data-identifier", "carta");
    li.innerHTML = `<div class="back-face face">
                      <img src="images/front.png" alt="">
                    </div>
                    <div class="front-face face"></div>`;

    if (i % 2 === 1)
      img.src = `images/carta_${((i + 1) / 2)}.gif`;
    else
      img.src = `images/carta_${i / 2}.gif`;

    li.querySelector(".front-face.face").appendChild(img);
    li.addEventListener("click", virarCarta);
    deck.push(li);
  }
}

function colocarCartas() {
  let lista = document.querySelector("ul");
  deck.forEach(carta => {
    lista.appendChild(carta);
  });
}

function embaralharCartas() {
  deck.sort(function () {
    return Math.random() - 0.5;
  });
}

function virarCarta(event) {
  let carta = event.currentTarget;

  carta.querySelector(".front-face.face").classList.add("show");
  carta.querySelector(".back-face.face").classList.add("show");

  quantidadeViradas = document.querySelectorAll(".show").length / 2;

  if (quantidadeViradas % 2 === 0 && quantidadeViradas !== 0) {
    rodadas++;

    if (carta.querySelector(".front-face.face img").src !== primeiraCarta.querySelector(".front-face.face img").src) {
      setTimeout(desvirarCarta, 1000, carta);
    } else {

    }
  } else {
    primeiraCarta = carta;
  }
}

function desvirarCarta(carta) {
  carta.querySelector(".front-face.face").classList.remove("show");
  carta.querySelector(".back-face.face").classList.remove("show");
  primeiraCarta.querySelector(".front-face.face").classList.remove("show");
  primeiraCarta.querySelector(".back-face.face").classList.remove("show");
}


