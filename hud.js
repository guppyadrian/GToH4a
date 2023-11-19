class HUDManager {
  constructor(pos = {x: 25, y: 25}, size = {w: 100, h: 100}) {
    this.container = {pos: pos, size: size, color: "grey"};
  }
  
  draw() {
    ctx.fillStyle = this.container.color;
    drawRect(this.container.pos, this.container.size);
    ctx.fillStyle = "black";
  }
}