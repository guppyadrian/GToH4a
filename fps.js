const CHECKS_PER_SECOND = 4;

let fps = new Array(CHECKS_PER_SECOND).fill(0);
let dispFPS = 0;
let lowFPS = 0;
let highFPS = 0;
let fpsTicks = 0;

setInterval(() => {
  fps.push(fpsTicks * CHECKS_PER_SECOND);
  fps.shift();
  dispFPS = fps.reduce((ps, a) => ps + a, 0) / fps.length;
  lowFPS = fps.reduce((ps, a) => Math.min(ps, a), 1000);
  highFPS = fps.reduce((ps, a) => Math.max(ps, a), 0);
  fpsTicks = 0;
}, 1000 / CHECKS_PER_SECOND);