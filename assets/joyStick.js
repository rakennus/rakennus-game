let joyStick = {
    stickX: 0,
    stickY: 0,
    x: 0,
    y: 0,
    size: 160,
    padding: 10,
    color: 'black',
    vertical: 0,
    horizontal: 0,

    update: function () {
        this.vertical = this.stickY / (this.size / 2)
        this.horizontal = this.stickX / (this.size / 2)

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
        if (controls.touchStarted) {
            ctx.globalAlpha = 0.6;

            ctx.beginPath();
            ctx.arc(-cameraMovement.x + controls.start.x, -cameraMovement.y + controls.start.y, this.size / 2, 0, 2 * Math.PI);
            ctx.strokeStyle = this.color;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(-cameraMovement.x + controls.start.x + this.stickX, -cameraMovement.y + controls.start.y + this.stickY, this.size / 2 - this.padding, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
}
