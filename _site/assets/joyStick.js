let joyStick = {
    stickX: 0,
    stickY: 0,
    x: 0,
    y: 0,
    size: 80,
    padding: 20,
    color: '#787878',
    contrastColor: '#6e6e6e',
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

            ctx.beginPath();
            ctx.arc(cameraMovement.x + controls.start.x, cameraMovement.y + controls.start.y, this.size / 2 + this.padding, 0, 2 * Math.PI);

            ctx.globalAlpha = 0.6;
            ctx.fillStyle = this.color;
            ctx.fill();

            ctx.globalAlpha = 0.8;
            ctx.lineWidth = 8;
            ctx.strokeStyle = this.color;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(cameraMovement.x + controls.start.x, cameraMovement.y + controls.start.y, this.size / 2 - this.padding, 0, 2 * Math.PI);

            ctx.globalAlpha = 1;
            ctx.fillStyle = this.contrastColor;
            ctx.fill();

            ctx.lineWidth = 2;
            ctx.strokeStyle = this.color;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(cameraMovement.x + controls.start.x + this.stickX, cameraMovement.y + controls.start.y + this.stickY, this.size / 2, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.lineWidth = 4;
            ctx.strokeStyle = this.contrastColor;
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
    }
}
