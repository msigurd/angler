export function drawAngleOnCanvas(canvas, degrees, radius, lineLength) {
  const ctx = canvas.getContext('2d');
  const [cx, cy] = [canvas.width / 2, canvas.height / 2];
  const startAngle = -degrees * Math.PI / 180;

  // draw arc
  ctx.beginPath();
  ctx.arc(cx, cy, radius, startAngle, 0);
  ctx.strokeStyle = 'red';
  ctx.stroke();

  // draw lines
  ctx.beginPath();
  ctx.moveTo(cx + lineLength, cy);
  ctx.lineTo(cx, cy);
  ctx.lineTo(cx + lineLength * Math.cos(startAngle), cy + lineLength * Math.sin(startAngle));
  ctx.strokeStyle = 'black';
  ctx.stroke();
}
