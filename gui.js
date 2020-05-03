"use strict";
const buttons = [];
var showGUI = true;

class Button {
    constructor(x, y, width, text, f) {
        this.x = x * canvasScale - 0.5;
        this.y = y * canvasScale - 0.5;
        this.width = width * canvasScale;
        this.height = 30 * canvasScale;
        this.text = text;
        this.f = f;
    }
    draw() {
        var temp = ctx.lineWidth;
        ctx.lineWidth = 2;
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.font = String(Math.floor(20 * canvasScale)) + "px Georgia";
        ctx.fillText(this.text, this.x + 8 * canvasScale, this.y + this.height - 8 * canvasScale);
        ctx.lineWidth = temp;
        this.shown = true;
    }
    click(e) {
        var clickX = e.pageX - $('canvas').position().left, clickY = e.pageY - $('canvas').position().top;
        clickX = clickX * canvasScale, clickY = clickY * canvasScale;
        if(this.shown){
            if (clickX > this.x && clickX < this.x + this.width && clickY > this.y && clickY < this.y + this.height) {
                resetModes();	//discard unfinished edits when toggling a new button
                this.f();
                return 1;
            }
        }
        else return 0;
    }
}

function createGUI() {
    buttons.push(new Button(0, 0, 130, "toggle gui", function() {showGUI = !showGUI; redraw(); }));
    buttons.push(new Button(0, 30, 130, "save image", createFinalImage));
    buttons.push(new Button(0, 60, 110, "save SVG", createFinalSVG));
    buttons.push(new Button(30, 90, 110, "line width", function() { }));
    buttons.push(new Button(30, 120, 110, "dot size", function() { }));
    buttons.push(new Button(30, 150, 110, "dot radius", function() { }));
    buttons.push(new Button(0, 180, 140, "delete line", function() { deleteLineMode = true; redraw(); }));
    buttons.push(new Button(0, 210, 140, "add line", function() { addNewLine(); redraw(); }));
    buttons.push(new Button(0, 240, 140, "toggle curve", function() { convertLineMode = true; redraw(); }));
    buttons.push(new Button(140, 90, 30, "+",
        function() { lineWidth += 0.5; redraw(); }
    ));
    buttons.push(new Button(0, 90, 30, "−",
        function() { lineWidth -= 0.5; if (lineWidth < 0.5) lineWidth = 0.5; redraw(); }
    ));
    buttons.push(new Button(140, 120, 30, "+",
        function() { dotSize += 0.5; redraw(); }
    ));
    buttons.push(new Button(0, 120, 30, "−",
        function() { dotSize -= 0.5; if (dotSize < 0.5) dotSize = 0.5; redraw(); }
    ));
    buttons.push(new Button(140, 150, 30, "+",
        function() { dotRadius += 0.5; redraw(); }
    ));
    buttons.push(new Button(0, 150, 30, "−",
        function() { dotRadius -= 0.5; if (dotRadius < 0.5) dotRadius = 0.5; redraw(); }
    ));
}

function GUIText(text) {
    ctx.fillText(text, 10, canvasSize - 10 * canvasScale);
}

function drawGUI() {
    if (dirtyRender) {
        if(showGUI){
            ctx.clearRect(0, 0, sideBarWidth, canvasSize);
            ctx.clearRect(canvasSize + sideBarWidth, 0, sideBarWidth, canvasSize);
            for (let button of buttons) {
                button.draw();
            }
            if(selectedCircle != null){
                GUIText("Scroll to change circle size");
            } else {
                GUIText("are lines correct?: " + (checkLines() ? "yes" : "no"));
            }
        } else {
            for (let button of buttons) {
                button.shown = false;
                ctx.clearRect(0, 0, buttons[0].width, buttons[0].height);
            }
            buttons[0].draw();
        }
    } else {
        for (let button of buttons) {
            button.shown = false;
        }
    }
}
