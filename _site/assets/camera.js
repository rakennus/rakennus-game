function cameraMovement() {
    this.x = 0;
    this.y = 0;

    this.boxHeight = 120;
    this.boxWidth = 100;
    this.boxOffsetX = 0;
    this.boxOffsetY = 0;

    this.update = function() {
        if (player1.x + player1.width > myGameArea.canvasWidth / 2 - this.boxWidth / 2 + this.boxOffsetX + this.boxWidth) {
            this.boxOffsetX += (player1.x + player1.width) - (myGameArea.canvasWidth / 2 - this.boxWidth / 2 + this.boxOffsetX + this.boxWidth);
        }
        if (player1.x < myGameArea.canvasWidth / 2 - this.boxWidth / 2 + this.boxOffsetX) {
            this.boxOffsetX += player1.x - (myGameArea.canvasWidth / 2 - this.boxWidth / 2 + this.boxOffsetX);
        }
        if (player1.y + player1.height > myGameArea.canvasHeight / 2 - this.boxHeight / 2 + this.boxOffsetY + this.boxHeight) {
            this.boxOffsetY += (player1.y + player1.height) - (myGameArea.canvasHeight / 2 - this.boxHeight / 2 + this.boxOffsetY + this.boxHeight);
        }
        if (player1.y < myGameArea.canvasHeight / 2 - this.boxHeight / 2 + this.boxOffsetY) {
            this.boxOffsetY += player1.y - (myGameArea.canvasHeight / 2 - this.boxHeight / 2 + this.boxOffsetY);
        }

        this.x = -this.boxOffsetX;
        this.y = -this.boxOffsetY;

        let ctx = myGameArea.context;
        ctx.translate(this.x, this.y);
				//this.draw();
    }
		/*
		this.draw = function() {
        let ctx = myGameArea.context;
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "red";
        ctx.fillRect(player1.x, player1.y, this.boxWidth, this.boxHeight);
        ctx.fillStyle = "green";
        ctx.fillRect(myGameArea.canvasWidth / 2 - this.boxWidth / 2 + player1.width / 2, myGameArea.canvasHeight / 2 - this.boxHeight / 2 + player1.height / 2, this.boxWidth - player1.width, this.boxHeight - player1.height);
        ctx.globalAlpha = 1;
    }*/
}
