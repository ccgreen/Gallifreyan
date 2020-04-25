"use strict";
const buttons = [];

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
        var temp = ctx.lineWidth; ctx.lineWidth = 2;
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        ctx.beginPath(); ctx.rect(this.x, this.y, this.width, this.height); ctx.stroke();
        ctx.font = String(Math.floor(20 * canvasScale)) + "px Georgia";
        ctx.fillText(this.text, this.x + 8 * canvasScale, this.y + this.height - 8 * canvasScale);
        ctx.lineWidth = temp;
    }
    click(e) {
        var clickX = e.pageX - $('canvas').position().left, clickY = e.pageY - $('canvas').position().top;
        clickX = clickX * canvasScale, clickY = clickY * canvasScale;
        if (clickX > this.x && clickX < this.x + this.width && clickY > this.y && clickY < this.y + this.height) {
            resetModes();	//discard unfinished edits when toggling a new button
            this.f();
            return 1;
        }
        else return 0;
    }
}

function createGUI() {
    buttons.push(new Button(0, 0, 130, "save image", createFinalImage));
    buttons.push(new Button(0, 30, 110, "save SVG", createFinalSVG));
    buttons.push(new Button(800 - 310, 1000, 110, "line width", function() { }));
    buttons.push(new Button(800 - 310, 1030, 110, "dot size", function() { }));
    buttons.push(new Button(800 - 310, 1060, 110, "red dots", function() {dirtyRender = !dirtyRender; redraw(); }));
    buttons.push(new Button(800 - 140, 1000, 140, "delete line", function() { deleteLineMode = true; redraw(); }));
    buttons.push(new Button(800 - 140, 1030, 140, "add line", function() { addNewLine(); redraw(); }));
    buttons.push(new Button(800 - 140, 1060, 140, "toggle curve", function() { convertLineMode = true; redraw(); }));
    buttons.push(new Button(800 - 200, 1000, 30, "+",
        function() { lineWidth += 0.5; redraw(); }
    ));
    buttons.push(new Button(800 - 170, 1000, 30, "−",
        function() { lineWidth -= 0.5; if (lineWidth < 0.5) lineWidth = 0.5; redraw(); }
    ));
    buttons.push(new Button(800 - 200, 1030, 30, "+",
        function() { dotSize += 0.5; redraw(); }
    ));
    buttons.push(new Button(800 - 170, 1030, 30, "−",
        function() { dotSize -= 0.5; if (dotSize < 0.5) dotSize = 0.5; redraw(); }
    ));
    b
}

function drawGUI() {
    for (let button of buttons) {
        button.draw();
    }
    ctx.fillText("are lines correct?: " + (checkLines() ? "yes" : "no"), 10, canvasSize - 10 * canvasScale);
}
