import './App.css';
import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AppContext, AppProvider } from './AppContext';
import { useTelegram } from './hooks/useTelegram';

import avatarImg from './img/avatar.png';

import RocketStatus from './components/RocketStatus/RocketStatus';
import BottomMenu from './components/BottomMenu/BottomMenu';
import ProfileCard from "./components/ProfileCard/ProfileCard";
import Onboarding from './components/Onboarding/Onboarding';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import LevelUp from './components/LevelUp/LevelUp';
import Friends from './components/Friends/Friends';

function App({ userInfo, isDev }) {
    const { tg, user } = useTelegram();
    const [avatarUrl, setAvatarUrl] = useState(`https://dbd20rank.net/static/img/stars_avatars/${user?.id}.jpg`);
    const username = isDev ? 'chief bacccaraaa' : user?.first_name;
    const { state, dispatch } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        tg.ready();
        tg.expand();
        // Telegram.WebApp.setHeaderColor('secondary_bg_color');

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

        const fetchData = async () => {
            await verifyAvatarUrl();
            if (userInfo) {
                dispatch({ type: 'SET_USER_INFO', payload: userInfo });
            }
        };

        fetchData();

        // Set the loading state to false after all resources are loaded
        window.onload = () => {
            setIsLoading(false);
        };
    }, [avatarUrl, userInfo, dispatch, tg]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <Router>
            <div className="App">
                {/* <LevelUp /> */}
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
                    <Route path="/friends" exact element={
                        <Friends />
                    } />
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
