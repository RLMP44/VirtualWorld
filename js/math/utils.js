function getNearestPoint(loc, points, threshold = Number.MAX_SAFE_INTEGER) {
  let minDist = Number.MAX_SAFE_INTEGER;
  let nearest = null;
  for (const point of points) {
    const dist = distance(point, loc);
    if (dist < minDist && dist < threshold) {
      minDist = dist;
      nearest = point;
    }
  }
  return nearest;
}

function distance(point1, point2) {
  return Math.hypot(point1.x - point2.x, point1.y - point2.y);
}

function add(point1, point2) {
  return new Point(point1.x + point2.x, point1.y + point2.y);
}

function subtract(point1, point2) {
  return new Point(point1.x - point2.x, point1.y - point2.y);
}

function scale(point, scaler) {
  return new Point(point.x * scaler, point.y * scaler);
}

function translate(loc, angle, offset) {
  return new Point(
    loc.x + Math.cos(angle) * offset,
    loc.y + Math.sin(angle) * offset
  )
}

function angle(point) {
  // arc tangent 2 method
  return Math.atan2(point.y, point.x)
}
