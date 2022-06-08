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
        drawText("Sucesso!", mainx, y, scale, fontSize, messagePosition,'red')
        exibitionSwitch();
        gameOver = true
        success = true
    }
    else {
        word = palavras[actualWord]
        size = word.length
        console.log(word)
        console.log(size)
        for (let i = 0; i < size; i++) {
            drawUnderline(x, y, scale, i)
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
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawText("Você perdeu!", mainx, y, scale, fontSize, messagePosition,'red')
            }
            gameOver=false
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
                    drawArmLeg(x, y + (30 * scale), "l", scale)
                    gameOver = true;
                case 5:
                    drawArmLeg(x, y + (30 * scale), "r", scale)
                case 4:
                    drawArmLeg(x, y, "l", scale)
                case 3:
                    drawArmLeg(x, y, "r", scale)
                case 2:
                    drawBody(x, y, scale)
                case 1:
                    drawHead(x, y, scale)
                case 0:
                    drawCadafalso(x, y, scale);
                    break;
            }
            draw = false;
        }
    }, 100)
}


function startGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // limpar mensagem
    // zerar variáveis
    errors = [];
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
    let letter = event.key
    if (!gameOver) {
        let current = rightChars.indexOf(letter)
        if(current<0){
            let indexes = getIndexes(palavras[actualWord], letter)
            for (index of indexes) {
                if (index > -1 ) {
                    drawText(letter, mainx, mainy, scale, fontSize, index)
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
    // remover acentos e colocar tudo lowercase
    palavras.push(input.value)
    input.value = ""
    console.log(palavras)
})


iniciar.addEventListener("click", () => {
    // Só ficar disponível se tiver uma palavra.
    startGame()
}
)
