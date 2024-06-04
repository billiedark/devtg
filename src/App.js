import './App.css';
const tg = window.Telegram.WebApp;
import { useEffect } from 'react';


function App() {
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
    </div>
  );
}

export default App;
