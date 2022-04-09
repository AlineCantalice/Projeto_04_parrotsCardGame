let quantidade;
let pares;
let movidas;
let acertos;
let deck = [];
const cartas = ["images/carta_1", "images/carta_2", "images/carta_3", "images/carta_4", "images/carta_5", "images/carta_6", "images/carta_7"];

iniciarJogo();

function iniciarJogo() {
  quantidade = parseInt(prompt("Com quantas cartas você quer jogar? \n O número de cartas deve ser par e estar entre 4 e 14.")) * 2;

  while ((quantidade % 2) !== 0 || quantidade < 4 || quantidade > 14) {
    quantidade = parseInt(prompt("Com quantas cartas você quer jogar? \n O número de cartas deve ser par e estar entre 4 e 14.")) * 2;
  }

  adicionarCartas();
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
    li.innerHTML = `<div class="back face">
                      <img src="images/front.png" alt="">
                    </div>
                    <div class="front-face face"></div>`;

    if (i % 2 === 1)
      img.src = `images/carta_${((i + 1) / 2)}.gif`;
    else
      img.src = `images/carta_${i / 2}.gif`;

    li.querySelector(".front-face.face").appendChild(img);
    deck.push(li);
  }
  console.log(deck)
}

function colocarCartas() {
  let lista = document.querySelector("ul");
  deck.forEach(carta => {
    lista.appendChild(carta);
  });
}

function embaralharCartas(){
  deck.sort(function(){return Math.random() - 0.5;});
}


