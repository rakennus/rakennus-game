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

function collision() {
    for (let i = 0; i < borders.length; i++) {
        if (borders[i].x > -cameraMovement1.x && borders[i].y > -cameraMovement1.y && borders[i].x < myGameArea.canvasWidth -cameraMovement1.x && borders[i].y < myGameArea.canvasHeight -cameraMovement1.y) {
            let borderRect = {
                x: borders[i].x,
                y: borders[i].y,
                width: borders[i].width,
                height: borders[i].height
            }

            if (checkIntersection(horizontalRect, borderRect)) {
                while (checkIntersection(horizontalRect, borderRect)) {
                    horizontalRect.x -= this.xspeedIndep;
                }
                this.x = horizontalRect.x;
                this.xspeedIndep = 0;
                this.xspeed = 0;
            }
            if (checkIntersection(verticalRect, borderRect)) {
                if (groundCheck(verticalRect, borderRect)) {
                    this.grounded = true;
                }
                while (checkIntersection(verticalRect, borderRect)) {
                    verticalRect.y -= Math.sign(this.yspeedIndep);
                }
                this.y = verticalRect.y;
                this.yspeedIndep = 0;
                this.yspeed = 0;
            }
        }
    }
}