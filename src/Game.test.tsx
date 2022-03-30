import { generateGrid, setLiveDeadCells } from './utils';

describe('game tests', () => {
  const testGrid = [
    [false, false, false, false, false],
    [false, false, true, false, false],
    [false, true, false, false, false],
    [false, false, true, false, false],
    [false, false, false, false, false],
  ];
  it('generates a grid with rows and columns', () => {
    const rows = 5;
    const columns = 5;
    const generatedGrid = generateGrid(rows, columns);
    expect(generatedGrid.length).toEqual(5);
    expect(generatedGrid[0].length).toEqual(5);
  });
  it('sets live and dead cells correctly', () => {
    const newTestGrid = setLiveDeadCells(testGrid);
    const expectedGridOutcome = [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, true, true, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ];
    expect(newTestGrid).toEqual(expectedGridOutcome);
  });
});
