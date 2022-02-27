let player = new function () {
  this.position = { x: 400, y: -200 };
  this.hitBox = { width: 20, height: 46 };
  this.viewmodel = { width: 64, height: 64 };
  this.velocity = { x: 0, y: 0 };
  this.roundedVelocity = { x: 0, y: 0 };

  this.friction = 0.85;
  this.accelleration = 2000;
  this.gravity = 40 * tileSize;
  this.jumpHeight = 1.5 * tileSize;
  this.grounded = false;
  this.maxFall = 400 * tileSize;
  this.maxVelocity = 600;

  this.movementDirectionY;

  this.nearBorders = [];

  this.sprite = {
    x: 0,
    y: 0,
    width: 32,
    height: 32,
    time: 0,
    index: 0,
    speed: 0.08,
    triggerTrashold: 2.5 * 64,
    image: document.getElementById('pinguin-sprite-sheet'),
  }

  this.update = function () {
    this.variableUpdate();
    this.movement();
  }

  this.variableUpdate = function () {
    if (this.velocity.x <= -this.sprite.triggerTrashold || this.velocity.x >= this.sprite.triggerTrashold) {
      if (this.sprite.time <= this.sprite.speed / secondsPassed) {
        this.sprite.time++
      } else {
        if (this.sprite.index == 8) {
          this.sprite.index = 0;
        }
        this.sprite.x = this.sprite.width * this.sprite.index;
        this.sprite.index++
        this.sprite.time = 0;
      }
    } else {
      this.sprite.x = 0
    }
    if (this.velocity.x < 0) {
      this.sprite.y = this.sprite.height;
    }
    if (this.velocity.x > 0) {
      this.sprite.y = 0
    }
  }

  this.movement = function () {
    if (controls.touchControls) {
      this.velocity.x = this.maxVelocity * joyStick.stickX / (joyStick.size / 2);
    } else {
      if (!controls.right && !controls.left || controls.right && controls.left) {
          this.velocity.x *= Math.pow(0.1, secondsPassed);
      } else if (controls.right) {
          this.velocity.x += this.accelleration * secondsPassed;
      } else if (controls.left) {
          this.velocity.x -= this.accelleration * secondsPassed;
      }
    }

    if (this.velocity.x >= this.maxVelocity) {
      this.velocity.x = this.maxVelocity;
    }
    if (this.velocity.x <= -this.maxVelocity) {
        this.velocity.x = -this.maxVelocity;
    }

    this.movementDirectionY = this.velocity.y;

    if (controls.touchControls) {
      if (joyStick.stickY < -(joyStick.size / 2) + 10 && this.grounded) {
        this.velocity.y = -Math.sqrt(this.jumpHeight * 2 * this.gravity);
        this.grounded = false;
      } else {
        this.velocity.y = this.movementDirectionY;
      }

      if (joyStick.stickY > (joyStick.size / 2) - 10 && !this.grounded) this.velocity.y += this.gravity * 2 * secondsPassed;
    } else {
      if (controls.up && this.grounded) {
        this.velocity.y = -Math.sqrt(this.jumpHeight * 2 * this.gravity);
        this.grounded = false;
      } else {
        this.velocity.y = this.movementDirectionY;
      }

      if (controls.down && !this.grounded) this.velocity.y += this.gravity * 2 * secondsPassed;
    }
    this.velocity.y += this.gravity * secondsPassed;

    if (this.velocity.y > this.maxFall) {
      this.velocity.y = this.maxFall;
    }

    this.roundedVelocity.x = Math.trunc(this.velocity.x * secondsPassed);
    this.roundedVelocity.y = Math.trunc(this.velocity.y * secondsPassed);

    this.horizontalRect = {
      x: this.position.x + this.roundedVelocity.x,
      y: this.position.y,
      width: this.hitBox.width,
      height: this.hitBox.height
    }
    this.verticalRect = {
      x: this.position.x,
      y: this.position.y + this.roundedVelocity.y,
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
        borders[i].x > -cameraMovement.x &&
        borders[i].y > -cameraMovement.y &&
        borders[i].x < canvas.width - cameraMovement.x &&
        borders[i].y < canvas.height - cameraMovement.y
      ) {
        let borderRect = {
          x: borders[i].x,
          y: borders[i].y,
          width: borders[i].width,
          height: borders[i].height
        }

        if (checkIntersection(this.horizontalRect, borderRect)) {
          while (checkIntersection(this.horizontalRect, borderRect)) {
            this.horizontalRect.x -= Math.sign(this.roundedVelocity.x);
          }
          this.position.x = this.horizontalRect.x;
          this.roundedVelocity.x = 0;
          this.velocity.x = 0;
        }
        if (checkIntersection(this.verticalRect, borderRect)) {
          if (groundCheck(this.verticalRect, borderRect)) {
            this.grounded = true;
          }
          while (checkIntersection(this.verticalRect, borderRect)) {
            this.verticalRect.y -= Math.sign(this.roundedVelocity.y);
          }
          this.position.y = this.verticalRect.y;
          this.roundedVelocity.y = 0;
          this.velocity.y = 0;
        }
      }
    }

    this.position.x += this.roundedVelocity.x;
    this.position.y += this.roundedVelocity.y;
  }
  this.draw = function () {
    ctx.drawImage(
      this.sprite.image,
      this.sprite.x,
      this.sprite.y,
      this.sprite.width,
      this.sprite.width,
      this.position.x - (this.viewmodel.width - this.hitBox.width) / 2,
      this.position.y - (this.viewmodel.height - this.hitBox.height) / 2,
      this.viewmodel.width,
      this.viewmodel.height
    );
  }
}