"use strict";

var player1;
var cameraMovement1;

var borders = [];
var bullets = [];
var grenades = [];
var enemies = [];

var Horizontal = 0;
var Vertical = 0;

var upKey, downKey, rightKey, leftKey;

var leftClick = false;

var mouseX, mouseY;

var mouseXevent = 0;
var mouseYevent = 0;

var progress, fps, DeltaTime, lastRender = 0;

var backgroundImage = document.getElementById('background');

function startGame() {
    myGameArea.start();
    player1 = new player(0, 0);
    cameraMovement1 = new cameraMovement();

    for (var y = 0; y < mapH; y++) {
        for (var x = 0; x < mapW; x++) {
            if (gameMap[((y*mapW)+x)] == 1) {
                borders.push(new Border(x*tileW, y*tileH, 30, 30, "floor"));
            }
            if (gameMap[((y*mapW)+x)] == 2) {
                borders.push(new Border(x*tileW, y*tileH, 30, 30, "spawn"));
            }
        }
    }
    //enemies.push(new enemie(100, -100));
    //enemies.push(new enemie(200, -100));
    //enemies.push(new enemie(300, -100));
    //enemies.push(new enemie(400, -100));
}

var myGameArea = {
    canvas : document.getElementById("game"),
    start : function() {
        this.context = this.canvas.getContext("2d");
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20)
    },
}

function updateGameArea() {
    let ctx = myGameArea.context;
    ctx.setTransform(1,0,0,1,0,0);
    mousePosition();

    update();
    draw();
}

function update() {
    cameraMovement1.update();
    for (let i = 0; i < enemies.length; i++) {
        //if (enemies[i].x < cameraMovement1.x && enemies[i].x + enemies[i].width < cameraMovement1.x + myGameArea.canvas.width && enemies[i].y < cameraMovement1.x && enemies[i].y + enemies[i].height < cameraMovement1.y + myGameArea.canvas.height) {
            enemies[i].update();
        //}
    }
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].update(i);
    }
    for (let i = 0; i < grenades.length; i++) {
        grenades[i].update(i);
    }
    player1.update();
}
function draw() {
    let ctx = myGameArea.context;
    ctx.clearRect(-cameraMovement1.x, -cameraMovement1.y, myGameArea.canvasWidth, myGameArea.canvasHeight);
    background();
    for (let i = 0; i < borders.length; i++) {
        borders[i].draw();
    }
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].draw();
    }
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }
    for (let i = 0; i < grenades.length; i++) {
        grenades[i].draw();
    }
    player1.draw();
    drawFps();
}

function drawFps(){
    let ctx = myGameArea.context;
    ctx.font = '20px Arial';
    ctx.fillStyle = 'lightgreen';
    ctx.fillText("FPS: " + fps, 10-cameraMovement1.x, 25-cameraMovement1.y);
}

function background() {
    let ctx = myGameArea.context;
    ctx.fillStyle = "red";
    ctx.fillRect(-cameraMovement1.x, -cameraMovement1.y, myGameArea.canvasWidth, myGameArea.canvasHeight);
    ctx.drawImage(backgroundImage, -cameraMovement1.x, -cameraMovement1.y, myGameArea.canvasWidth, myGameArea.canvasHeight);
}