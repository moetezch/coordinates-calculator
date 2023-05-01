export const calcualteDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) => {
  const y = x2 - x1;
  const x = y2 - y1;
  return Math.sqrt(x * x + y * y);
};
