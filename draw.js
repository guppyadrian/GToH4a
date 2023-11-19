function drawArea(area, blueActive) {
  switch(area[2]) {
    case 0:
      ctx.fillStyle = "lime";
      break;
    case 2:
      ctx.fillStyle = "red";
      if (blueActive)
        ctx.globalAlpha = 0.5;
      break;
    case 1:
      ctx.fillStyle = "blue";
      if (!blueActive)
        ctx.globalAlpha = 0.5;
      break;
    case 3:
      ctx.fillStyle = "green";
      break;
    default:
      ctx.fillStyle = "purple";
      break;
  }

  drawScreenRect(area[0], area[1]);

  /* Reset CTX Settings */
  ctx.fillStyle = "Black";
  ctx.globalAlpha = 1;
}