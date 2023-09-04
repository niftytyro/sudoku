export const range = (start: number, end: number) => {
  const range = Array(end - start)
    .fill(0)
    .map((_, i) => i + start);

  return range;
};
