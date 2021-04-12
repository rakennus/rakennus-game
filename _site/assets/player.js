function player(x, y, width, height) {
  this.width = 30;
  this.height = 56;
  this.x = x;
  this.y = y;
  this.playerSpriteOffset = 0;

  this.centerX = 0;
  this.centerY = 0;

	this.playerSprite = document.getElementById('playerSprite');

	this.deagle = document.getElementById('deagle');

  this.grounded = false;
  this.xspeedIndep = 0;
  this.yspeedIndep = 0;
  this.xspeed = 0;
  this.yspeed = 0;
  this.xfriction = 0.9;
  this.yfriction = 0.9;
  this.maxSpeed = 9;
  this.maxFall = 20;
  this.active = true;

	this.weaponWidth = 80;
	this.weaponHeight = 64;
	this.angle = 0;

	this.aimAngleOffset = 0;
	this.aimX = 0;
	this.aimY = 0;
	this.aimOffsetX = 10;
	this.aimOffsetY = -10;

  this.shootingCooldown = 0;

  this.update = function() {
    this.variableUpdate();
    this.movment();
    this.shooting();
  }
  this.variableUpdate = function() {
    this.centerX = this.x + this.width/2;
    this.centerY = this.y + this.height/2;
		this.aimX = this.centerX + this.aimOffsetX + Math.cos((this.angle +90 +this.aimAngleOffset)* Math.PI / 180)*40;
		this.aimY = this.centerY + this.aimOffsetY + Math.sin((this.angle +90 +this.aimAngleOffset)* Math.PI / 180)*40;

    this.angle = -Math.atan2(mouseX - this.centerX, mouseY - this.centerY +25) / Math.PI * 180;
		
    if (this.angle < 0) {
      this.aimAngleOffset = -15;
      this.aimOffsetX = -10;
    } else {
      this.aimAngleOffset = 15;
      this.aimOffsetX = 10;
    }
	}
		this.draw = function() {
			this.drawPlayer();
			this.drawWeapon();
		  //this.devStuff();
		}
		this.drawPlayer = function() {
		ctx = myGameArea.context;
		ctx.save();
		ctx.translate(this.centerX, this.centerY);
		if (this.angle < 0) {ctx.scale(1, 1);} else {ctx.scale(-1, 1);}
		ctx.drawImage(this.playerSprite, 18, 4, 30, 56, this.width/-2 +this.playerSpriteOffset, this.height/-2, this.width, this.height);
		ctx.restore();
		}
		this.drawWeapon = function() {
		ctx = myGameArea.context;
		ctx.save();
		ctx.translate(this.centerX + this.aimOffsetX, this.centerY + this.aimOffsetY);
		ctx.rotate((this.angle -90) * Math.PI / 180);
		if (this.angle < 0) {ctx.scale(1, -1);} else {ctx.scale(1, 1);}
		ctx.drawImage(this.deagle, -this.weaponWidth +2, this.weaponHeight/-2 -2, this.weaponWidth, this.weaponHeight);
		ctx.restore();
		}

  this.movment = function() {if (this.active) {
    if (upKey && this.grounded == true) {
      this.yspeed -= 17;
      this.jump ++;
      this.grounded = false;
    }

    if (downKey && this.grounded == false) {
      this.yspeed += 5;
    }

    if (!leftKey && !rightKey || leftKey && rightKey) {
      this.xspeed *= this.xfriction;
    } else if (rightKey) {
      this.xspeed ++;
    } else if (leftKey) {
      this.xspeed --;
    }

    this.yspeed += 1;

    if (this.xspeed > this.maxSpeed) {
      this.xspeed = this.maxSpeed;
    } else if (this.xspeed < -this.maxSpeed) {
      this.xspeed = -this.maxSpeed;
    }

    if (this.yspeed > this.maxFall) {this.yspeed = this.maxFall;}

    if(this.jump_cooldown > 0){this.jump_cooldown --;}

    if (this.xspeed > 0) {
      this.xspeedIndep = Math.floor(this.xspeed);
    } else {
      this.xspeedIndep = Math.ceil(this.xspeed);
    }
    if (this.yspeed > 0) {
      this.yspeedIndep = Math.floor(this.yspeed);
    } else {
      this.yspeedIndep = Math.ceil(this.yspeed);
    }

    let horizontalRect = {
      x: this.x + this.xspeedIndep,
      y: this.y,
      width: this.width,
      height: this.height
    }
    let verticalRect = {
      x: this.x,
      y: this.y + this.yspeedIndep,
      width: this.width,
      height: this.height
    }
		let rect = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    }

		if (inAir(rect)) {
			this.grounded = false;
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
    this.y += this.yspeedIndep;
    this.x += this.xspeedIndep;
  }}
  this.shooting = function(){
    if (leftClick == true && this.shootingCooldown <= 0) {
      bullets.push(new Bullet(player1.aimX, player1.aimY, player1.angle));
      this.xspeed -= Math.sin(Math.atan2(mouseX - player1.aimX, mouseY - player1.aimY))*2;
      this.yspeed -= Math.cos(Math.atan2(mouseX - player1.aimX, mouseY - player1.aimY))*5;
      ctx = myGameArea.context;
      this.shootingCooldown = 16;
    }
    else {
      this.shootingCooldown --;
    }
  }

  this.devStuff = function() {
    ctx = myGameArea.context;
    ctx.beginPath();
		ctx.globalAlpha = 0.2;
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.moveTo(this.aimX	, this.aimY);
    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();
  }
}
