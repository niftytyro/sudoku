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

export const checkLatestMove = (grid: string, latestMoveIndex: number) => {
  // Indices to check - row, column and the subgrid
  const errorIndices = new Set<number>();

  // Traversing the row
  const row = Math.floor(latestMoveIndex / 9);
  for (let i = 0; i < 9; i++) {
    const index = row * 9 + i;
    if (grid[index] === grid[latestMoveIndex] && index !== latestMoveIndex) {
      errorIndices.add(index);
    }
  }

  // Traversing the column
  const column = latestMoveIndex % 9;
  for (let i = 0; i < 9; i++) {
    const index = i * 9 + column;
    if (grid[index] === grid[latestMoveIndex] && index !== latestMoveIndex) {
      errorIndices.add(index);
    }
  }

  // Traversing the subgrid
  const subGridColumn = Math.floor(column / 3);
  const subGridRow = Math.floor(row / 3);
  for (let i = 0; i < 3; i++) {
    const row = subGridRow * 3 + i;
    for (let j = 0; j < 3; j++) {
      const column = subGridColumn * 3 + j;
      const index = row * 9 + column;
      if (grid[index] === grid[latestMoveIndex] && index !== latestMoveIndex) {
        errorIndices.add(index);
      }
    }
  }

  if (errorIndices.size) {
    errorIndices.add(latestMoveIndex);
  }

  return errorIndices;
};

export const validateSudokuGrid = (
  grid: string,
  _prevIndices: number[],
  latestMoveIndex: number
) => {
  const prevIndices = new Set(_prevIndices);
  let errorIndices = new Set<number>();

  // TODO Optimize
  prevIndices.add(latestMoveIndex).forEach((index) => {
    const indices = checkLatestMove(grid, index);
    indices.forEach((idx) => errorIndices.add(idx));
  });

  return Array.from(errorIndices);
};

export const extrapolateIndicesForSubGrid = (
  indices: number[],
  subGridIndex: number
) => {
  return indices
    .filter((index) => {
      const row = Math.floor(index / 9);
      const column = index % 9;
      return subGridIndex === Math.floor(row / 3) * 3 + Math.floor(column / 3);
    })
    .map((index) => {
      const row = Math.floor(index / 9) % 3;
      const column = index % 3;

      return row * 3 + column;
    });
};
