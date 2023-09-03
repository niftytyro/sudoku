export const calculateSubGrids = (grid: string) => {
  const subGrids = [];
  const rows = grid.match(/.{9}/g) ?? [];

  for (let i = 0; i < 9; i++) {
    const row = Math.floor(i / 3);
    const column = i % 3;
    subGrids.push("");
    for (let j = 0; j < 3; j++) {
      subGrids[i] += rows[row * 3 + j].slice(column * 3, column * 3 + 3);
    }
  }

  return subGrids;
};

export const calculateCellIndexInGrid = (
  subGridIndex: number,
  cellIndexInSubGrid: number
) => {
  let column = cellIndexInSubGrid % 3;
  let row = Math.floor(cellIndexInSubGrid / 3);

  column += (subGridIndex % 3) * 3;
  row += Math.floor(subGridIndex / 3) * 3;

  const cellIndex = row * 9 + column;

  return cellIndex;
};

