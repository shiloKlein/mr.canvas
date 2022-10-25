'use strict'

let gElCanvas
let gCtx



const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


// INIT FUNCTIONS

function onInit() {
    console.log('redy to roll')
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    initDefaultFillColor()
    resizeCanvas()
    addListeners()
}
function initDefaultFillColor(){
    gCtx.fillStyle = '#ffffff'
}


//LISTENERS FUNCTIONS 

function addListeners() {
    window.addEventListener('resize', resizeCanvas)
    addMouseListeners()
    addTouchListeners()

}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', draw)
    gElCanvas.addEventListener('mousedown', startDraw)
    gElCanvas.addEventListener('mouseup', stopDraw)
    document.addEventListener('mouseup',()=>setDrawingState(false))

}
function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', draw)
    gElCanvas.addEventListener('touchstart', startDraw)
    gElCanvas.addEventListener('touchend', stopDraw)
}

function resizeCanvas() {
    console.log('resize');
    const elContainer = document.querySelector('.canvas-container')
    // Note: changing the canvas dimension this way clears the canvas
    gElCanvas.width = elContainer.offsetWidth - 50
    // Unless needed, better keep height fixed.
    // gElCanvas.height = elContainer.offsetHeight
    
}


// USER PREFERENCES FUNCTIONS

function onColorChange(value) {
    const strokeColor = document.querySelector('[name=stroke-color]').value
    const fillColor = document.querySelector('[name=fill-color]').value
    chageColor(strokeColor, fillColor)
}

function onDiameterChange(Diameter) {
    changeDiameter(Diameter)
}

function onShapeChange(shape) {
    changeShape(shape)
}
function onBgColorChange(color) {
    console.log(color);
    gCtx.fillStyle = color
    gCtx.strokeRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function onThicknessChange(thickness){
    gCtx.lineWidth=thickness
    changeThickness(thickness)
}



// DRWAING EVENT FUNCTIONS

function startDraw(ev) {
    const pos = getEvPos(ev)
    setDrawingState(true)

    draw(ev)
}

function stopDraw() {
    gCtx.beginPath()
    setDrawingState(false)
}


function draw(ev) {
   let {isDrawing ,shape } = getState()
    if (!isDrawing) return
    const pos = getEvPos(ev)

    switch (shape) {
        case 'line':

            drawLine(pos)
            break;
        case 'circle':
            console.log('circle')
            drawCircle(pos)
            break;
        case 'triangle':
            drawTriangle(pos)
            break;
        case 'rectengle':
            drawRectengle(pos)
            break;
    }
}

// SPECIFIC SHAPE DRAW FUNCTIONS

function drawLine({ x, y }) {
    const { thickness } = getState()

    gCtx.lineTo(x, y)
    gCtx.stroke()
    gCtx.moveTo(x, y)
}

function drawCircle(pos) {
    const{diameter: Diameter} = getState()
    gCtx.beginPath()
    const { x, y } = pos
    gCtx.arc(x, y, Diameter, 0, 2 * Math.PI)
    gCtx.stroke()
    gCtx.fill()
}

function drawRectengle({ x, y }) {
    gCtx.strokeRect(x, y, -75, -75)
    gCtx.fillRect(x, y, -75, -75)
}

function drawTriangle({ x, y }) {
 
    gCtx.beginPath() 
    gCtx.moveTo(x, y) 
    gCtx.lineTo(x, y + 100) 
    gCtx.lineTo(x + 100, y + 100)
    gCtx.closePath()
    gCtx.fill() 

    gCtx.stroke()
}


// HELPER FUNCTIONS

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }

    if (TOUCH_EVS.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}


// MORE FEATURS FUNCTIONS 
function clearCanvas(event) {
    event.preventDefault()
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}



