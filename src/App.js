import './App.css';
// const tg = window.Telegram.WebApp;
import { useEffect, useState } from 'react';
import { useTelegram } from './hooks/useTelegram';

import ProfileCard from './components/ProfileCard/ProfileCard';
import avatarImg from './img/avatar.png';
import RocketStatus from './components/RocketStatus/RocketStatus';

const isDev = true;

function App() {
  const { tg, user } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [])

    tg.expand();

  return (
    <div className="App">

        <RocketStatus
            workerEnergy={2000}
            workerEnergyMax={2000}
            workerEnergyPerTap={10}
            workerEnergyPerSecond={5}
            levelProgress={5000}
            levelProgressMax={5500}
        />
    </div>
  );
}

export default App;
