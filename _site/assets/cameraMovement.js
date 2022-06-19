let cameraMovement = new function () {
    this.x = 0;
    this.y = 0;

    this.wishX = 0;
    this.wishY = 0;

    this.boxHeight = 0;
    this.boxWidth = 0;

    this.accelleration = 10;

    this.update = function () {
        if (player.position.x + player.hitBox.width / 2 > canvas.width / 2 - this.boxWidth * 1.5 + this.wishX) {
            this.wishX += (player.position.x + player.hitBox.width) - (canvas.width / 2 - this.boxWidth / 2 + this.wishX + this.boxWidth);
        }
        if (player.position.x < canvas.width / 2 - this.boxWidth / 2 + this.wishX) {
            this.wishX += player.position.x - (canvas.width / 2 - this.boxWidth / 2 + this.wishX);
        }
        if (player.position.y + player.hitBox.height > canvas.height / 2 - this.boxHeight / 2 + this.wishY + this.boxHeight) {
            this.wishY += (player.position.y + player.hitBox.height) - (canvas.height / 2 - this.boxHeight / 2 + this.wishY + this.boxHeight);
        }
        if (player.position.y < canvas.height / 2 - this.boxHeight / 2 + this.wishY) {
            this.wishY += player.position.y - (canvas.height / 2 - this.boxHeight / 2 + this.wishY);
        }

        this.x += (this.wishX - this.x) * this.accelleration * secondsPassed;
        this.y += (this.wishY - this.y) * this.accelleration * secondsPassed;
        
        ctx.translate(-this.x, -this.y);
    }
}