document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    controls.touchControls = false;

    if(e.key == "Right" || e.key == "ArrowRight" || e.key == "d" || e.key == "D") {
        controls.right = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft" || e.key == "a" || e.key == "A") {
        controls.left = true;
    }
    else if(e.key == "Up" || e.key == "ArrowUp" || e.key == "w" || e.key == "W") {
        controls.up = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown" || e.key == "s" || e.key == "S") {
        controls.down = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight" || e.key == "d" || e.key == "D") {
        controls.right = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft" || e.key == "a" || e.key == "A") {
        controls.left = false;
    }
    else if(e.key == "Up" || e.key == "ArrowUp" || e.key == "w" || e.key == "W") {
        controls.up = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown" || e.key == "s" || e.key == "S") {
        controls.down = false;
    }
}

function pointInCircle(x1, y1, x0, y0, radius) {
    if (Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0)) > radius) {
        return true;   
    } else {
        return false;
    }
}