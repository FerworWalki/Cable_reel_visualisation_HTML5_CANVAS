
var canvas, canvasContext;

const CIRCLE_COLOR = 'gray';
const HOLE_COLOR = 'lightslategray';
const BACKGROUND_COLOR = 'whitesmoke';
const SHADOW_COLOR = 'blue';

const DISPLAY_DESC_OFFSET = 5;

function setDefaults() {

    drawing = {
        r1: 3000,
        r2: 1000,
        hole_cnt: 2,
        y1: 1500,
        y2: -1500
    }

    $('#r1').val(drawing.r1);
    $('#r2').val(drawing.r2);
    $('#hole').val(drawing.hole_cnt);
    $('#y1').val(drawing.y1);
    $('#y2').val(drawing.y2);
}



window.onload = function () {
    canvas = document.getElementById('myCanvas');
    canvasContext = canvas.getContext('2d');

    $('#set-values').click(functionSetValuesClick);

    canvas.addEventListener('click', updateMousePos);

    setDefaults();

    initDrawing();

    redraw();
}

function functionSetValuesClick() {

    drawing.r1 = parseInt($('#r1').val());
    drawing.r2 = parseInt($('#r2').val());
    drawing.hole_cnt = parseInt($('#hole').val());
    drawing.y1 = parseInt($('#y1').val());
    drawing.y2 = parseInt($('#y2').val());

    redraw();

}



function redraw() {
    colorRect(0, 0, canvas.width, canvas.height, BACKGROUND_COLOR);
    
    
    drawCoordSystem();
    let objects = [
        {
            "name": "Otwór 1",
            "description" : `O1: X=0, Y=${-drawing.y1} [mm]`,
            "draw": (highlighted) => {
                drawCross(0, drawing.y1, HOLE_COLOR, highlighted);
            }
        },

        {
            "name": "Otwór 2",
            "description" : `O2: X=0, Y=${-drawing.y2} [mm]`,
            "draw": (highlighted) => {

                drawCross(0, drawing.y2, HOLE_COLOR, highlighted);
            }
        },
        {
            "name": "Okrąg wewnętrzny", 
            "description" : `R2 = ${drawing.r2} mm`,
            "draw": (highlighted) => {

                colorCircle(0, 0, drawing.r2, CIRCLE_COLOR, highlighted);
            }
        },
        {
            "name": "Okrąg zewnętrzny", 
            "description" : `R1 = ${drawing.r1} mm`,
            "draw": (highlighted) => {
                colorCircle(0, 0, drawing.r1, CIRCLE_COLOR, highlighted);
            }
        }
    ];

    hitTest(objects);

    
}







