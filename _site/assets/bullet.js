function Bullet(x, y, angle) {
    this.x = x;
    this.y = y;

    this.height = 32;
    this.width = 32;

    this.nemo = document.getElementById('nemo');

    this.velocityX = Math.sin(-(angle) * Math.PI / 180) * 20;
    this.velocityY = Math.cos(-(angle) * Math.PI / 180) * 20;

    this.timeLeft = 120;

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
                this.velocityX = 0;
                this.timeLeft = 20;
            }
            if (checkIntersection(verticalRect, borderRect)) {
                this.velocityY = 0;
            }
        }
        for (let i = 0; i < enemies.length; i++) {
            let enemie = {
              x: enemies[i].x,
              y: enemies[i].y,
              width: enemies[i].width,
              height: enemies[i].height,
            }
      
            if (checkIntersection(horizontalRect, enemie)) {
                bullets.splice(index, 1);
                enemies.splice(i, 1);
            }
            if (checkIntersection(verticalRect, enemie)) {
                bullets.splice(index, 1);
                enemies.splice(i, 1);
            }
        }
        if (this.timeLeft <= 0) {
            bullets.splice(index, 1);
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