const Keys = {KeyUp: false, KeyLeft: false, KeyDown: false, KeyRight: false};
const ControlMapping = {
  "KeyW": "KeyUp", "ArrowUp": "KeyUp",
  "KeyA": "KeyLeft", "ArrowLeft": "KeyLeft",
  "KeyS": "KeyDown", "ArrowDown": "KeyDown",
  "KeyD": "KeyRight", "ArrowRight": "KeyRight",
  "Space": "KeySpace"
};

/**
 * Handles keyboard input.
 *
 * @param {KeyboardEvent} key - Event from addEventListener.
 * @param {boolean} keydown - Event is keydown or keyup?
 */
function keyHandler(key, keydown = false) {
  if (key.code in ControlMapping) {
    Keys[ControlMapping[key.code]] = keydown;
  }
}

addEventListener("keydown", k => (keyHandler(k, true)));
addEventListener("keyup", k => (keyHandler(k, false)));