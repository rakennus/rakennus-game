let cameraMovement = new function () {
    this.x = 0;
    this.y = 0;

    this.boxHeight = 0;
    this.boxWidth = 0;
    this.boxOffsetX = 0;
    this.boxOffsetY = 0;

    this.update = function () {
        if (player.position.x + player.hitBox.width > canvas.width / 2 - this.boxWidth / 2 + this.boxOffsetX + this.boxWidth) {
            this.boxOffsetX += (player.position.x + player.hitBox.width) - (canvas.width / 2 - this.boxWidth / 2 + this.boxOffsetX + this.boxWidth);
        }
        if (player.position.x < canvas.width / 2 - this.boxWidth / 2 + this.boxOffsetX) {
            this.boxOffsetX += player.position.x - (canvas.width / 2 - this.boxWidth / 2 + this.boxOffsetX);
        }
        if (player.position.y + player.hitBox.height > canvas.height / 2 - this.boxHeight / 2 + this.boxOffsetY + this.boxHeight) {
            this.boxOffsetY += (player.position.y + player.hitBox.height) - (canvas.height / 2 - this.boxHeight / 2 + this.boxOffsetY + this.boxHeight);
        }
        if (player.position.y < canvas.height / 2 - this.boxHeight / 2 + this.boxOffsetY) {
            this.boxOffsetY += player.position.y - (canvas.height / 2 - this.boxHeight / 2 + this.boxOffsetY);
        }

        this.x = -this.boxOffsetX;
        this.y = -this.boxOffsetY;

        ctx.translate(this.x, this.y);
    }
}