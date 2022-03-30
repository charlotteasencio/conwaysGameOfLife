import React, { ReactElement, useState } from 'react';
import './Drawer.scss';
import { ArrowIcon } from './icons';

interface DrawerProps {
  rows: number;
  handleSetRows: (e) => void;
  columns: number;
  handleSetColumns: (e) => void;
  grid: Array<Array<boolean>>;
  handleSetGrid: () => void;
  handleSetNewGrid: () => void;
  buttonPlayClass: string;
  handlePlay: () => void;
  isPlaying: boolean;
}

export const Drawer = (props: DrawerProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(true);

  const handleSetOpen = (): void => {
    setIsOpen(!isOpen);
  };

  const drawerPosition = isOpen ? 'open' : 'closed';

  return (
    <aside className={`drawerContainer drawerContainer-${drawerPosition}`}>
      <button aria-label={isOpen ? 'Close' : 'Open'} onClick={handleSetOpen} className={`drawerContainer__button`}>
        <ArrowIcon />
      </button>
      <div className='sidebar'>
        <h2>Settings</h2>
        <div className='sidebar__grid'>
          <div className='sidebar__grid-rows'>
            <label htmlFor='rowNumber'>Rows</label>
            <input type='number' id='rowNumber' value={props.rows} onChange={props.handleSetRows}></input>
          </div>
          <div className='sidebar__grid-times'>X</div>
          <div className='sidebar__grid-columns'>
            <label htmlFor='columnNumber'>Columns</label>
            <input type='number' id='columnNumber' value={props.columns} onChange={props.handleSetColumns}></input>
          </div>
        </div>
        <div className='sidebar__buttons'>
          <button onClick={props.handleSetGrid}>Start</button>
          <button onClick={props.handleSetNewGrid} disabled={props.grid.length < 1}>
            Next
          </button>
          <button className={props.buttonPlayClass} onClick={props.handlePlay} disabled={props.grid.length < 1}>
            {props.isPlaying ? 'Stop' : 'Play'}
          </button>
        </div>
      </div>
    </aside>
  );
};
