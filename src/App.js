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


  return (
    <div className="App">

      <ProfileCard
          avatar={avatarImg}
          name={user?.first_name}
          level={7}
          balance={22000}
      />

        <RocketStatus
            workerEnergy={1700}
            workerEnergyMax={2000}
            levelProgress={1300}
            levelProgressMax={4000}
        />
    </div>
  );
}

export default App;
