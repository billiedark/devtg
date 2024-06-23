import './App.css';
import { useEffect, useState } from 'react';
import { useTelegram } from './hooks/useTelegram';

import avatarImg from './img/avatar.png';
import RocketStatus from './components/RocketStatus/RocketStatus';

const isDev = true;

function App({ userInfo }) {
    const { tg, user } = useTelegram();

    useEffect(() => {
        tg.ready();
        tg.expand();
    }, [tg]);


    console.log(userInfo)
    const userLevel = userInfo ? userInfo['level'] : 1;
    const userBalance = userInfo ? userInfo['balance'] : 1;
    const ratePerClick = userInfo ? userInfo['rpc'] : 1;

    return (
    <div className="App">

        <RocketStatus
            workerEnergy={2000}
            workerEnergyMax={2000}
            workerEnergyPerTap={ratePerClick}
            workerEnergyPerSecond={1}
            balance={userBalance}
            level={userLevel}
            levelProgressNext={6000}
            isDev={isDev}
        />
    </div>
    );
}

export default App;
