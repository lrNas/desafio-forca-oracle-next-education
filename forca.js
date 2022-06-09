function nextWord(x, y, scale) {
    actualWord++
    rightChars=[]
    let index = actualWord - 1 < 0 ? 0 : actualWord - 1
    word = palavras[index]
    size = word.length
    cleanText(x, y, word, scale)
    if (actualWord >= palavras.length) {
        // limpar texto e colocar mensagem de sucesso
        points = 0
        draw = false
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        alert("Você venceu!")
        lista.style.display="flex"
        canvas.style.display="none"
        lista.innerHTML=""
        exibitionSwitch();
        iniciar.disabled=true
        gameOver = true
        success = true
    }
    else {
        word = palavras[actualWord]
        size = word.length
        console.log(word)
        console.log(size)
        for (let i = 0; i < size; i++) {
            drawUnderline(x, y, scale, i,strokeColor)
        }
    }
}

function exibitionSwitch() {
    gameOver=!gameOver
    let display = gameOver ? "flex" : "none"
    adicionarPalavra.style.display = display
    input.style.display = display
    iniciar.style.display = display
    points = []
}

function startChecker(x, y, scale) {
    let checker = setInterval(() => {
        let item = errors.length
        if (gameOver) {
            palavras = []
            // função game over
            if(!success){
                iniciar.disabled=true
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                alert("Game over!")
            }
            gameOver=false
            canvas.style.display="none"
        lista.style.display="flex"
            lista.innerHTML=""
            exibitionSwitch();
            clearInterval(checker);
        }
        else {
            if (currentRightChars >= size) {

                nextWord(x, y, scale)
            }
        }
        if (draw) {
            switch (item) {
                case 6:
                    drawArmLeg(x, y + (30 * scale), "l", scale,strokeColor)
                    gameOver = true;
                case 5:
                    drawArmLeg(x, y + (30 * scale), "r", scale,strokeColor)
                case 4:
                    drawArmLeg(x, y, "l", scale,strokeColor)
                case 3:
                    drawArmLeg(x, y, "r", scale,strokeColor)
                case 2:
                    drawBody(x, y, scale,strokeColor)
                case 1:
                    drawHead(x, y, scale,strokeColor)
                case 0:
                    drawCadafalso(x, y, scale,strokeColor);
                    break;
            }
            draw = false;
        }
    }, 100)
}


function startGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.display="flex"
    // limpar mensagem
    // zerar variáveis
    errors = [];
    lista.style.display="none"
    draw = true;
    actualWord = -1
    erroLetterIndex = 0
    rightChars = []
    currentRightChars = 0
    word = ""
    size = 0
    fontStyle = "serif"
    messagePosition = 5
    success=false
    exibitionSwitch()
    nextWord(mainx, mainy, scale)
    startChecker(mainx, mainy, scale);
}

function getIndexes(array, element) {
    let indexes = [];
    var idx = array.indexOf(element);
    while (idx != -1) {
        indexes.push(idx);
        idx = array.indexOf(element, idx + 1);
    }
    return indexes
}

document.addEventListener("keypress", async event => {
    // colocar uppercase
    let letter = event.key.toUpperCase()
    if (!gameOver) {
        let current = rightChars.indexOf(letter)
        let erro = errors.indexOf(letter)
        if(current<0&& erro<0){
            let indexes = getIndexes(palavras[actualWord], letter)
            for (index of indexes) {
                if (index > -1 ) {
                    drawText(letter, mainx, mainy, scale, fontSize, index, strokeColor)
                    rightChars.push(letter)
                    currentRightChars++
                }
            }
            if (indexes.length == 0) {
                errors.push(letter)
                let index = errors.length - 1
                let y = mainy + (45 * scale)
                drawText(letter, mainx, y, scale, fontSize, index)
                draw = true
            }
        }
    }
})

adicionarPalavra.addEventListener("click", () => {
    // remover acentos
    // desabilitar botão iniciar jogo se não tiver palavras cadastradas
    let texto = input.value.toUpperCase()
    input.value = ""
    if(!(texto=="")){
        iniciar.disabled = false
        var li = document.createElement("li");
        li.textContent=texto
        lista.appendChild(li);
        palavras.push(texto)
    }
})


iniciar.addEventListener("click", () => {
    // Só ficar disponível se tiver uma palavra.
    startGame()
}
)
