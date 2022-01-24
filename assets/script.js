"use strict";
let canvas;
let ctx;

let secondsPassed = 0;
let oldTimeStamp = 0;
let fps = 0;

let controls = {
    left: false,
    right: false,
    up: false,
    down: false
}

var borders = [];

window.onload = startGame;

function startGame() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // loads game area
    myGameArea.load();

    // Start the first frame request
    window.requestAnimationFrame(gameLoop);
}

var myGameArea = {
    load: function() {
        for (var y = 0; y < mapH; y++) {
            for (var x = 0; x < mapW; x++) {
                if (gameMap[((y * mapW) + x)] == 1) {
                    borders.push(new Border(x * tileW, y * tileH, 30, 30));
                }
            }
        }
    }
}

function gameLoop(timeStamp) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Calculate the number of seconds passed since the last frame
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
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
}

function draw() {
    // Clear the entire canvas
    ctx.clearRect(-cameraMovement.x, -cameraMovement.y, canvas.width, canvas.height);

    // draw borders
    borders.forEach(element => {
        element.draw();
    });

    // draw player
    player.draw();

    // draw fps
    ctx.font = '25px Arial';
    ctx.fillStyle = 'limegreen';
    ctx.fillText("FPS: " + fps, -cameraMovement.x, -cameraMovement.y + 25);
}

let cameraMovement = new function() {
    this.x = 0;
    this.y = 0;

    this.boxHeight = 0;
    this.boxWidth = 0;
    this.boxOffsetX = 0;
    this.boxOffsetY = 0;

    this.update = function() {
        if (player.position.x + player.size.width > canvas.width / 2 - this.boxWidth / 2 + this.boxOffsetX + this.boxWidth) {
            this.boxOffsetX += (player.position.x + player.size.width) - (canvas.width / 2 - this.boxWidth / 2 + this.boxOffsetX + this.boxWidth);
        }
        if (player.position.x < canvas.width / 2 - this.boxWidth / 2 + this.boxOffsetX) {
            this.boxOffsetX += player.position.x - (canvas.width / 2 - this.boxWidth / 2 + this.boxOffsetX);
        }
        if (player.position.y + player.size.height > canvas.height / 2 - this.boxHeight / 2 + this.boxOffsetY + this.boxHeight) {
            this.boxOffsetY += (player.position.y + player.size.height) - (canvas.height / 2 - this.boxHeight / 2 + this.boxOffsetY + this.boxHeight);
        }
        if (player.position.y < canvas.height / 2 - this.boxHeight / 2 + this.boxOffsetY) {
            this.boxOffsetY += player.position.y - (canvas.height / 2 - this.boxHeight / 2 + this.boxOffsetY);
        }

        this.x = -this.boxOffsetX;
        this.y = -this.boxOffsetY;

        ctx.translate(this.x, this.y);
    }
}

function checkIntersection(r1, r2) {
    if (r1.x >= r2.x + r2.width) {
        return false;
    } else if (r1.x + r1.width <= r2.x) {
        return false;
    } else if (r1.y >= r2.y + r2.height) {
        return false;
    } else if (r1.y + r1.height <= r2.y) {
        return false;
    } else {
        return true;
    }
}