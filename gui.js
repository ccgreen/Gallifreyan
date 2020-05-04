"use strict";
const buttons = [];
const simpleButtons = [];
const advancedButtons = [];
var showGUI = true;
var simpleGUI = true;

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
    //main GUI
    buttons.push(new Button(0, 0, 130, "toggle gui", function() {showGUI = !showGUI; redraw(); }));
    buttons.push(new Button(0, 30, 130, "save image", createFinalImage));
    buttons.push(new Button(0, 60, 110, "save SVG", createFinalSVG));

    //Simple GUI
    simpleButtons.push(new Button(0, (canvasSize / canvasScale) - 60, 160, "advanced mode", function() { simpleGUI = false; redraw();}));
    simpleButtons.push(new Button(rightSideBar + 30, 0, 140, "line width", function() { }));
    simpleButtons.push(new Button(rightSideBar + 30, 30, 140, "dot size", function() { }));
    simpleButtons.push(new Button(rightSideBar + 30, 60, 140, "dot radius", function() { }));
    simpleButtons.push(new Button(rightSideBar + 30, 90, 140, "delete line", function() { deleteLineMode = true; redraw(); }));
    simpleButtons.push(new Button(rightSideBar + 30, 120, 140, "add line", function() { addNewLine(); redraw(); }));
    simpleButtons.push(new Button(rightSideBar + 30, 150, 140, "toggle curve", function() { convertLineMode = true; redraw(); }));
    simpleButtons.push(new Button(rightSideBar + 170, 0, 30, "+", function() { lineWidth += 0.5; redraw(); }));
    simpleButtons.push(new Button(rightSideBar, 0, 30, "−", function() { lineWidth -= 0.5; if (lineWidth < 0.5) lineWidth = 0.5; redraw(); }));
    simpleButtons.push(new Button(rightSideBar + 170, 30, 30, "+", function() { dotSize += 0.5; redraw(); }));
    simpleButtons.push(new Button(rightSideBar, 30, 30, "−", function() { dotSize -= 0.5; if (dotSize < 0.5) dotSize = 0.5; redraw(); }));
    simpleButtons.push(new Button(rightSideBar + 170, 60, 30, "+", function() { dotRadius += 0.5; redraw(); }));
    simpleButtons.push(new Button(rightSideBar, 60, 30, "−", function() { dotRadius -= 0.5; if (dotRadius < 0.5) dotRadius = 0.5; redraw(); }));

    //Complex GUI
    advancedButtons.push(new Button(0, (canvasSize / canvasScale) - 60, 160, "simple mode", function() { simpleGUI = true; redraw(); }));

}

function GUIText(text) {
    ctx.fillText(text, 5, canvasSize - 10 * canvasScale);
}

function drawGUI() {
    if (dirtyRender) {
        if(showGUI){
            var tempLineWidth = ctx.lineWidth;
            ctx.lineWidth = 2.5;
            //Clear left side and add border
            ctx.clearRect(0, 0, sideBarWidth, canvasSize);
            ctx.beginPath();
            ctx.moveTo(sideBarWidth, 0);
            ctx.lineTo(sideBarWidth, canvasSize);
            ctx.stroke();
            //Clear right side and add border
            ctx.clearRect(canvasSize + sideBarWidth, 0, sideBarWidth, canvasSize);
            ctx.beginPath();
            ctx.moveTo(canvasSize + sideBarWidth, 0);
            ctx.lineTo(canvasSize + sideBarWidth, canvasSize);
            ctx.stroke();

            ctx.lineWidth = tempLineWidth;

            for (let button of buttons) {
                button.draw();
            }

            if(simpleGUI){
                for (let button of simpleButtons) {
                    button.draw();
                }
                for (let button of advancedButtons) {
                    button.shown = false;
                }
            } else {
                for (let button of simpleButtons) {
                    button.shown = false;
                }
                for (let button of advancedButtons) {
                    button.draw();
                }
            }

            if(selectedCircle != null){
                GUIText("Scroll to change circle size");
            } else {
                GUIText("are lines correct?: " + (checkLines() ? "yes" : "no"));
            }

        } else {
            for (let button of buttons) {
                button.shown = false;
            }
            ctx.clearRect(0, 0, buttons[0].width, buttons[0].height);
            buttons[0].draw();
        }
    } else {
        for (let button of buttons) {
            button.shown = false;
        }
    }
}
