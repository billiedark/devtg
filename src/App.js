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
  const [avatarUrl, setAvatarUrl] = useState(`https://dbd20rank.net/static/img/stars_avatars/${user?.id}.jpg`);

  useEffect(() => {
    const checkImage = (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
    };

    const verifyAvatarUrl = async () => {
      const isValid = await checkImage(avatarUrl);
      if (!isValid) {
        setAvatarUrl(avatarImg);
      }
    };

    verifyAvatarUrl();
  }, [avatarUrl]);

  useEffect(() => {
    tg.ready();
  }, [])

    tg.expand();

  return (
    <div className="App">

      <ProfileCard
          avatar={avatarUrl}
          name={user?.first_name}
          //name="chief baccaraaa"
          level={1}
          balance={1500}
      />

        <RocketStatus
            workerEnergy={2000}
            workerEnergyMax={2000}
            workerEnergyPerTap={10}
            workerEnergyPerSecond={5}
            levelProgress={0}
            levelProgressMax={500}
        />
    </div>
  );
}

export default App;
