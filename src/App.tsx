import React, { FunctionComponent, useState, useEffect } from 'react';
import {io} from 'socket.io-client';
import './App.css';
import drops from './static/drops.svg';
import temp from './static/temperature.svg'
import './style/style.css'

const socket = io();

export const App: FunctionComponent = () => {

    const [ tempData, setTempData] = useState<number>();
    const [ humData, setHumData] = useState<number>();
  
    useEffect(() => {
      socket.on('probeData',(socket) => {        
        setTempData(socket.temp);
        setHumData(socket.hum);
      })
    }, [tempData, humData]);

  return (
    <div className="app">
    <div className="data-container">
        <img className="drops" src={drops} alt="drops"/>
        <div className="data-text">{humData}</div>
    </div>
    <div className="data-container">
        <img className="drops" src={temp} alt="temp"/>
        <div className="data-text">{tempData}</div>
    </div>
</div>
  );
}

export default App;
