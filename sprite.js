/**
 * Class representing a sprite.
 */
class Sprite {
  /**
   * Create a Sprite.
   * @param {Position} pos - The initial position of the sprite.
   */
  constructor(pos = {x: 0, y: 0}, size = {w: 32, h: 32}) {
    this._pos = pos;
    this._size = size;
  }

  /**
   * Returns sprite position.
   */
  get pos() {
    return this._pos;
  }

  set pos(newPos) {
    this._pos = newPos;
  }

  /**
   * Returns sprite size.
   */
  get size() {
    return this._size;
  }

  /**
   * Draw the sprite.
   */
  draw() {
    drawScreenRect(this.pos, this.size);
  }

}