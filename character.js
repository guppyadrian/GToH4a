class Character extends Sprite {
  constructor(pos = {x: 0, y: 0}) {
    super(pos, {w: TILE_SIZE, h: TILE_SIZE});

    this.vel = {x: 0, y: 0};
    this.maxSpeed = CHARACTER_SPEED;
    this.canJump = false;
    this.blueActive = false;
    this.spaceHeldDown = false;
    this.jumpHeldDown = false;
    this.wallJump = 0;
  }

  moveBy(pos = {x: 0, y: 0}) {
    this._pos.x += pos.x;
    this._pos.y += pos.y;
  }

  moveByX(x) {
    this._pos.x += x;
  }

  moveByY(y) {
    this._pos.y += y;
  }

  /**
   * Checks collision but detects block type.
   * @param {BlockArea} block - The area to check collision with.
   * @returns Boolean of whether or not player collides with block.
   */
  smartCollisionCheck(block) {
    switch(block[2]) {
      case 0:
        break;
      case 1:
        if (!this.blueActive)
          return false;
        break;
      case 2:
        if (this.blueActive)
          return false;
        break;
      case 3:
        if (collisionCheck(this.pos, this.size, block[0], block[1])) {
          loadWorld(levelOne);
          return false;
        } else {
          return false;
        }
      default:
        break;
    }
    return collisionCheck(this.pos, this.size, block[0], block[1]);
  }

  /**
   * Handles wall collisions, after updating X pos.
   * @returns Boolean on if it successfully removed player from wall.
   */

  slopeCollisionCheck() {
    for (let i = 0; i < 3 * STEPS_PER_PIXEL; i++) {
      this._pos.y -= STEP_SIZE;
      if (!this.fullCollisionCheck()) return true;
    }
    this._pos.y += 3;
    return false;
  }

  wallCollisionCheck() {
    /* If not touching return */
    if (!this.fullCollisionCheck()) return false;

    /* Try moving up if it's a slope */
    if (this.slopeCollisionCheck()) return false;

    const oldVelX = this.vel.x;
    //this.vel.x = 0;
    /* move player back until not touching */
    for (let i = 0; i < Math.abs(oldVelX) * STEPS_PER_PIXEL; i += 1) {
      this._pos.x -= Math.sign(oldVelX) * STEP_SIZE;
      if (!this.fullCollisionCheck()) return true;
    }

    /* If too deep in move character back */
    this._pos.x += oldVelX;
    return false;
  }

  /**
   * Handles floor collisions, after updating Y pos.
   */
  floorCollisionCheck() {
    if (!this.fullCollisionCheck()) return;

    const oldVelY = this.vel.y;
    this.vel.y = 0;
    this.canJump = true;
    for (let i = 0; i < oldVelY * STEPS_PER_PIXEL; i++) {
      this._pos.y -= STEP_SIZE;
      if (!this.fullCollisionCheck()) return;
    }
    this._pos.y += Math.abs(oldVelY);
    this.ceilingCollisionCheck();
  }

  ceilingCollisionCheck() {
    if (!this.fullCollisionCheck()) return;

    this.vel.y = 0;
    while(this.fullCollisionCheck()) {
      this._pos.y += STEP_SIZE;
    }
  }

  fullCollisionCheck() {
    for (let i = 0; i < CurrentLevelData.length; i++) {
      const currentBlock = CurrentLevelData[i];
      if (this.smartCollisionCheck(currentBlock)) {
        return true;
      }
    }
    return false;
  }

  tick() {

    if (Keys.KeySpace && !this.spaceHeldDown) {
      this.spaceHeldDown = true;
      this.blueActive = !this.blueActive;
    } else if (!Keys.KeySpace) {
      this.spaceHeldDown = false;
    }

    /* Update X */
    const xAccel = Keys.KeyRight - Keys.KeyLeft;

    if (this.wallJump === 0) {
      this.vel.x += xAccel * 0.25;
    } else {
      this.wallJump--;
    }

    if (Math.abs(this.vel.x) > this.maxSpeed) {
      this.vel.x = this.maxSpeed * Math.sign(this.vel.x);
    }
    if (xAccel === 0) {
      if (this.wallJump === 0 && Math.abs(this.vel.x > 0.25)) {
        this.vel.x -= 0.5 * Math.sign(this.vel.x);
      } else {
        this.vel.x -= 0.25 * Math.sign(this.vel.x);
      }
    }

    this.moveByX(this.vel.x);

    /* Wall jumping */
    if (this.wallCollisionCheck()) {
      if (Keys.KeyUp && Math.abs(this.vel.x) >= 2) {
        if (this.wallJump < 7) {
          this.vel.x *= -1.2;
          this.vel.x = Math.round(this.vel.x * 4) / 4;
          this.vel.y = -CHARACTER_JUMP_HEIGHT + 2;
          this.wallJump = 10;
        }
      } else {
        this.vel.x = 0;
      }
    }

    /* Update Y */ /*   first: at start of jump  second: at end of jump   */
    if (this.vel.y > -4.5 && (this.vel.y > -3 || Keys.KeyUp) && !Keys.KeyDown) {
      this.vel.y += GRAVITY;
    } else {
      this.vel.y += GRAVITY * 2;
    }
    
    if (this.vel.y >= 7) {
      this.vel.y = 7;
    }

    if (this.vel.y > 1.5) {
      this.canJump = false;
    }

    

    if (Keys.KeyUp && !this.jumpHeldDown && this.canJump) {
      this.canJump = false;
      this.jumpHeldDown = true;
      this.vel.y = -CHARACTER_JUMP_HEIGHT;
    } else if (!Keys.KeyUp) {
      this.jumpHeldDown = false;
    }

    /* Move + Collide */
    this.moveByY(this.vel.y);
    if (this.vel.y > 0) {
      this.floorCollisionCheck();
    } else if (this.vel.y < 0) {
      this.ceilingCollisionCheck();
    }
  }
}