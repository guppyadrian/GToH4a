/*
  Quick-Start:
  - ctx
  - Keys
  - Cam
  - toScreen()
*/


const ctx = myCanvas.getContext("2d");
const Cam = {x: 0, y: 100, z: 1};

/**
 * Converts a game position to a screen position.
 * @param {Position} pos - The game position.
 * @returns {Position} The converted screen position.
 */
function toScreen(pos = {x: 0, y: 0}) {
  return {x: (pos.x - Cam.x) * Cam.z, y: (pos.y - Cam.y) * Cam.z};
}

/**
 * Draws a rectangle.
 * @param {Position} pos - The topleft position of rectangle.
 * @param {Size} size - The size of the rectangle.
 */
function drawRect(pos = {x: 0, y: 0}, size = {w: 32, h: 32}) {
  ctx.fillRect(Math.floor(pos.x), Math.floor(pos.y), Math.ceil(size.w), Math.ceil(size.h));
}

/**
 * Draws a rectangle in screen position.
 * @param {Position} pos - The topleft position of the rectangle. 
 * @param {Size} size - The size of the rectangle.
 */
function drawScreenRect(pos = {x: 0, y: 0}, size = {w: 32, h: 32}) {
  const screenSize = toScreen(pos);
  const sizeSize = {w: size.w * Cam.z, h: size.h * Cam.z};
  drawRect(screenSize, sizeSize);
}

/**
 * Clears the canvas.
 */
function clearScreen() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
}

/**
 * Check if 2 areas are colliding.
 * @param {Position} pos1 - Position of first area.
 * @param {Size} size1 - Size of first area.
 * @param {Position} pos2 - Position of second area.
 * @param {Size} size2 - Size of second area.
 * @returns {Boolean} Whether or not the 2 areas are colliding.
 */
function collisionCheck(pos1, size1, pos2, size2) {
  if (pos1.x < pos2.x + size2.w && pos1.x + size1.w > pos2.x) {
    if (pos1.y < pos2.y + size2.h && pos1.y + size1.h > pos2.y) {
      return true;
    }
  }
  return false;
}

/**
 * Handles keyboard input.
 *
 * @param {KeyboardEvent} key - Event from addEventListener.
 * @param {boolean} keydown - Event is keydown or keyup?
 */
/* UNUSED IN FAVOR OF `controls.js`
function keyHandler(key, keydown = false) {
  Keys[key.code] = keydown;
}

addEventListener("keydown", k => (keyHandler(k, true)));
addEventListener("keyup", k => (keyHandler(k, false)));
*/