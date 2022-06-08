const adicionarPalavra = document.getElementById("nova-palavra")
const input = document.getElementById("input-nova-palavra")
const iniciar = document.getElementById("iniciar-jogo")
const palavras = []
let errors = [];
const canvas = document.getElementById("forca");
let ctx = canvas.getContext('2d');
let draw = true;
let gameOver = true;
let actualWord = -1
let erroLetterIndex = 0
let scale = 1
let mainx = 100 * scale
let mainy = 100 * scale
let fontSize = 48
let rightChars = []
let currentRightChars = 0
let word = ""
let size = 0
let success = false
let fontStyle = "serif"
let messagePosition = 5

function fillstroke(color) {
    // Preenche o círculo
    if (color == null) {
        ctx.stroke();
    }
    else {
        ctx.fill();
    }
    ctx.closePath();
}

function drawCircle(raio, x, y, color) {
    ctx.moveTo(0, 0);
    ctx.beginPath();
    ctx.fillStyle = color;
    // Para Circulos
    // Inicia caminho de um circulo
    ctx.beginPath();
    // Define o círculo como iniciando em 100X, 50Y, 20 de raio. angulo inicial 0, angulo final 2*pi (angulos em rad)
    ctx.arc(x, y, raio, 0, Math.PI * 2);
    // Fecha o circulo
    fillstroke(color);
    ctx.closePath();
}

function drawLine(xinicio, yinicio, xfim, yfim, color) {
    ctx.beginPath();
    ctx.fillStyle = color
    ctx.moveTo(xinicio, yinicio)
    ctx.lineTo(xfim, yfim);
    ctx.stroke();
    ctx.closePath();
}

function drawHead(x, y, scale) {
    ctx.beginPath();
    drawCircle(10 * scale, x - (20 * scale), y - (80 * scale), "black")
    drawCircle(8 * scale, x - (20 * scale), y - (80 * scale), "white")
    ctx.closePath();
}

function drawCadafalso(x, y, scale) {
    ctx.beginPath();
    drawLine(x, y, x - (100 * scale), y, "black")
    drawLine(x - (80 * scale), y, x - (80 * scale), y - (100 * scale), "black")
    drawLine(x - (80 * scale), y - (100 * scale), x - (20 * scale), y - (100 * scale), "black")
    drawLine(x - (20 * scale), y - (100 * scale), x - (20 * scale), y - (90 * scale), "black")
    ctx.closePath();
}

function drawArmLeg(x, y, side, scale) {
    ctx.beginPath();
    let endx = x - (40 * scale)
    if (side == "r") {
        endx = x
    }
    drawLine(x - (20 * scale), y - (70 * scale), endx, y - (45 * scale), "black")
    ctx.closePath();
}
function drawBody(x, y, scale) {
    ctx.beginPath();
    xcalc = x - (20 * scale)
    drawLine(xcalc, y - (70 * scale), xcalc, y - (40 * scale), "black")
    ctx.closePath();
}

function drawUnderline(x, y, scale, index) {
    ctx.beginPath();
    let calcPosition = index - 1
    let calcx = x + ((60 * scale) * calcPosition) + (index ? (5 * scale) : 0)
    let calcy = y + (60 * scale)
    drawLine(calcx, calcy, calcx + (40 * scale), calcy, "black")
    ctx.closePath();
}

function drawText(text, x, y, scale, size, index,color='black') {
    ctx.beginPath();

    ctx.fillStyle = color
    let calcPosition = index - 1
    let calcx = x + ((60 * scale) * calcPosition) + (index ? (5 * scale) : 0)
    let calcy = y + (55 * scale)
    ctx.font = (size * scale) + 'px '+fontStyle;
    ctx.fillText(text, calcx, calcy);
    ctx.closePath();

}
function cleanText(x, y, word, scale) {
    size = word.length
    let chars = size >= errors.length ? size+1 : errors.length+1
    
    ctx.clearRect(x - (60 * scale), y - (10 * scale), (2 * fontSize * chars * scale), (fontSize * 4 * scale));
    errors = []
    currentRightChars = 0;
    draw = true
}


function nextWord(x, y, scale) {
    actualWord++
    rightChars=[]
    let index = actualWord - 1 < 0 ? 0 : actualWord - 1
    word = palavras[index]
    size = word.length
    cleanText(x, y, word, scale)
    if (actualWord >= palavras.length) {
        // limpar texto e colocar mensagem de sucesso
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
            // função game over
            if(!success){
                cleanText(x, y, word, scale)
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
    // limpar mensagem
    // zerar variáveis
    points=0
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
    // colocar lowercase
    let letter = event.key
    if (!gameOver) {
        // se tecla está em array então printa letra
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
