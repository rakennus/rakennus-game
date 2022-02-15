"use strict";
let canvas;
let ctx;

let secondsPassed = 0;
let oldTimeStamp = 0;
let fps = 0;

let fixedUpdateTime = 0;
let fixedUpdateCount = 0;

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

let map = document.getElementById('map');
let mapCanvas = document.getElementById('map-canvas');
let ctxMap = mapCanvas.getContext('2d');

let background = document.getElementById("background");

let mapLegend = {
    stone: [19, 19, 19],
}

window.onload = (event) => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = document.documentElement.clientWidth - 100;
    canvas.height = document.documentElement.clientHeight - 100;

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
                if (mapPixel[0] == mapLegend.stone[0] && mapPixel[1] == mapLegend.stone[1] && mapPixel[2] == mapLegend.stone[2]) {
                    borders.push(new Border(j * 32, i * 32, 33, 33, "dirt"));
                }
            }
        }

        // Start the first frame request
        window.requestAnimationFrame(gameLoop);
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
    joyStick.update();

    fixedUpdateTime += secondsPassed;
    if (fixedUpdateTime >= fixedUpdateCount) { fixedUpdate(); fixedUpdateCount += 0.01 };
}

function fixedUpdate() {
    axis.update();
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

    if (controls.touchControls) {
        joyStick.draw();
    }

    // draw fps
    ctx.font = '12px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText("FPS: " + fps, -cameraMovement.x + 4, -cameraMovement.y + 14);
    ctx.fillText((controls.start.x - controls.end.x) + ' | ' + (controls.start.y - controls.end.y), -cameraMovement.x + 60, -cameraMovement.y + 14);
}

let cameraMovement = new function () {
    this.x = 0;
    this.y = 0;

    this.boxHeight = 0;
    this.boxWidth = 0;
    this.boxOffsetX = 0;
    this.boxOffsetY = 0;

    this.update = function () {
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

let axis = {
    horizontal: 0,
    vertical: 0,

    update: function () {
        if (!controls.left && !controls.right || controls.left && controls.right) {
            this.horizontal *= 0.95;
        } else if (controls.right) {
            this.horizontal += 0.1;
        } else if (controls.left) {
            this.horizontal -= 0.1;
        }

        if (this.horizontal >= 1) {
            this.horizontal = 1;
        }
        if (this.horizontal <= -1) {
            this.horizontal = -1;
        }

        if (!controls.down && !controls.up || controls.down && controls.up) {
            this.vertical = 0;
        } else if (controls.down) {
            this.vertical = -1;
        } else if (controls.up) {
            this.vertical = 1;
        }
    }
}

let joyStick = {
    stickX: 0,
    stickY: 0,
    x: 0,
    y: 0,
    size: 120,
    margin: 80,
    padding: 20,

    update: function () {
        this.stickX = -(controls.start.x - controls.end.x);
        this.stickY = -(controls.start.y - controls.end.y);

        if (this.stickX > this.size / 2) {
            this.stickX = this.size / 2;
        } else if (this.stickX < -this.size / 2) {
            this.stickX = -this.size / 2;
        }

        if (this.stickY > this.size / 2) {
            this.stickY = this.size / 2;
        } else if (this.stickY < -this.size / 2) {
            this.stickY = -this.size / 2;
        }
    },
    draw: function () {
        this.x = -cameraMovement.x + this.size / 2 + this.margin;
        this.y = -cameraMovement.y + canvas.height - this.size / 2 - this.margin;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.x + this.stickX, this.y + this.stickY, this.size / 2 - this.padding, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
    }
}

function TouchHandleStart(event) {
    event.preventDefault();
    controls.touchControls = true;

    controls.touchStarted = true;
    controls.start.x = event.changedTouches[0].pageX;
    controls.start.y = event.changedTouches[0].pageY;

    controls.end.x = event.changedTouches[0].pageX;
    controls.end.y = event.changedTouches[0].pageY;
};

function TouchHandleMove(event) {
    event.preventDefault();

    controls.end.x = event.changedTouches[0].pageX;
    controls.end.y = event.changedTouches[0].pageY;
};

function TouchHandleEnd(event) {
    event.preventDefault();

    controls.start.x = 0;
    controls.start.y = 0;

    controls.end.x = 0;
    controls.end.y = 0;

    controls.touchStarted = false;
};