"use strict";
const buttons = [];
const simpleButtons = [];
const advancedButtons = [];
const advancedButtonsLines = [];
const advancedButtonsColors = [];
const advancedButtonsColorsCircle = [];
const advancedButtonsColorsLine = [];
const advancedButtonsColorsDot = [];
const advancedButtonsColorsBackground = [];

var showGUI = true;
var simpleGUI = true;
var advancedGUImode = "lines";


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

    buttons.push(new Button(30, 120, 140, "line width", function() { }));
    buttons.push(new Button(30, 150, 140, "dot size", function() { }));
    buttons.push(new Button(30, 180, 140, "dot radius", function() { }));
    buttons.push(new Button(170, 120, 30, "+", function() { lineWidth += 0.5; redraw(); }));
    buttons.push(new Button(0, 120, 30, "−", function() { lineWidth -= 0.5; if (lineWidth < 0.5) lineWidth = 0.5; redraw(); }));
    buttons.push(new Button(170, 150, 30, "+", function() { dotSize += 0.5; redraw(); }));
    buttons.push(new Button(0, 150, 30, "−", function() { dotSize -= 0.5; if (dotSize < 0.5) dotSize = 0.5; redraw(); }));
    buttons.push(new Button(170, 180, 30, "+", function() { dotRadius += 0.5; redraw(); }));
    buttons.push(new Button(0, 180, 30, "−", function() { dotRadius -= 0.5; if (dotRadius < 0.5) dotRadius = 0.5; redraw(); }));


    //Simple GUI
    simpleButtons.push(new Button(0, (canvasSize / canvasScale) - 60, 160, "advanced mode", function() { simpleGUI = false; redraw();}));

    //Complex GUI
    advancedButtons.push(new Button(0, (canvasSize / canvasScale) - 60, 160, "simple mode", function() { simpleGUI = true; redraw(); }));
    advancedButtons.push(new Button(rightSideBar + 0, 0, 200, "Menus", function() { }));
    advancedButtons.push(new Button(rightSideBar + 30, 30, 140, "Lines", function() { advancedGUImode = "lines"; redraw();}));
    advancedButtons.push(new Button(rightSideBar + 30, 60, 140, "Colors", function() {
        switch(advancedGUImode){
            case "colorCircles":
            case "colorDots":
            case "colorLines":
                break;
            default:
                advancedGUImode = "colorCircles";
                break;
        }
        redraw();
    }));

    advancedButtonsLines.push(new Button(rightSideBar + 30, 120, 140, "delete line", function() { deleteLineMode = true; redraw(); }));
    advancedButtonsLines.push(new Button(rightSideBar + 30, 150, 140, "add line", function() { addNewLine(); redraw(); }));
    advancedButtonsLines.push(new Button(rightSideBar + 30, 180, 140, "toggle curve", function() { convertLineMode = true; redraw(); }));

    advancedButtonsColors.push(new Button(rightSideBar + 30, 120, 140, "Circle color", function() { advancedGUImode = "colorCircles"; redraw();}));
    advancedButtonsColors.push(new Button(rightSideBar + 30, 150, 140, "Dot color", function() { advancedGUImode = "colorDots"; redraw();}));
    advancedButtonsColors.push(new Button(rightSideBar + 30, 180, 140, "Line color", function() { advancedGUImode = "colorLines"; redraw();}));
    advancedButtonsColors.push(new Button(rightSideBar + 30, 210, 140, "Background", function() { advancedGUImode = "colorBackground"; redraw();}));

    var height = 270
    advancedButtonsColorsCircle.push(new Button(rightSideBar + 0, height, 200, "Circle color", function() { }));
    advancedButtonsColorsCircle.push(new Button(rightSideBar + 0, height + 30, 200, "Red", function() { }));
    advancedButtonsColorsCircle.push(new Button(rightSideBar + 0, height + 60, 100, "-50", function() { colors.circleRed -= 50; if(colors.circleRed < 0){colors.circleRed = 0;} redraw();}));
    advancedButtonsColorsCircle.push(new Button(rightSideBar + 100, height + 60, 100, "+50", function() { colors.circleRed += 50; if(colors.circleRed > 255){colors.circleRed = 255;} redraw();}));
    advancedButtonsColorsCircle.push(new Button(rightSideBar + 0, height + 90, 50, "-10", function() { colors.circleRed -= 10; if(colors.circleRed < 0){colors.circleRed = 0;} redraw();}));
    advancedButtonsColorsCircle.push(new Button(rightSideBar + 50, height + 90, 50, "-1", function() { colors.circleRed -= 1; if(colors.circleRed < 0){colors.circleRed = 0;} redraw();}));
    advancedButtonsColorsCircle.push(new Button(rightSideBar + 100, height + 90, 50, "+10", function() { colors.circleRed += 10; if(colors.circleRed > 255){colors.circleRed = 255;} redraw();}));
    advancedButtonsColorsCircle.push(new Button(rightSideBar + 150, height + 90, 50, "+1", function() { colors.circleRed += 1; if(colors.circleRed > 255){colors.circleRed = 255;} redraw();}));
    advancedButtonsColorsCircle.push(new Button(rightSideBar + 0, height + 120, 200, "Green", function() { }));
    advancedButtonsColorsCircle.push(new Button(rightSideBar + 0, height + 150, 100, "-50", function() { colors.circleGreen -= 50; if(colors.circleGreen < 0){colors.circleGreen = 0;} redraw();}));
    advancedButtonsColorsCircle.push(new Button(rightSideBar + 100, height + 150, 100, "+50", function() { colors.circleGreen += 50; if(colors.circleGreen > 255){colors.circleGreen = 255;} redraw();}));
    advancedButtonsColorsCircle.push(new Button(rightSideBar + 0, height + 180, 50, "-10", function() { colors.circleGreen -= 10; if(colors.circleGreen < 0){colors.circleGreen = 0;} redraw();}));
    advancedButtonsColorsCircle.push(new Button(rightSideBar + 50, height + 180, 50, "-1", function() { colors.circleGreen -= 1; if(colors.circleGreen < 0){colors.circleGreen = 0;} redraw();}));
    advancedButtonsColorsCircle.push(new Button(rightSideBar + 100, height + 180, 50, "+10", function() { colors.circleGreen += 10; if(colors.circleGreen > 255){colors.circleGreen = 255;} redraw();}));
    advancedButtonsColorsCircle.push(new Button(rightSideBar + 150, height + 180, 50, "+1", function() { colors.circleGreen += 1; if(colors.circleGreen > 255){colors.circleGreen = 255;} redraw();}));
    advancedButtonsColorsCircle.push(new Button(rightSideBar + 0, height + 210, 200, "Blue", function() { }));
    advancedButtonsColorsCircle.push(new Button(rightSideBar + 0, height + 240, 100, "-50", function() { colors.circleBlue -= 50; if(colors.circleBlue < 0){colors.circleBlue = 0;} redraw();}));
    advancedButtonsColorsCircle.push(new Button(rightSideBar + 100, height + 240, 100, "+50", function() { colors.circleBlue += 50; if(colors.circleBlue > 255){colors.circleBlue = 255;} redraw();}));
    advancedButtonsColorsCircle.push(new Button(rightSideBar + 0, height + 270, 50, "-10", function() { colors.circleBlue -= 10; if(colors.circleBlue < 0){colors.circleBlue = 0;} redraw();}));
    advancedButtonsColorsCircle.push(new Button(rightSideBar + 50, height + 270, 50, "-1", function() { colors.circleBlue -= 1; if(colors.circleBlue < 0){colors.circleBlue = 0;} redraw();}));
    advancedButtonsColorsCircle.push(new Button(rightSideBar + 100, height + 270, 50, "+10", function() { colors.circleBlue += 10; if(colors.circleBlue > 255){colors.circleBlue = 255;} redraw();}));
    advancedButtonsColorsCircle.push(new Button(rightSideBar + 150, height + 270, 50, "+1", function() { colors.circleBlue += 1; if(colors.circleBlue > 255){colors.circleBlue = 255;} redraw();}));

    advancedButtonsColorsLine.push(new Button(rightSideBar + 0, height, 200, "Line color", function() { }));
    advancedButtonsColorsLine.push(new Button(rightSideBar + 0, height + 30, 200, "Red", function() { }));
    advancedButtonsColorsLine.push(new Button(rightSideBar + 0, height + 60, 100, "-50", function() { colors.lineRed -= 50; if(colors.lineRed < 0){colors.lineRed = 0;} redraw();}));
    advancedButtonsColorsLine.push(new Button(rightSideBar + 100, height + 60, 100, "+50", function() { colors.lineRed += 50; if(colors.lineRed > 255){colors.lineRed = 255;} redraw();}));
    advancedButtonsColorsLine.push(new Button(rightSideBar + 0, height + 90, 50, "-10", function() { colors.lineRed -= 10; if(colors.lineRed < 0){colors.lineRed = 0;} redraw();}));
    advancedButtonsColorsLine.push(new Button(rightSideBar + 50, height + 90, 50, "-1", function() { colors.lineRed -= 1; if(colors.lineRed < 0){colors.lineRed = 0;} redraw();}));
    advancedButtonsColorsLine.push(new Button(rightSideBar + 100, height + 90, 50, "+10", function() { colors.lineRed += 10; if(colors.lineRed > 255){colors.lineRed = 255;} redraw();}));
    advancedButtonsColorsLine.push(new Button(rightSideBar + 150, height + 90, 50, "+1", function() { colors.lineRed += 1; if(colors.lineRed > 255){colors.lineRed = 255;} redraw();}));
    advancedButtonsColorsLine.push(new Button(rightSideBar + 0, height + 120, 200, "Green", function() { }));
    advancedButtonsColorsLine.push(new Button(rightSideBar + 0, height + 150, 100, "-50", function() { colors.lineGreen -= 50; if(colors.lineGreen < 0){colors.lineGreen = 0;} redraw();}));
    advancedButtonsColorsLine.push(new Button(rightSideBar + 100, height + 150, 100, "+50", function() { colors.lineGreen += 50; if(colors.lineGreen > 255){colors.lineGreen = 255;} redraw();}));
    advancedButtonsColorsLine.push(new Button(rightSideBar + 0, height + 180, 50, "-10", function() { colors.lineGreen -= 10; if(colors.lineGreen < 0){colors.lineGreen = 0;} redraw();}));
    advancedButtonsColorsLine.push(new Button(rightSideBar + 50, height + 180, 50, "-1", function() { colors.lineGreen -= 1; if(colors.lineGreen < 0){colors.lineGreenlineGreen = 0;} redraw();}));
    advancedButtonsColorsLine.push(new Button(rightSideBar + 100, height + 180, 50, "+10", function() { colors.lineGreen += 10; if(colors.lineGreen > 255){colors.lineGreen = 255;} redraw();}));
    advancedButtonsColorsLine.push(new Button(rightSideBar + 150, height + 180, 50, "+1", function() { colors.lineGreen += 1; if(colors.lineGreen > 255){colors.lineGreen = 255;} redraw();}));
    advancedButtonsColorsLine.push(new Button(rightSideBar + 0, height + 210, 200, "Blue", function() { }));
    advancedButtonsColorsLine.push(new Button(rightSideBar + 0, height + 240, 100, "-50", function() { colors.lineBlue -= 50; if(colors.lineBlue < 0){colors.lineBlue = 0;} redraw();}));
    advancedButtonsColorsLine.push(new Button(rightSideBar + 100, height + 240, 100, "+50", function() { colors.lineBlue += 50; if(colors.lineBlue > 255){colors.lineBlue = 255;} redraw();}));
    advancedButtonsColorsLine.push(new Button(rightSideBar + 0, height + 270, 50, "-10", function() { colors.lineBlue -= 10; if(colors.lineBlue < 0){colors.lineBlue = 0;} redraw();}));
    advancedButtonsColorsLine.push(new Button(rightSideBar + 50, height + 270, 50, "-1", function() { colors.lineBlue -= 1; if(colors.lineBlue < 0){colors.lineBlue = 0;} redraw();}));
    advancedButtonsColorsLine.push(new Button(rightSideBar + 100, height + 270, 50, "+10", function() { colors.lineBlue += 10; if(colors.lineBlue > 255){colors.lineBlue = 255;} redraw();}));
    advancedButtonsColorsLine.push(new Button(rightSideBar + 150, height + 270, 50, "+1", function() { colors.lineBlue += 1; if(colors.lineBlue > 255){colors.lineBlue = 255;} redraw();}));

    advancedButtonsColorsDot.push(new Button(rightSideBar + 0, height, 200, "Dot color", function() { }));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 0, height + 30, 200, "Red", function() { }));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 0, height + 60, 100, "-50", function() { colors.dotRed -= 50; if(colors.dotReddotRed < 0){colors.dotRed = 0;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 100, height + 60, 100, "+50", function() { colors.dotRed += 50; if(colors.dotRed > 255){colors.dotRed = 255;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 0, height + 90, 50, "-10", function() { colors.dotRed -= 10; if(colors.dotRed < 0){colors.dotRed = 0;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 50, height + 90, 50, "-1", function() { colors.dotRed -= 1; if(colors.dotRed < 0){colors.dotRed = 0;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 100, height + 90, 50, "+10", function() { colors.dotRed += 10; if(colors.dotRed > 255){colors.dotRed = 255;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 150, height + 90, 50, "+1", function() { colors.dotRed += 1; if(colors.dotRed > 255){colors.dotRed = 255;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 0, height + 120, 200, "Green", function() { }));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 0, height + 150, 100, "-50", function() { colors.dotGreen -= 50; if(colors.dotGreen < 0){colors.dotGreen = 0;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 100, height + 150, 100, "+50", function() { colors.dotGreen += 50; if(colors.dotGreen > 255){colors.dotGreen = 255;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 0, height + 180, 50, "-10", function() { colors.dotGreen -= 10; if(colors.dotGreen < 0){colors.dotGreen = 0;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 50, height + 180, 50, "-1", function() { colors.dotGreen -= 1; if(colors.dotGreen < 0){colors.dotGreen = 0;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 100, height + 180, 50, "+10", function() { colors.dotGreen += 10; if(colors.dotGreen > 255){colors.dotGreen = 255;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 150, height + 180, 50, "+1", function() { colors.dotGreen += 1; if(colors.dotGreen > 255){colors.dotGreen = 255;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 0, height + 210, 200, "Blue", function() { }));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 0, height + 240, 100, "-50", function() { colors.dotBlue -= 50; if(colors.dotBlue < 0){colors.dotBlue = 0;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 100, height + 240, 100, "+50", function() { colors.dotBlue += 50; if(colors.dotBlue > 255){colors.dotBlue = 255;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 0, height + 270, 50, "-10", function() { colors.dotBlue -= 10; if(colors.dotBlue < 0){colors.dotBlue = 0;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 50, height + 270, 50, "-1", function() { colors.dotBlue -= 1; if(colors.dotBlue < 0){colors.dotBlue = 0;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 100, height + 270, 50, "+10", function() { colors.dotBlue += 10; if(colors.dotBlue > 255){colors.dotBlue = 255;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 150, height + 270, 50, "+1", function() { colors.dotBlue += 1; if(colors.dotBlue > 255){colors.dotBlue = 255;} redraw();}));

    advancedButtonsColorsDot.push(new Button(rightSideBar + 0, height, 200, "Dot color", function() { }));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 0, height + 30, 200, "Red", function() { }));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 0, height + 60, 100, "-50", function() { colors.dotRed -= 50; if(colors.dotRed < 0){colors.dotRed = 0;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 100, height + 60, 100, "+50", function() { colors.dotRed += 50; if(colors.dotRed > 255){colors.dotRed = 255;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 0, height + 90, 50, "-10", function() { colors.dotRed -= 10; if(colors.dotRed < 0){colors.dotRed = 0;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 50, height + 90, 50, "-1", function() { colors.dotRed -= 1; if(colors.dotRed < 0){colors.dotRed = 0;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 100, height + 90, 50, "+10", function() { colors.dotRed += 10; if(colors.dotRed > 255){colors.dotRed = 255;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 150, height + 90, 50, "+1", function() { colors.dotRed += 1; if(colors.dotRed > 255){colors.dotRed = 255;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 0, height + 120, 200, "Green", function() { }));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 0, height + 150, 100, "-50", function() { colors.dotGreen -= 50; if(colors.dotGreen < 0){colors.dotGreen = 0;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 100, height + 150, 100, "+50", function() { colors.dotGreen += 50; if(colors.dotGreen > 255){colors.dotGreen = 255;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 0, height + 180, 50, "-10", function() { colors.dotGreen -= 10; if(colors.dotGreen < 0){colors.dotGreen = 0;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 50, height + 180, 50, "-1", function() { colors.dotGreen -= 1; if(colors.dotGreen < 0){colors.dotGreen = 0;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 100, height + 180, 50, "+10", function() { colors.dotGreen += 10; if(colors.dotGreen > 255){colors.dotGreen = 255;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 150, height + 180, 50, "+1", function() { colors.dotGreen += 1; if(colors.dotGreen > 255){colors.dotGreen = 255;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 0, height + 210, 200, "Blue", function() { }));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 0, height + 240, 100, "-50", function() { colors.dotBlue -= 50; if(colors.dotBlue < 0){colors.dotBlue = 0;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 100, height + 240, 100, "+50", function() { colors.dotBlue += 50; if(colors.dotBlue > 255){colors.dotBlue = 255;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 0, height + 270, 50, "-10", function() { colors.dotBlue -= 10; if(colors.dotBlue < 0){colors.dotBlue = 0;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 50, height + 270, 50, "-1", function() { colors.dotBlue -= 1; if(colors.dotBlue < 0){colors.dotBlue = 0;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 100, height + 270, 50, "+10", function() { colors.dotBlue += 10; if(colors.dotBlue > 255){colors.dotBlue = 255;} redraw();}));
    advancedButtonsColorsDot.push(new Button(rightSideBar + 150, height + 270, 50, "+1", function() { colors.dotBlue += 1; if(colors.dotBlue > 255){colors.dotBlue = 255;} redraw();}));

    advancedButtonsColorsBackground.push(new Button(rightSideBar + 0, height, 200, "Background color", function() { }));
    advancedButtonsColorsBackground.push(new Button(rightSideBar + 0, height + 30, 200, "Red", function() { }));
    advancedButtonsColorsBackground.push(new Button(rightSideBar + 0, height + 60, 100, "-50", function() { colors.backgroundRed -= 50; if(colors.backgroundRed < 0){colors.backgroundRed = 0;} redraw();}));
    advancedButtonsColorsBackground.push(new Button(rightSideBar + 100, height + 60, 100, "+50", function() { colors.backgroundRed += 50; if(colors.backgroundRed > 255){colors.backgroundRed = 255;} redraw();}));
    advancedButtonsColorsBackground.push(new Button(rightSideBar + 0, height + 90, 50, "-10", function() { colors.backgroundRed -= 10; if(colors.backgroundRed < 0){colors.backgroundRed = 0;} redraw();}));
    advancedButtonsColorsBackground.push(new Button(rightSideBar + 50, height + 90, 50, "-1", function() { colors.backgroundRed -= 1; if(colors.backgroundRed < 0){colors.backgroundRed = 0;} redraw();}));
    advancedButtonsColorsBackground.push(new Button(rightSideBar + 100, height + 90, 50, "+10", function() { colors.backgroundRed += 10; if(colors.backgroundRed > 255){colors.backgroundRed = 255;} redraw();}));
    advancedButtonsColorsBackground.push(new Button(rightSideBar + 150, height + 90, 50, "+1", function() { colors.backgroundRed += 1; if(colors.backgroundRed > 255){colors.backgroundRed = 255;} redraw();}));
    advancedButtonsColorsBackground.push(new Button(rightSideBar + 0, height + 120, 200, "Green", function() { }));
    advancedButtonsColorsBackground.push(new Button(rightSideBar + 0, height + 150, 100, "-50", function() { colors.backgroundGreen -= 50; if(colors.backgroundGreen < 0){colors.backgroundGreen = 0;} redraw();}));
    advancedButtonsColorsBackground.push(new Button(rightSideBar + 100, height + 150, 100, "+50", function() { colors.backgroundGreen += 50; if(colors.backgroundGreen > 255){colors.backgroundGreen = 255;} redraw();}));
    advancedButtonsColorsBackground.push(new Button(rightSideBar + 0, height + 180, 50, "-10", function() { colors.backgroundGreen -= 10; if(colors.backgroundGreen < 0){colors.backgroundGreen = 0;} redraw();}));
    advancedButtonsColorsBackground.push(new Button(rightSideBar + 50, height + 180, 50, "-1", function() { colors.backgroundGreen -= 1; if(colors.backgroundGreen < 0){colors.backgroundGreen = 0;} redraw();}));
    advancedButtonsColorsBackground.push(new Button(rightSideBar + 100, height + 180, 50, "+10", function() { colors.backgroundGreen += 10; if(colors.backgroundGreen > 255){colors.backgroundGreen = 255;} redraw();}));
    advancedButtonsColorsBackground.push(new Button(rightSideBar + 150, height + 180, 50, "+1", function() { colors.backgroundGreen += 1; if(colors.backgroundGreen > 255){colors.backgroundGreen = 255;} redraw();}));
    advancedButtonsColorsBackground.push(new Button(rightSideBar + 0, height + 210, 200, "Blue", function() { }));
    advancedButtonsColorsBackground.push(new Button(rightSideBar + 0, height + 240, 100, "-50", function() { colors.backgroundBlue -= 50; if(colors.backgroundBlue < 0){colors.backgroundBlue = 0;} redraw();}));
    advancedButtonsColorsBackground.push(new Button(rightSideBar + 100, height + 240, 100, "+50", function() { colors.backgroundBlue += 50; if(colors.backgroundBlue > 255){colors.backgroundBlue = 255;} redraw();}));
    advancedButtonsColorsBackground.push(new Button(rightSideBar + 0, height + 270, 50, "-10", function() { colors.backgroundBlue -= 10; if(colors.backgroundBlue < 0){colors.backgroundBlue = 0;} redraw();}));
    advancedButtonsColorsBackground.push(new Button(rightSideBar + 50, height + 270, 50, "-1", function() { colors.backgroundBlue -= 1; if(colors.backgroundBlue < 0){colors.backgroundBlue = 0;} redraw();}));
    advancedButtonsColorsBackground.push(new Button(rightSideBar + 100, height + 270, 50, "+10", function() { colors.backgroundBlue += 10; if(colors.backgroundBlue > 255){colors.backgroundBlue = 255;} redraw();}));
    advancedButtonsColorsBackground.push(new Button(rightSideBar + 150, height + 270, 50, "+1", function() { colors.backgroundBlue += 1; if(colors.backgroundBlue > 255){colors.backgroundBlue = 255;} redraw();}));


}

function hideButtons(){
    for (let button of buttons) {
        button.shown = false;
    }
    for (let button of simpleButtons) {
        button.shown = false;
    }
    for (let button of advancedButtons) {
        button.shown = false;
    }
    for (let button of advancedButtonsLines) {
        button.shown = false;
    }
    for (let button of advancedButtonsColors) {
        button.shown = false;
    }
    for (let button of advancedButtonsColorsCircle) {
        button.shown = false;
    }
    for (let button of advancedButtonsColorsLine) {
        button.shown = false;
    }
    for (let button of advancedButtonsColorsDot) {
        button.shown = false;
    }
}

function GUIText(text) {
    ctx.fillText(text, 5, canvasSize - 10 * canvasScale);
}

function drawGUI() {
    //General
    ctx.strokeStyle = "black";
    hideButtons();

    if (dirtyRender) {
        if(showGUI){
            //Temp line width ensures that the borders are constant
            var tempLineWidth = ctx.lineWidth;
            ctx.lineWidth = 2.5;

            //Clear left side and add border
            ctx.clearRect(0, 0, sideBarWidth, canvasSize);
            ctx.beginPath();
            ctx.moveTo(sideBarWidth, 0);
            ctx.lineTo(sideBarWidth, canvasSize);
            ctx.stroke();

            if(simpleGUI){
                for (let button of simpleButtons) {
                    button.draw();
                }
            } else {
                //Clear right side and add border
                ctx.clearRect(canvasSize + sideBarWidth, 0, sideBarWidth, canvasSize);
                ctx.beginPath();
                ctx.moveTo(canvasSize + sideBarWidth, 0);
                ctx.lineTo(canvasSize + sideBarWidth, canvasSize);
                ctx.stroke();

                //Draw advanced heading buttons
                for (let button of advancedButtons) {
                    button.draw();
                }

                //Draw other advanced buttons
                var buttonArray = null;
                switch(advancedGUImode){
                    case "colorCircles":
                        buttonArray = advancedButtonsColorsCircle;
                        for (let button of advancedButtonsColors) {
                            button.draw();
                        }
                        break;
                    case "colorLines":
                        buttonArray = advancedButtonsColorsLine;
                        for (let button of advancedButtonsColors) {
                            button.draw();
                        }
                        break;
                    case "colorDots":
                        buttonArray = advancedButtonsColorsDot;
                        for (let button of advancedButtonsColors) {
                            button.draw();
                        }
                        break;
                    case "colorBackground":
                        buttonArray = advancedButtonsColorsBackground;
                        for (let button of advancedButtonsColors) {
                            button.draw();
                        }
                        break;
                    default:
                    case "lines":
                        buttonArray = advancedButtonsLines;
                        break;
                }
                for (let button of buttonArray) {
                    button.draw();
                }
            }

            ctx.lineWidth = tempLineWidth;

            //General buttons (toggle GUI and save)
            for (let button of buttons) {
                button.draw();
            }

            //Do corner text
            if(selectedCircle != null){
                GUIText("Scroll to change circle size");
            } else {
                GUIText("are lines correct?: " + (checkLines() ? "yes" : "no"));
            }

        } else {
            //draw toggle gui button
            ctx.clearRect(0, 0, buttons[0].width, buttons[0].height);
            buttons[0].draw();
        }
    }
}
