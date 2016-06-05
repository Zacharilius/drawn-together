var canvasDraw = Object.create(Object.prototype);

canvasDraw.width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

canvasDraw.height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

canvasDraw.drawing = false;
canvasDraw.strokeStyle = '#888888';
canvasDraw.lineWidth = 15;
canvasDraw.lineJoin = "round";

canvasDraw.drawMoves = [];

canvasDraw.getCanvasContainer = function() {
  return document.getElementById('canvas-container');
}

canvasDraw.getCanvas = function() {
  return document.getElementById('canvas');
}

var canvasContainer = canvasDraw.getCanvasContainer();
var canvas = document.createElement('canvas');
canvas.setAttribute('width', canvasDraw.width);
canvas.setAttribute('height', canvasDraw.height);
canvas.setAttribute('id', 'canvas');
canvasContainer.appendChild(canvas);
if (typeof G_vmlCanvasManager != 'undefined') {
  canvas = G_vmlCanvasManager.initElement(canvas);
}

var canvas = canvasDraw.getCanvas();
var context = canvas.getContext("2d");

canvas.addEventListener('mousedown', function(e) {
  canvasDraw.drawing = true
  context.moveTo(e.clientX, e.clientY);
});

canvas.addEventListener('mouseup', function() {
  canvasDraw.drawing = false;
});

canvas.addEventListener('mouseleave', function() {
  canvasDraw.drawing = false;
});

canvas.addEventListener('mousemove', function(e) {
  if (canvasDraw.drawing) {
    canvasDraw.addDrawMove(e.clientX, e.clientY);
    canvasDraw.draw();
  }
});

canvasDraw.addDrawMove = function(xPosition, yPosition) {
  var newMove = {
    xPosition: xPosition,
    yPosition: yPosition,
    canvasDraw: canvasDraw.drawing,
    lineWidth: canvasDraw.lineWidth,
    lineJoin: canvasDraw.lineJoin,
    strokeStyle: canvasDraw.strokeStyle
  }
  canvasDraw.drawMoves.push(newMove);
}

canvasDraw.draw = function() {
  // Clears the canvas
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 5;
  for (var i = 0; i < canvasDraw.drawMoves.length; i++) {
    currentMove = canvasDraw.drawMoves[i];
    context.beginPath();
    if(currentMove.drawing && i) {
      context.moveTo(canvasDraw.drawMoves[i-1].xPosition, canvasDraw.drawMoves[i-1].yPosition);
    }
    else {
      context.moveTo(canvasDraw.drawMoves[i].xPosition-1, canvasDraw.drawMoves[i].yPosition);
    }
    context.lineTo(currentMove.xPosition, currentMove.yPosition);
    context.closePath();
    context.strokeStyle = currentMove.strokeStyle;
    context.stroke();
  }
}


var colorChoices = document.getElementsByClassName('color-choice');
for (var i = 0; i < colorChoices.length; i++) {
  colorChoices[i].addEventListener('click', function() {
    style = window.getComputedStyle(this);
    canvasDraw.strokeStyle = style.getPropertyValue('background-color');
  });
}

