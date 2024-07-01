import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App';

import { useTelegram } from './hooks/useTelegram';

const root = ReactDOM.createRoot(document.getElementById('root'));

const isDev = true;

const AppWrapper = () => {
    const [userInfo, setUserInfo] = useState(null);
    const { tg, user } = useTelegram();
    const user_id = isDev ? '209811551' : user?.id;

    useEffect(() => {
        const source = axios.CancelToken.source();

        const fetchData = async () => {
            const url = 'https://dbd20rank.net/api/stars/user/getinfo';
            const payload = new URLSearchParams();
            payload.append('user_id', user_id);

            try {
                const response = await axios.post(url, payload.toString(), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    cancelToken: source.token,
                });
                setUserInfo(response.data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Запрос отменен');
                } else {
                    console.error('Error fetching user info:', error);
                }
            }
        };

        fetchData();

        return () => {
            source.cancel('Операция прервана');
        };
    }, [user_id]); // Добавляем зависимость user_id, чтобы запрос выполнялся только при изменении user_id

    return (
        <App
            userInfo={userInfo}
            isDev={isDev}
        />
    );
};

root.render(
    <React.StrictMode>
        <AppWrapper />
    </React.StrictMode>
);
