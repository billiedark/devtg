import './App.css';
// const tg = window.Telegram.WebApp;
import { useEffect } from 'react';
import { useTelegram } from './hooks/useTelegram';
import Header from './components/Header/Header';
import ProfileCard from './components/ProfileCard/ProfileCard';
import avatarImg from './img/avatar.jpg';


function App() {
  const { tg, user } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [])

  const onClose = () => {
    tg.close()
  }

  return (
    <div className="App">
      <Header />

      <ProfileCard
          avatar={avatarImg}
          name="Владислав"
          level={7}
          balance={22000}
      />
    </div>
  );
}

export default App;
