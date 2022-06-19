let player = new function () {
  this.hitBox = { width: 20, height: 46 };
  this.viewmodel = { width: 64, height: 64 };
  this.position = { x: 400, y: -200 };
  this.velocity = { x: 0, y: 0 };

  this.friction = 0.0005;
  this.accelleration = 40 * tileSize;
  this.gravity = 40 * tileSize;
  this.jumpHeight = 1.5 * tileSize;
  this.grounded = false;
  this.jumping = false;
  this.maxVelocity = { x: 400, y: 1000 };

  this.movementDirectionY;

  this.nearBorders = [];

  this.sprite = {
    x: 0,
    y: 0,
    width: 32,
    height: 32,
    time: 0,
    fps: 12,
    triggerTrashold: 1 * 64,
    image: document.getElementById('pinguin-sprite-sheet'),
  }

  this.update = function () {
    this.variableUpdate();
    this.movement();
  }

  this.variableUpdate = function () {
    if (this.velocity.x <= -this.sprite.triggerTrashold || this.velocity.x >= this.sprite.triggerTrashold) {
      this.sprite.time += secondsPassed;
      if (this.sprite.time >= (1 / this.sprite.fps)) {
        this.sprite.time = 0;

        if (this.sprite.x >= this.sprite.image.width - this.sprite.width) {
          this.sprite.x = 0;
        }
        this.sprite.x += this.sprite.width;
      }
    }
    else {
      this.sprite.x = 0
    }

    if (this.velocity.x < 0) {
      this.sprite.y = this.sprite.height;
    }
    if (this.velocity.x > 0) {
      this.sprite.y = 0;
    }
  }

  this.movement = function () {
    if (controls.touchControls) {
      this.velocity.x = this.maxVelocity.x * joyStick.stickX / (joyStick.size / 2);
    } else {
      if (!controls.right && !controls.left || controls.right && controls.left) {
        this.velocity.x *= Math.pow(this.friction, secondsPassed);
      } else if (controls.right) {
        this.velocity.x += this.accelleration * secondsPassed;
      } else if (controls.left) {
        this.velocity.x -= this.accelleration * secondsPassed;
      }
    }

    if (this.velocity.x >= this.maxVelocity.x) {
      this.velocity.x = this.maxVelocity.x;
    }
    if (this.velocity.x <= -this.maxVelocity.x) {
      this.velocity.x = -this.maxVelocity.x;
    }

    this.movementDirectionY = this.velocity.y;

    if (controls.touchControls) {
      if (joyStick.stickY < -(joyStick.size / 2) + 20 && this.grounded) {
        this.velocity.y = -Math.sqrt(this.jumpHeight * 2 * this.gravity);
        this.grounded = false;
        this.jumping = true;
      } else if (joyStick.stickY > (joyStick.size / 2) - 20 && !this.grounded) {
        this.velocity.y += this.gravity * 2 * secondsPassed;
      } else {
        this.velocity.y = this.movementDirectionY;
      }
    } else {
      if (controls.up && this.grounded) {
        this.velocity.y = -Math.sqrt(this.jumpHeight * 2 * this.gravity);
        this.grounded = false;
        this.jumping = true;
      } else if (controls.down && !this.grounded) {
        this.velocity.y += this.gravity * 2 * secondsPassed;
      } else {
        this.velocity.y = this.movementDirectionY;
      }
    }

    this.velocity.y += this.gravity * secondsPassed;

    if (this.velocity.y >= this.maxVelocity.y) {
      this.velocity.y = this.maxVelocity.y;
    }
    if (this.velocity.y <= -this.maxVelocity.y) {
      this.velocity.y = -this.maxVelocity.y;
    }

    this.horizontalRect = {
      x: this.position.x + this.velocity.x * secondsPassed,
      y: this.position.y,
      width: this.hitBox.width,
      height: this.hitBox.height
    }
    this.verticalRect = {
      x: this.position.x,
      y: this.position.y + this.velocity.y * secondsPassed,
      width: this.hitBox.width,
      height: this.hitBox.height
    }
    this.rect = {
      x: this.position.x,
      y: this.position.y,
      width: this.hitBox.width,
      height: this.hitBox.height
    }

    if (intersecting(this.rect)) this.grounded = false;

    for (let i = 0; i < borders.length; i++) {
      if (
        borders[i].x > this.position.x + this.hitBox.width / 2 - tileSize - this.hitBox.width &&
        borders[i].y > this.position.y + this.hitBox.height / 2 - tileSize - this.hitBox.height &&
        borders[i].x < this.position.x + this.hitBox.width / 2 + tileSize + this.hitBox.width &&
        borders[i].y < this.position.y + this.hitBox.height / 2 + tileSize + this.hitBox.height
      ) {
        let borderRect = {
          x: borders[i].x,
          y: borders[i].y,
          width: borders[i].width,
          height: borders[i].height
        }

        if (checkIntersection(this.horizontalRect, borderRect)) {
          while (checkIntersection(this.horizontalRect, borderRect)) {
            this.horizontalRect.x -= Math.sign(this.velocity.x);
          }
          this.position.x = this.horizontalRect.x;
          this.velocity.x = 0;
        }
        if (checkIntersection(this.verticalRect, borderRect)) {
          if (groundCheck(this.verticalRect, borderRect)) {
            this.grounded = true;
            this.jumping = false;
          }
          while (checkIntersection(this.verticalRect, borderRect)) {
            this.verticalRect.y -= Math.sign(this.velocity.y);
          }
          this.position.y = this.verticalRect.y;
          this.velocity.y = 0;
        }
      }
    }

    this.position.x += this.velocity.x * secondsPassed;
    this.position.y += this.velocity.y * secondsPassed;
  }
  this.draw = function () {
    ctx.drawImage(
      this.sprite.image,
      this.sprite.x,
      this.sprite.y,
      this.sprite.width,
      this.sprite.width,
      Math.ceil(this.position.x) - (this.viewmodel.width - this.hitBox.width) / 2,
      Math.ceil(this.position.y) - (this.viewmodel.height - this.hitBox.height) / 2,
      this.viewmodel.width,
      this.viewmodel.height
    );
  }
}