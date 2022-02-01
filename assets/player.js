let player = new function () {
  this.position = {
    x: 200,
    y: -1000
  };
  this.size = {
    width: 28,
    height: 52
  };
  this.viewmodel = {
    width: 48,
    height: 54
  }
  this.velocity = {
    x: 0,
    y: 0,
  };
  this.roundedVelocity = {
    x: 0,
    y: 0,
  };
  this.friction = 0.85;
  this.speed = 10 * 64;
  this.gravity = 30 * 64;
  this.jumpForce = 1.4 * 64;
  this.grounded = false;
  this.movementDirectionY;
  this.maxFall = 100 * 64;

  this.sprite = {
    x: 0,
    y: 0,
    width: 64,
    height: 64,
    count: 0,
    count2: 0,
    speed: 0.07,
    trashold: 4.5 * 64,
  }
  this.playerSprite = document.getElementById('pinguin-sprite-sheet');

  this.update = function () {
    this.variableUpdate();
    this.movment();
  }
  this.variableUpdate = function () {
    if (this.velocity.x <= -this.sprite.trashold || this.velocity.x >= this.sprite.trashold) {
      if (this.sprite.count <= this.sprite.speed / secondsPassed) {
        this.sprite.count++
      } else {
        if (this.sprite.count2 == 8) {
          this.sprite.count2 = 0;
        }
        this.sprite.x = this.sprite.width * this.sprite.count2;
        this.sprite.count2++
        this.sprite.count = 0;
      }
    } else {
      this.sprite.x = 0
    }
    if (this.velocity.x < 0) {
      this.sprite.y = 64
    }
    if (this.velocity.x > 0) {
      this.sprite.y = 0
    }
  }

  this.movment = function () {
    this.velocity.x = this.speed * axis.horizontal;

    this.movementDirectionY = this.velocity.y;

    if (controls.up && this.grounded) {
      this.velocity.y = -Math.sqrt(this.jumpForce * 2 * this.gravity);
      this.grounded = false;
    } else {
      this.velocity.y = this.movementDirectionY;
    }

    if (controls.down && !this.grounded) {
      this.velocity.y += this.gravity * 2 * secondsPassed;
    }

    if (!this.grounded) {
      this.velocity.y += this.gravity * secondsPassed;
    }

    if (this.velocity.y > this.maxFall) {
      this.velocity.y = this.maxFall;
    }

    this.roundedVelocity.x = Math.trunc(this.velocity.x * secondsPassed);
    this.roundedVelocity.y = Math.trunc(this.velocity.y * secondsPassed);

    let horizontalRect = {
      x: this.position.x + this.roundedVelocity.x,
      y: this.position.y,
      width: this.size.width,
      height: this.size.height
    }
    let verticalRect = {
      x: this.position.x,
      y: this.position.y + this.roundedVelocity.y,
      width: this.size.width,
      height: this.size.height
    }
    let rect = {
      x: this.position.x,
      y: this.position.y,
      width: this.size.width,
      height: this.size.height
    }

    if (inAir(rect)) {
      this.grounded = false;
    }

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

        if (checkIntersection(horizontalRect, borderRect)) {
          while (checkIntersection(horizontalRect, borderRect)) {
            horizontalRect.x -= Math.sign(this.roundedVelocity.x);
          }
          this.position.x = horizontalRect.x;
          this.roundedVelocity.x = 0;
          this.velocity.x = 0;
        }
        if (checkIntersection(verticalRect, borderRect)) {
          if (groundCheck(verticalRect, borderRect)) {
            this.grounded = true;
          }
          while (checkIntersection(verticalRect, borderRect)) {
            verticalRect.y -= Math.sign(this.roundedVelocity.y);
          }
          this.position.y = verticalRect.y;
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
      this.playerSprite,
      this.sprite.x + 10,
      this.sprite.y + 2,
      48,
      54,
      this.position.x - (this.viewmodel.width - this.size.width) / 2,
      this.position.y - (this.viewmodel.height - this.size.height) / 2,
      this.viewmodel.width,
      this.viewmodel.height
    );
  }
}