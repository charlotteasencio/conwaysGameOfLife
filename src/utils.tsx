import { useEffect, useRef } from 'react';

export const generateGrid = (rows, columns): Array<Array<number>> => {
  let grid = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < columns; j++) {
      row.push(false);
    }
    grid.push(row);
  }
  return grid;
};

export const setLiveDeadCells = (grid) => {
  let liveSurroundingTilesGrid = JSON.parse(JSON.stringify(grid));
  let newGrid = JSON.parse(JSON.stringify(grid));

  grid.forEach((row, i) => {
    row.forEach((column, j) => {
      //refactor, there has to be a better way than brute force pushing here
      const surroundingTilesArray = [];
      if (j < grid.length - 1) {
        surroundingTilesArray.push(grid[i][j + 1]);
      }
      if (j > 0) {
        surroundingTilesArray.push(grid[i][j - 1]);
      }
      if (j < grid.length - 1 && i > 0) {
        surroundingTilesArray.push(grid[i - 1][j + 1]);
      }
      if (j < grid.length - 1 && i < row.length - 1) {
        surroundingTilesArray.push(grid[i + 1][j + 1]);
      }
      if (i < row.length - 1) {
        surroundingTilesArray.push(grid[i + 1][j]);
      }
      if (i > 0) {
        surroundingTilesArray.push(grid[i - 1][j]);
      }
      if (i > 0 && j > 0) {
        surroundingTilesArray.push(grid[i - 1][j - 1]);
      }
      if (i < row.length - 1 && j > 0) {
        surroundingTilesArray.push(grid[i + 1][j - 1]);
      }
      const liveSurroundingTiles = surroundingTilesArray.filter((value) => value === true).length;

      liveSurroundingTilesGrid[i][j] = liveSurroundingTiles;

      if (grid[i][j] === true) {
        if (liveSurroundingTilesGrid[i][j] < 2 || liveSurroundingTilesGrid[i][j] > 3) {
          newGrid[i][j] = false;
        }
      }
      if (grid[i][j] === false) {
        if (liveSurroundingTilesGrid[i][j] === 3) {
          newGrid[i][j] = true;
        }
      }
    });
  });

  return newGrid;
};

export const useInterval = (callback, delay) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
};
