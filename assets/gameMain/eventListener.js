document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight" || e.key == "d" || e.key == "D") {
        rightKey = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft" || e.key == "a" || e.key == "A") {
        leftKey = true;
    }
    else if(e.key == "Up" || e.key == "ArrowUp" || e.key == "w" || e.key == "W") {
        upKey = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown" || e.key == "s" || e.key == "S") {
        downKey = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight" || e.key == "d" || e.key == "D") {
        rightKey = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft" || e.key == "a" || e.key == "A") {
        leftKey = false;
    }
    else if(e.key == "Up" || e.key == "ArrowUp" || e.key == "w" || e.key == "W") {
        upKey = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown" || e.key == "s" || e.key == "S") {
        downKey = false;
    }
}

window.addEventListener("mousemove", function myFunction(event) {
    mouseXevent = event.offsetX;
    mouseYevent = event.offsetY;
});

function mousePosition() {
    var mouseOffsetX = (player1.x + player1.width / 2) - (myGameArea.canvasWidth / 2 - cameraMovement1.boxWidth / 2 + cameraMovement1.boxOffsetX + player1.width / 2);
    var mouseOffsetY = (player1.y + player1.height / 2) - (myGameArea.canvasHeight / 2 - cameraMovement1.boxHeight / 2 + cameraMovement1.boxOffsetY + player1.height / 2);
    ctx = myGameArea.context;
    if (pointInCircle(mouseXevent, mouseYevent, player1.centerX, player1.centerY, 80)) {
    mouseX = mouseXevent +player1.x - myGameArea.canvasWidth / 2 + cameraMovement1.boxWidth/2 - mouseOffsetX;
    mouseY = mouseYevent +player1.y - myGameArea.canvasHeight / 2 + cameraMovement1.boxHeight/2 - mouseOffsetY;
    }
}

window.addEventListener("mousedown", () => {
    leftClick = true;
});
window.addEventListener("mouseup", () => {
    leftClick = false;
});

function pointInCircle(x1, y1, x0, y0, radius) {
    if (Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0)) > radius) {
        return true;   
    } else {
        return false;
    }
}