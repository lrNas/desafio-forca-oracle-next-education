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
    ctx.fillStyle = color
    ctx.moveTo(0, 0);
    ctx.beginPath();
    ctx.beginPath();ctx.arc(x, y, raio, 0, Math.PI * 2);
    fillstroke(color);
    ctx.closePath();
}

function drawLine(xinicio, yinicio, xfim, yfim, color) {
    ctx.beginPath();
    ctx.strokeStyle = color
    ctx.moveTo(xinicio, yinicio)
    ctx.lineTo(xfim, yfim);
    ctx.stroke();
    ctx.closePath();
    
}

function drawHead(x, y, scale,color) {
    ctx.beginPath();
    drawCircle(10 * scale, x - (20 * scale), y - (80 * scale), color)
    drawCircle(8 * scale, x - (20 * scale), y - (80 * scale), "#F3F5FC")
    ctx.closePath();
    ctx.fillStyle = color;
}

function drawCadafalso(x, y, scale,color) {
    ctx.strokeStyle = color
    ctx.beginPath();
    drawLine(x, y, x - (100 * scale), y, color)
    drawLine(x - (80 * scale), y, x - (80 * scale), y - (100 * scale), color)
    drawLine(x - (80 * scale), y - (100 * scale), x - (20 * scale), y - (100 * scale), color)
    drawLine(x - (20 * scale), y - (100 * scale), x - (20 * scale), y - (90 * scale),color)
    ctx.closePath();
}

function drawArmLeg(x, y, side, scale,color) {
    ctx.strokeStyle = color
    ctx.beginPath();
    let endx = x - (40 * scale)
    if (side == "r") {
        endx = x
    }
    drawLine(x - (20 * scale), y - (70 * scale), endx, y - (45 * scale), color)
    ctx.closePath();
}
function drawBody(x, y, scale,color) {
    ctx.strokeStyle = color
    ctx.beginPath();
    xcalc = x - (20 * scale)
    drawLine(xcalc, y - (70 * scale), xcalc, y - (40 * scale), color)
    ctx.closePath();
}

function drawUnderline(x, y, scale, index,color) {
    
    ctx.beginPath();
    let calcPosition = index - 1
    let calcx = x + ((60 * scale) * calcPosition) + (index ? (5 * scale) : 0)
    let calcy = y + (60 * scale)
    drawLine(calcx, calcy, calcx + (40 * scale), calcy,color)
    ctx.closePath();
}

function drawText(text, x, y, scale, size, index,color) {
    ctx.beginPath();
    ctx.fillStyle = color
    let calcPosition = index - 1
    let calcx = x + ((60 * scale) * calcPosition) + (index ? (5 * scale) : 0)
    let calcy = y + (55 * scale)
    ctx.font = (size * scale) + 'em '+fontStyle;
    ctx.fillText(text, calcx, calcy);
    ctx.closePath();

}
function cleanText(x, y, word, scale) {
    size = word.length
    let chars = size >= errors.length ? size+1 : errors.length+1
    ctx.clearRect(x - (60 * scale), y - (10 * scale), (48 * fontSize * chars * scale), (fontSize * 96 * scale));
    errors = []
    currentRightChars = 0;
    draw = true
}
