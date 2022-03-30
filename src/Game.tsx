import React, { ReactElement, useRef, useState } from 'react';
import { Drawer } from './Drawer';
import './Game.scss';
import { generateGrid, setLiveDeadCells, useInterval } from './utils';

const GameBoard = ({ grid, numberColumns, setGrid, gameBoardClickableClass }): ReactElement => {
  const tileSize = numberColumns > 60 ? '13px' : '20px';

  const setCells = (i, j) => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[i][j] = grid[i][j] ? false : true;
    setGrid(newGrid);
  };

  return (
    <div className={`gameBoard__container ${gameBoardClickableClass}`}>
      <div className='gameBoard' style={{ display: 'grid', gridTemplateColumns: `repeat(${numberColumns}, ${tileSize})` }}>
        {grid.map((rows, i) => {
          return rows.map((columns, j) => {
            return <div className={`tile tile_${grid[i][j]}`} id={`tile_${i}${j}`} style={{ height: tileSize, width: tileSize }} key={`tile_${i}${j}`} onClick={() => setCells(i, j)} onDragExit={() => setCells(i, j)}></div>;
          });
        })}
      </div>
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
  });

  const handlePlay = () => {
    setIsPlaying(!isPlaying);

    if (!isPlaying) {
      playingRef.current = true;
    }
  };

  const gameBoardClickableClass = isPlaying ? 'gameBoard__container-unclickable' : '-gameBoard__container-clickable';
  const buttonPlayClass = isPlaying ? 'sidebar__buttons-playing' : 'sidebar__buttons-notPlaying';

  return (
    <div className='game'>
      <Drawer rows={rows} buttonPlayClass={buttonPlayClass} handleSetRows={handleSetRows} columns={columns} handleSetColumns={handleSetColumns} grid={grid} handleSetGrid={handleSetGrid} handleSetNewGrid={handleSetNewGrid} handlePlay={handlePlay} isPlaying={isPlaying} />
      <h1>Conway's Game of Life</h1>
      <div className='main'>{grid.length > 0 && <GameBoard grid={grid} numberColumns={grid[0]?.length} setGrid={setGrid} gameBoardClickableClass={gameBoardClickableClass} />}</div>
    </div>
  );
};

export default Game;
