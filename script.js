function iniciarJogo() {
    let quantidade = parseInt(prompt("Com quantos pares de cartas quer jogar? [2 - 7 pares]?")) * 2;

    while ((quantidade % 2) !== 0 || quantidade < 4 || quantidade > 14) {
        quantidade = parseInt(prompt("Com quantos pares de cartas quer jogar? [2 - 7 pares]?")) * 2;
    }
}

iniciarJogo();


