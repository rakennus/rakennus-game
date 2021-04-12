function Bullet(x, y, angle) {
    this.x = x;
    this.y = y;

    this.velocityX = Math.sin(-(angle) * Math.PI / 180) * 30;
    this.velocityY = Math.cos(-(angle) * Math.PI / 180) * 30;

    this.update = function(index) {
        let circle = {
            x: this.x + this.velocityX,
            y: this.y + this.velocityY,
        }

        for (let i = 0; i < borders.length; i++) {
            let borderRect = {
              x: borders[i].x,
              y: borders[i].y,
              width: borders[i].width,
              height: borders[i].height
            }
            if (BulletHits(circle, borderRect)) {
                bullets.splice(index, 1)
            }
        }
        this.x += this.velocityX;
        this.y += this.velocityY;
    }
    
    this.draw = function() {
        ctx = myGameArea.context;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
}