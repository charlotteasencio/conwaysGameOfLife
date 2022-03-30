import React, { ReactElement, useRef, useState } from 'react';
import './Game.scss';
import { generateGrid, setLiveDeadCells, useInterval } from './utils';

const GameBoard = ({ grid, numberColumns, setGrid }): ReactElement => {
  const tileSize = numberColumns > 50 ? '15px' : '20px';

  const setCells = (i, j) => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[i][j] = grid[i][j] ? false : true;
    setGrid(newGrid);
  };

  return (
    <div className='gameBoard' style={{ display: 'grid', gridTemplateColumns: `repeat(${numberColumns}, ${tileSize})` }}>
      {grid.map((rows, i) => {
        return rows.map((columns, j) => {
          return <div className={`tile tile_${grid[i][j]}`} id={`tile_${i}${j}`} style={{ height: tileSize, width: tileSize }} key={`tile_${i}${j}`} onClick={() => setCells(i, j)}></div>;
        });
      })}
    </div>
  );
};

const Game = (): ReactElement => {
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);
  const [grid, setGrid] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSetColumns = (e): void => {
    setColumns(parseInt(e.target.value));
  };

  const handleSetRows = (e): void => {
    setRows(parseInt(e.target.value));
  };

  const handleSetGrid = (): void => {
    if (rows < 5 || columns < 5 || rows >= 100 || columns >= 100) {
      alert('Invalid input for numbers');
    } else {
      setGrid(generateGrid(rows, columns));
    }
  };

  const handleSetNewGrid = () => {
    setGrid(setLiveDeadCells(grid));
  };

  const playingRef = useRef(isPlaying);
  playingRef.current = isPlaying;

  const runPlay = (grid) => {
    if (!playingRef.current) {
      return;
    }
    const newGrid = setLiveDeadCells(grid);
    setGrid(newGrid);
  };

  useInterval(() => {
    runPlay(grid);
  }, 1000);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);

    if (!isPlaying) {
      playingRef.current = true;
    }
  };

  const gameBoardClickableClass = isPlaying ? 'gameBoard__container-unclickable' : '-gameBoard__container-clickable';
  const headerButtonPlayClass = isPlaying ? 'header__buttons-playing' : 'header__buttons-notPlaying';

  return (
    <div className='game'>
      <div className='header'>
        <h1>Conway's Game of Life</h1>
        <div className='header__grid'>
          <div className='header__grid-rows'>
            <label htmlFor='rowNumber'>Rows</label>
            <input type='number' id='rowNumber' value={rows} onChange={handleSetRows}></input>
          </div>
          <div className='header__grid-times'>X</div>
          <div className='header__grid-columns'>
            <label htmlFor='columnNumber'>Columns</label>
            <input type='number' id='columnNumber' value={columns} onChange={handleSetColumns}></input>
          </div>
        </div>
        <div className='header__buttons'>
          <button onClick={handleSetGrid}>Start</button>
          <button onClick={handleSetNewGrid} disabled={grid.length < 1}>
            Next
          </button>
          <button className={headerButtonPlayClass} onClick={handlePlay} disabled={grid.length < 1}>
            {isPlaying ? 'Stop' : 'Play'}
          </button>
        </div>
      </div>
      {grid.length > 0 && (
        <div className={`gameBoard__container ${gameBoardClickableClass}`}>
          <GameBoard grid={grid} numberColumns={grid[0]?.length} setGrid={setGrid} />
        </div>
      )}
    </div>
  );
};

export default Game;
