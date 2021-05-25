function enemie(x, y, width, height) {
  this.width = 64;
  this.height = 64;
  this.x = x;
  this.y = y;
  this.playerSpriteOffset = 0;

  this.centerX = 0;
  this.centerY = 0;

	this.playerSprite = document.getElementById('jesus');
	this.lemon = document.getElementById('lemon');

  this.grounded = false;
  this.xspeedIndep = 0;
  this.yspeedIndep = 0;
  this.xspeed = 0;
  this.yspeed = 0;
  this.xfriction = 0.9;
  this.yfriction = 0.9;
  this.maxSpeed = 7;
  this.maxFall = 20;
  this.active = true;

	this.weaponWidth = 20;
	this.weaponHeight = 20;
	this.angle = 0;

	this.aimAngleOffset = 0;
	this.aimX = 0;
	this.aimY = 0;

  this.shootingCooldown = 0;

  this.update = function() {
    this.variableUpdate();
    this.movment();
    this.shooting();
  }
  this.variableUpdate = function() {
    this.centerX = this.x + this.width/2;
    this.centerY = this.y + this.height/2;
	  this.aimX = this.centerX + Math.cos((this.angle +90)* Math.PI / 180)*10;
	  this.aimY = this.centerY + Math.sin((this.angle +90)* Math.PI / 180)*10;

    this.angle = (-Math.atan2(player1.x - this.centerX, player1.y - this.centerY +25) / Math.PI * 180) -20;
		
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
		}
		this.drawPlayer = function() {
      ctx.save();
      ctx.translate(this.centerX, this.centerY);
      if (this.angle < 0) {ctx.scale(-1, 1);} else {ctx.scale(1, 1);}
      ctx.drawImage(this.playerSprite, 0, 0, 64, 64, this.width/-2 +this.playerSpriteOffset, this.height/-2 +3, this.width, this.height);
      ctx.restore();
		}
		this.drawWeapon = function() {
      ctx.save();
      ctx.translate(this.centerX, this.centerY);
      ctx.rotate((this.angle -90) * Math.PI / 180);
      if (this.angle < 0) {ctx.scale(1, -1);} else {ctx.scale(1, 1);}
      ctx.drawImage(this.lemon, this.weaponWidth/-2 -20, this.weaponHeight/-2, this.weaponWidth, this.weaponHeight);
      ctx.restore();
		}

  this.movment = function() {if (this.active) {
    /*
    if (upKey && this.grounded == true) {
      this.yspeed -= 15;
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
    */
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
    if (this.shootingCooldown <= 0) {
      bullets.push(new Grenade(this.aimX, this.aimY, this.angle));
      ctx = myGameArea.context;
      this.shootingCooldown = 120;
    }
    else {
      this.shootingCooldown --;
    }
  }
}
