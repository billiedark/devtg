import './App.css';
import { useEffect, useState } from 'react';
import { useTelegram } from './hooks/useTelegram';

import avatarImg from './img/avatar.png';
import RocketStatus from './components/RocketStatus/RocketStatus';

const isDev = false;

function App({ userInfo }) {
    const { tg, user } = useTelegram();

    useEffect(() => {
        tg.ready();
        tg.expand();
    }, [tg]);


    console.log(userInfo)
    const userLevel = userInfo ? userInfo['level'] : 0;
    const userBalance = userInfo ? userInfo['balance'] : 0;
    const ratePerClick = userInfo ? userInfo['rpc'] : 0;
    const energy = userInfo ? userInfo['energy'] : 0;
    const energyPerSecond = userInfo ? userInfo['eps'] : 0;

    return (
    <div className="App">

        <RocketStatus
            workerEnergy={energy}
            workerEnergyMax={2000}
            workerEnergyPerTap={ratePerClick}
            workerEnergyPerSecond={energyPerSecond}
            balance={userBalance}
            level={userLevel}
            levelProgressNext={6000}
            isDev={isDev}
        />
    </div>
    );
}

export default App;
