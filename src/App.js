import './App.css';
import React, { useEffect, useState, useContext } from 'react';
import { useTelegram } from './hooks/useTelegram';
import avatarImg from './img/avatar.png';
import RocketStatus from './components/RocketStatus/RocketStatus';
import BottomMenu from './components/BottomMenu/BottomMenu';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileCard from "./components/ProfileCard/ProfileCard";
import Onboarding from './components/Onboarding/Onboarding';
import { AppContext, AppProvider } from './AppContext';

function App({ userInfo, isDev }) {
    const { tg, user } = useTelegram();
    const [avatarUrl, setAvatarUrl] = useState(`https://dbd20rank.net/static/img/stars_avatars/${user?.id}.jpg`);
    const username = isDev ? 'chief bacccaraaa' : user?.first_name;
    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        tg.ready();
        tg.expand();
        Telegram.WebApp.setHeaderColor('secondary_bg_color');
    }, [tg]);

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
        if (userInfo) {
            dispatch({ type: 'SET_USER_INFO', payload: userInfo });
        }
    }, [userInfo, dispatch]);

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <div className="App">
                <ProfileCard
                    avatar={avatarUrl}
                    name={username}
                    level={state.level}
                    balance={state.balance}
                />
                <Routes>
                    <Route path="/" exact element={
                        <RocketStatus
                            workerEnergy={state.energy}
                            workerEnergyMax={state.emax}
                            workerEnergyPerTap={state.rpc}
                            workerEnergyPerSecond={state.eps}
                            balance={state.balance}
                            levelProgressNext={state.progress}
                            isDev={isDev}
                            dispatch={dispatch}
                            state={state}
                        />
                    } />
                    <Route path="/expeditions" exact element={<h1>В разработке экспедиции</h1>} />
                    <Route path="/friends" exact element={<h1>Друзей пока нет. В поиске</h1>} />
                    <Route path="/tasks" exact element={<h1>В разработке задания</h1>} />
                    <Route path="/upgrades" exact element={<h1>В разработке улучшения</h1>} />
                </Routes>
                <BottomMenu />
            </div>
        </Router>
    );
}

export default function AppWrapper(props) {
    return (
        <AppProvider>
            <App {...props} />
        </AppProvider>
    );
}
