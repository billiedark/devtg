import './App.css';
// const tg = window.Telegram.WebApp;
import { useEffect } from 'react';
import { useTelegram } from './hooks/useTelegram';
// import Header from './components/Header/Header';


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
    work
      <button onClick={onClose}>Закрыть</button>
      <span className={'username'}>{user?.username}</span>
    </div>
  );
}

export default App;
