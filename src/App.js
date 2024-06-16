import './App.css';
// const tg = window.Telegram.WebApp;
import { useEffect } from 'react';
import { useTelegram } from './hooks/useTelegram';
import Header from './components/Header/Header';

import ProfileCard from './components/ProfileCard/ProfileCard';
import avatarImg from './img/avatar.jpg';

import RocketStatus from './components/RocketStatus/RocketStatus';


function App() {
  const { tg, user } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [])

    tg.expand();

  return (
    <div className="App">

      <ProfileCard
          avatar={avatarImg}
          name={user?.first_name}
          //name="chief baccaraaa"
          level={1}
          balance={1500}
      />

        <RocketStatus
            workerEnergy={2000}
            workerEnergyMax={2000}
            levelProgress={1500}
            levelProgressMax={3000}
        />
    </div>
  );
}

export default App;
