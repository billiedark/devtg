import './App.css';
import { useEffect } from 'react';
import { useTelegram } from './hooks/useTelegram';

import avatarImg from './img/avatar.png';
import RocketStatus from './components/RocketStatus/RocketStatus';

function App({ userInfo, isDev }) {
    const { tg } = useTelegram();

    useEffect(() => {
        tg.ready();
        tg.expand();
    }, [tg]);

    // Если userInfo еще не загружен, возвращаем null или Loader
    if (!userInfo) {
        return <div>Loading...</div>;
    }

    const userLevel = userInfo.level || 0;
    const userBalance = userInfo.balance || 0;
    const ratePerClick = userInfo.rpc || 0;
    const energy = userInfo.energy || 0;
    const energyPerSecond = userInfo.eps || 0;
    const levelProgress = userInfo.progress || 0;
    const energyMax = userInfo.emax || 0;

    return (
        <div className="App">
            <RocketStatus
                workerEnergy={energy}
                workerEnergyMax={energyMax}
                workerEnergyPerTap={ratePerClick}
                workerEnergyPerSecond={energyPerSecond}
                balance={userBalance}
                level={userLevel}
                levelProgressNext={levelProgress}
                isDev={isDev}
            />
        </div>
    );
}

export default App;
