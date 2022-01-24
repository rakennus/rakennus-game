function Grenade(x, y, angle) {
    this.x = x;
    this.y = y;

    this.height = 20;
    this.width = 20;

    this.lemon = document.getElementById('lemon');

    this.velocityX = Math.sin(-(angle) * Math.PI / 180) * 4;
    this.velocityY = Math.cos(-(angle) * Math.PI / 180) * 4;

    this.timeLeft = 80;
    this.explode = false;

    this.update = function(index) {
        this.velocityY += 1;
        this.timeLeft --;
      
        let horizontalRect = {
            x: this.x + this.velocityX,
            y: this.y,
            width: 4,
            height: 4
        }
        let verticalRect = {
            x: this.x,
            y: this.y + this.velocityY,
            width: 4,
            height: 4
        }
      
        for (let i = 0; i < borders.length; i++) {
            let borderRect = {
              x: borders[i].x,
              y: borders[i].y,
              width: borders[i].width,
              height: borders[i].height
            }
      
            if (checkIntersection(horizontalRect, borderRect)) {
                while (checkIntersection(horizontalRect, borderRect)) {
                    horizontalRect.x -= this.velocityX;
                }
                this.velocityX = -this.velocityX;
            }
            if (checkIntersection(verticalRect, borderRect)) {
                while (checkIntersection(verticalRect, borderRect)) {
                    verticalRect.y -= Math.sign(this.velocityY);
                }
                this.velocityY = -this.velocityY;
            }
        }
        if (this.timeLeft <= 0) {
            bullets.splice(index, 1);
        }

        this.x += this.velocityX;
        this.y += this.velocityY;
    }
    
    this.draw = function() {
        if (!this.explode) {
            ctx.drawImage(this.lemon, 0, 0, 64, 64, this.x - this.width/2, this.y - this.height/2, this.width, this.height);
        }
    }
}