function loadWorld(data) {
  MainPlayer = new Character({x: 0, y: 0});
  Cam.x = MainPlayer.pos.x - (myCanvas.width - TILE_SIZE) / Cam.z / 2;
  Cam.y = MainPlayer.pos.y - (myCanvas.height - TILE_SIZE) / Cam.z / 2;
  CurrentLevelData = data;
}