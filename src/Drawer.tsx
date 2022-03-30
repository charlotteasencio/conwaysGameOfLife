import React, { ReactElement, useState } from 'react';
import './Drawer.scss';

export const Drawer = ({ rows, handleSetRows, columns, handleSetColumns, grid, handleSetGrid, handleSetNewGrid, buttonPlayClass, handlePlay, isPlaying }): ReactElement => {
  const [isOpen, setIsOpen] = useState(true);

  const handleSetOpen = (): void => {
    setIsOpen(!isOpen);
  };

  const drawerPosition = isOpen ? 'open' : 'closed';

  return (
    <aside className={`drawerContainer drawerContainer-${drawerPosition}`}>
      <button onClick={handleSetOpen} className={`drawerContainer__button`}>
        {isOpen ? '<' : '>'}
      </button>
      <div className='sidebar'>
        <h2>Settings</h2>
        <div className='sidebar__grid'>
          <div className='sidebar__grid-rows'>
            <label htmlFor='rowNumber'>Rows</label>
            <input type='number' id='rowNumber' value={rows} onChange={handleSetRows}></input>
          </div>
          <div className='sidebar__grid-times'>X</div>
          <div className='sidebar__grid-columns'>
            <label htmlFor='columnNumber'>Columns</label>
            <input type='number' id='columnNumber' value={columns} onChange={handleSetColumns}></input>
          </div>
        </div>
        <div className='sidebar__buttons'>
          <button onClick={handleSetGrid}>Start</button>
          <button onClick={handleSetNewGrid} disabled={grid.length < 1}>
            Next
          </button>
          <button className={buttonPlayClass} onClick={handlePlay} disabled={grid.length < 1}>
            {isPlaying ? 'Stop' : 'Play'}
          </button>
        </div>
      </div>
    </aside>
  );
};
