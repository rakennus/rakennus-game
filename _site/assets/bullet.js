function Bullet(x, y, angle) {
    this.x = x;
    this.y = y;

    this.height = 32;
    this.width = 32;

    this.nemo = document.getElementById('nemo');

    this.velocityX = Math.sin(-(angle) * Math.PI / 180) * 24;
    this.velocityY = Math.cos(-(angle) * Math.PI / 180) * 24;

    this.update = function(index) {
        let circle = {
            x: this.x + this.velocityX,
            y: this.y + this.velocityY,
        }

        this.velocityY += 1;

        for (let i = 0; i < borders.length; i++) {
            let borderRect = {
              x: borders[i].x,
              y: borders[i].y,
              width: borders[i].width,
              height: borders[i].height
            }
            if (BulletHits(circle, borderRect)) {
                //bullets.splice(index, 1);
                this.velocityX = 0;
                this.velocityY = 0;
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

        ctx.drawImage(this.nemo, 0, 0, 64, 64, this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    }
}