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
