export function drawAngleOnSvg(svg, degrees, radius, lineLength) {
  const [cx, cy] = [svg.viewBox.baseVal.width / 2, svg.viewBox.baseVal.height / 2];
  const startAngle = -degrees * Math.PI / 180;
  const [dx, dy] = [Math.cos(startAngle), Math.sin(startAngle)];
  const largeArc = degrees > 180 ? 1 : 0;

  // draw arc
  const arc = createPath('angle-arc',
    `M ${cx + radius} ${cy} A ${radius} ${radius} 0 ${largeArc} 0 ${cx + radius * dx} ${cy + radius * dy}`);

  // draw lines
  const lines = createPath('angle-lines',
    `M ${cx + lineLength} ${cy} L ${cx} ${cy} L ${cx + lineLength * dx} ${cy + lineLength * dy}`);

  svg.replaceChildren(arc, lines);
}

function createPath(id, d) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.id = id;
  path.setAttribute('d', d);
  return path;
}
