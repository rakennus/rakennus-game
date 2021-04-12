"use strict";

var player1;
var cameraMovement1;

var borders = [];
var bullets = [];

var Horizontal = 0;
var Vertical = 0;

var upKey, downKey, rightKey, leftKey;

var leftClick = false;

var mouseX, mouseY;

var mouseXevent = 0;
var mouseYevent = 0;

var progress, fps, DeltaTime, lastRender = 0;

function startGame() {
    myGameArea.start();
    player1 = new player(myGameArea.canvasWidth / 2, myGameArea.canvasHeight / 2 - 1000);
    cameraMovement1 = new cameraMovement();

    for (let i = 0; i < 12; i++) {
        borders.push(new Border(-100 + 30 * i, 300, 30, 30));
    }
    for (let i = 0; i < 6; i++) {
        borders.push(new Border(260 + 30 * i, 330, 30, 30));
    }
    for (let i = 0; i < 20; i++) {
        borders.push(new Border(440 + 30 * i, 300, 30, 30));
    }
    for (let i = 0; i < 3; i++) {
        borders.push(new Border(170 + 30 * i, 220, 30, 30));
    }
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

function updateGameArea(timestamp) {
    let ctx = myGameArea.context;
    ctx.setTransform(1,0,0,1,0,0);
    mousePosition();

    update();
    draw();
}

function update() {
    cameraMovement1.update();
    for (let i = 0; i < borders.length; i++) {
        borders[i].update();
    }
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].update(i);
    }
    player1.update();
}
function draw() {
    let ctx = myGameArea.context;
    ctx.clearRect(-cameraMovement1.x, -cameraMovement1.y, myGameArea.canvasWidth, myGameArea.canvasHeight);
		drawFps();
    for (let i = 0; i < borders.length; i++) {
        borders[i].draw();
    }
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].draw();
    }
    player1.draw();
}

function drawFps(){
    let ctx = myGameArea.context;
    ctx.font = '20px Arial';
    ctx.fillStyle = 'lightgreen';
    ctx.fillText("FPS: " + fps, 10-cameraMovement1.x, 25-cameraMovement1.y);
}


function checkIntersection(r1, r2) {
    if(r1.x >= r2.x + r2.width){
        return false;
    } else if(r1.x + r1.width <= r2.x){
        return false;
    } else if(r1.y >= r2.y + r2.height){
        return false;
    } else if(r1.y + r1.height <= r2.y){
        return false;
    } else {
        return true;
    }
}

function groundCheck(r1, r2) {if (r1.y + r1.height <= r2.y +1) {return true;}}

function inAir(r1) { let a = true;
	for (var i = 0; i < borders.length; i++) {
		let r2 = {
			x: borders[i].x,
			y: borders[i].y,
			width: borders[i].width,
			height: borders[i].height
		}
		if(r1.x <= r2.x + r2.width && r1.x + r1.width >= r2.x && r1.y <= r2.y + r2.height && r1.y + r1.height >= r2.y){
        a = false;
        }
	} return a;
}

function BulletHits(r1, r2) {
    if(r1.x >= r2.x + r2.width){
        return false;
    } else if(r1.x <= r2.x){
        return false;
    } else if(r1.y >= r2.y + r2.height){
        return false;
    } else if(r1.y <= r2.y){
        return false;
    } else {
        return true;
    }
}