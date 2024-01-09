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

function average(point1, point2) {
  return new Point((point1.x + point2.x) / 2, (point1.y + point2.y) / 2);
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

function getIntersection(A, B, C, D) {
  const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
  const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
  const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

  if (bottom != 0) {
     const t = tTop / bottom;
     const u = uTop / bottom;
     if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        return {
           x: lerp(A.x, B.x, t),
           y: lerp(A.y, B.y, t),
           offset: t,
        };
     }
  }

  return null;
}

// linear interpolation = lerp
function lerp(a, b, t) {
  return a + (b - a) * t;
}

function getRandomColor() {
  const hue = 290 + Math.random() * 260;
  return "hsl(" + hue + ", 100%, 60%)";
}
