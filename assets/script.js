"use strict";
let canvas;
let ctx;
let rect = null;

let secondsPassed = 0;
let oldTimeStamp = 0;
let fps = 0;

let ratio = 0;

let controls = {
    left: false,
    right: false,
    up: false,
    down: false,
    touchControls: false,
    touchStarted: false,
    end: { x: 0, y: 0 },
    start: { x: 0, y: 0 },
}

let borders = [];
let enemies = [];

let map = document.getElementById('map');
let mapCanvas = document.getElementById('map-canvas');
let ctxMap = mapCanvas.getContext('2d');

let background = document.getElementById("background");

let mapLegend = [
    {name: "stone" , r: 19, g: 19, b: 19},
]

let tileSize = 32;

window.onload = (event) => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    myGameArea.canvasStyle();

    window.addEventListener('resize', () => {
        myGameArea.canvasStyle();
    });

    rect = canvas.getBoundingClientRect();

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    canvas.addEventListener("touchstart", TouchHandleStart, false);
    canvas.addEventListener("touchmove", TouchHandleMove, false);
    canvas.addEventListener("touchend", TouchHandleEnd, false);

    // loads game area
    myGameArea.load();
}

let myGameArea = {
    load: function () {
        ctx.imageSmoothingEnabled = false;

        mapCanvas.width = map.width;
        mapCanvas.height = map.height;
        ctxMap.drawImage(map, 0, 0, map.width, map.height);

        for (let i = 0; i < mapCanvas.height; i++) {
            for (let j = 0; j < mapCanvas.width; j++) {
                let mapPixel = ctxMap.getImageData(j, i, 1, 1).data;
                mapLegend.forEach(material => {
                    if (mapPixel[0] == material.r && mapPixel[1] == material.g && mapPixel[2] == material.b) {
                        borders.push(new Border(j * tileSize, i * tileSize, tileSize, tileSize));
                    }
                });
            }
        }

        enemies.push(new Enemie(200, -400))

        // Start the first frame request
        window.requestAnimationFrame(gameLoop);
    },
    canvasStyle: function () {
        canvas.width = document.documentElement.clientWidth - 20;
        canvas.height = document.documentElement.clientHeight - 20;

        ratio = canvas.width / canvas.clientWidth;
    }
}

function gameLoop(timeStamp) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Calculate the number of seconds passed since the last frame
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    if (secondsPassed > 0.1) secondsPassed = 0.1; 
    oldTimeStamp = timeStamp;

    // Calculate fps
    fps = Math.round(1 / secondsPassed);

    if (!document.hidden) {
        // Update game objects in the loop
        update();
        // Perform the drawing operation
        draw();
    }

    // The loop function has reached it's end. Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}

function update() {
    cameraMovement.update();
    player.update();
    if (controls.touchControls) joyStick.update();

    for (let i = 0; i < enemies.length; i++) {
        const enemie = enemies[i];
        enemie.update();
    }
}

function draw() {
    // Clear the entire canvas
    ctx.clearRect(-cameraMovement.x, -cameraMovement.y, canvas.width, canvas.height);

    // ctx.drawImage(background, 0, 0, background.width, background.height, -cameraMovement.x, -cameraMovement.y, canvas.width, canvas.height);

    // draw borders
    borders.forEach(element => {
        element.draw();
    });

    // draw player
    player.draw();
    if (controls.touchControls) joyStick.draw();

    for (let i = 0; i < enemies.length; i++) {
        const enemie = enemies[i];
        enemie.draw();
    }

    // draw fps
    ctx.font = '12px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText("FPS: " + fps, -cameraMovement.x + 4, -cameraMovement.y + 14);
}

function keyDownHandler(e) {
    controls.touchControls = false;

    if (e.key == "Right" || e.key == "ArrowRight" || e.key == "d" || e.key == "D") {
        controls.right = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft" || e.key == "a" || e.key == "A") {
        controls.left = true;
    }
    else if (e.key == "Up" || e.key == "ArrowUp" || e.key == "w" || e.key == "W") {
        controls.up = true;
    }
    else if (e.key == "Down" || e.key == "ArrowDown" || e.key == "s" || e.key == "S") {
        controls.down = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight" || e.key == "d" || e.key == "D") {
        controls.right = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft" || e.key == "a" || e.key == "A") {
        controls.left = false;
    }
    else if (e.key == "Up" || e.key == "ArrowUp" || e.key == "w" || e.key == "W") {
        controls.up = false;
    }
    else if (e.key == "Down" || e.key == "ArrowDown" || e.key == "s" || e.key == "S") {
        controls.down = false;
    }
}

function TouchHandleStart(event) {
    event.preventDefault();
    controls.touchControls = true;

    controls.touchStarted = true;
    controls.start.x = (event.changedTouches[0].pageX - rect.left) * ratio;
    controls.start.y = (event.changedTouches[0].pageY - rect.top) * ratio;

    controls.end.x = (event.changedTouches[0].pageX - rect.left) * ratio;
    controls.end.y = (event.changedTouches[0].pageY - rect.top) * ratio;
};

function TouchHandleMove(event) {
    event.preventDefault();

    controls.end.x = (event.changedTouches[0].pageX - rect.left) * ratio;
    controls.end.y = (event.changedTouches[0].pageY - rect.top) * ratio;
};

function TouchHandleEnd(event) {
    event.preventDefault();

    controls.start.x = 0;
    controls.start.y = 0;

    controls.end.x = 0;
    controls.end.y = 0;

    controls.touchStarted = false;
};