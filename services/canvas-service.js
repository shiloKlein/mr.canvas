'use strict'

const gState = {
    shape: 'line',
    diameter: 40,
    thickness: 1,
    isDrawing: false,

}

function setDrawingState(boolean) {
    gState.isDrawing = boolean
}
function getState() {
    return gState
}
function chageColor(strokeColor, fillColor) {
    console.log(gCtx);
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = fillColor
    return fillColor
}

function changeDiameter(diameter) {
    gState.diameter = +diameter
}

function changeShape(shape) {
    gState.shape = shape

}
function changeThickness(thickness) {
    gState.thickness = thickness
}

function changeSettings(ev) {

}

