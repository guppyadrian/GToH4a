const GAME_FRAMERATE = 60;


const MainPlayer = new Character({x: 0, y: 0});
Cam.z = 4;

CurrentLevelData = [
  [{x: 0, y: 240}, {w: 500, h: 8}, 0], // floor
  [{x: 160, y: 238}, {w: 64, h: 8}, 0], // slop e
  [{x: 64, y: 208}, {w: 16, h: 40}, 0], //column
  [{x: 56, y: 192}, {w: 16, h: 8}, 0], // little bump on column
  [{x: 56, y: 200}, {w: 8, h: 4}, 0], // little bottom bump on column
  [{x: 96, y: 192}, {w: 8, h: 8}, 0], // floating square
  [{x: 24, y: 200}, {w: 16, h: 8}, 1], // left blue
  [{x: 128, y: 160}, {w: 64, h: 8}, 1], // right blue
  [{x: 128, y: 200}, {w: 64, h: 8}, 2], // red
  [{x: 208, y: 100}, {w: 8, h: 140}, 0],
  [{x: 96, y: 160}, {w: 8, h: 8}, 3]
];

/**
 * Runs every frame.
 */
function Tick() {
  fpsTicks++;

  MainPlayer.tick();

  Cam.x += (MainPlayer.pos.x - (myCanvas.width - TILE_SIZE) / Cam.z / 2 - Cam.x) / 4;
  Cam.y += (MainPlayer.pos.y - (myCanvas.height - TILE_SIZE) / Cam.z / 2 - Cam.y) / 4;

  clearScreen();

  /* Debug Menu */
  ctx.font = "20px Arial";
  ctx.fillText("X: " + MainPlayer.pos.x, 100, 20);
  ctx.fillText("Xa: " + MainPlayer.vel.x, 10, 20);
  ctx.fillText("Y: " + MainPlayer.pos.y, 100, 40);
  ctx.fillText("Ya: " + MainPlayer.vel.y, 10, 40);
  ctx.fillText("fps: " + dispFPS + "  low: " + lowFPS, 10, 60);

  /* Draw floor temporarily */

  for (let i = 0; i < CurrentLevelData.length; i++) {
    const currentBlock = CurrentLevelData[i];
    drawArea(currentBlock, MainPlayer.blueActive);
  }

  MainPlayer.draw();
}


setInterval(Tick, Math.ceil(1000 / GAME_FRAMERATE)); /* Runs tick every frame */