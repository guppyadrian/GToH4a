const TILE_SIZE = 8;
const CHARACTER_SPEED = 2;
const CHARACTER_JUMP_HEIGHT = 5;
const STEP_SIZE = 0.25;
const STEPS_PER_PIXEL = Math.round(1 / STEP_SIZE);
const GRAVITY = 0.25;


const BlockIdDatabase = [
  "block",
  "blue",
  "red"
];

let CurrentLevelData = [];


const levelOne = [[{x: 0, y: 240}, {w: 500, h: 8}, 0]];