let coordTranslation = {
    x: 0,
    y: 0
}

let scale = {
    x: 1,
    y: 1
}

const MAX_CIRCLE_RADIUS = 4000;



let mouseX, mouseY;

function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
    window.requestAnimationFrame(redraw);
}

function initDrawing() {
    coordTranslation.x = canvas.width / 2;
    coordTranslation.y = canvas.height / 2;

    scale.x = (canvas.width / 2) / MAX_CIRCLE_RADIUS;
    scale.y = (canvas.height / 2) / MAX_CIRCLE_RADIUS;
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function drawCross(centerX, centerY, strokeColor, highlighted, crossSizePx = 6, lineWidth = 3) {

    centerX = (centerX * scale.x) + coordTranslation.x;
    centerY = (centerY * (-scale.y)) + coordTranslation.y;


    canvasContext.beginPath();

    canvasContext.shadowColor = SHADOW_COLOR;
    canvasContext.shadowBlur = (highlighted) ? 7 : 0;

    canvasContext.fillStyle = strokeColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, crossSizePx, 0, Math.PI * 2, true);
    canvasContext.lineWidth = lineWidth;
    canvasContext.fill();

    
}

function colorCircle(centerX, centerY, radius, strokeColor, highlighted, lineWidth = 3) {
    centerX = (centerX + coordTranslation.x);
    centerY = (centerY + coordTranslation.y);
    radius = radius * scale.x;
    canvasContext.shadowColor = SHADOW_COLOR;
    canvasContext.shadowBlur = (highlighted) ? 2 : 0;

    canvasContext.strokeStyle = strokeColor;

    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.lineWidth = lineWidth;
    canvasContext.stroke();
}

function colorText(showWords, textX, textY, fillColor, fontWeight = 18) {
    canvasContext.fillStyle = fillColor;
    canvasContext.font = fontWeight+"px Arial";
    canvasContext.shadowBlur = 0;
    canvasContext.fillText(showWords, textX, textY);
}



function drawCoordSystem(startX = 250, startY=250, arrowLen = 25, endArrowLen = 6){
	canvasContext.lineWidth = 1.5;
    canvasContext.beginPath();
	canvasContext.moveTo(startX, startY);
    canvasContext.lineTo(startX, startY - arrowLen);
    canvasContext.moveTo(startX - endArrowLen * 0.6, startY - arrowLen + endArrowLen);
    canvasContext.lineTo(startX, startY - arrowLen);
    canvasContext.lineTo(startX + endArrowLen * 0.6, startY - arrowLen + endArrowLen);
    canvasContext.strokeStyle = 'red';
    canvasContext.stroke();

    canvasContext.beginPath();
	canvasContext.moveTo(startX, startY);
    canvasContext.lineTo(startX + arrowLen, startY);
    canvasContext.moveTo(startX + arrowLen - endArrowLen, startY + endArrowLen * 0.6);
    canvasContext.lineTo(startX + arrowLen, startY);
    canvasContext.lineTo(startX + arrowLen - endArrowLen, startY - endArrowLen * 0.6);
    canvasContext.strokeStyle = 'green';
    

	// set line color
    canvasContext.stroke();
    
    colorText('Y',startX + endArrowLen, startY - arrowLen, 'red',12);
    colorText('X',startX + arrowLen, startY - endArrowLen, 'green',12);
    drawCross(0, 0,'black',false,2);


}

function hitTest(objects){
    let noObjectFound = true;

    for (let object of objects) {
        //Draw the current object
        object.draw();
        //Check if the mouse is on top of it
        if (noObjectFound && canvasContext.isPointInPath(mouseX, mouseY)) {
            object.draw(highlighted = true);
            noObjectFound = false;
            let desc = `Zaznaczono: ${object.name}`;
            let desc2 = `${object.description}`;
            colorText(desc,25 , 25, 'black');
            colorText(desc2,25 , 50, 'black');
        }
    }
}

