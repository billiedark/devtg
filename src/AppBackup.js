import './App.css';
import React, { useEffect, useState } from 'react';
import { useTelegram } from './hooks/useTelegram';
import avatarImg from './img/avatar.png';
import RocketStatus from './components/RocketStatus/RocketStatus';
import BottomMenu from './components/BottomMenu/BottomMenu';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileCard from "./components/ProfileCard/ProfileCard";
// import Onboarding from './components/Onboarding/Onboarding';

function App({ userInfo, isDev }) {
    const { tg, user } = useTelegram();
    const [avatarUrl, setAvatarUrl] = useState(`https://dbd20rank.net/static/img/stars_avatars/${user?.id}.jpg`);
    const username = isDev ? 'chief bacccaraaa' : user?.first_name;
    // const [showOnboarding, setShowOnboarding] = useState(true);

    useEffect(() => {
        tg.ready();
        tg.expand();
    }, [tg]);

    // Обработчик профиля
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

    //if (showOnboarding) {
    //    return <Onboarding onClose={() => setShowOnboarding(false)} />;
    //}

    return (
        <Router>
            <div className="App">
                <ProfileCard
                    avatar={avatarUrl}
                    name={username}
                    level={userLevel}
                    balance={userBalance}
                />
                <Routes>
                    <Route path="/" exact element={
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
                    } />
                    <Route path="/expeditions" exact element={<h1>expo</h1>} />
                    <Route path="/friends" exact element={<h1>friends</h1>} />
                    <Route path="/tasks" exact element={<h1>tasks</h1>} />
                    <Route path="/upgrades" exact element={<h1>hello</h1>} />
                </Routes>
                <BottomMenu />
            </div>
        </Router>
    );
}

export default App;
