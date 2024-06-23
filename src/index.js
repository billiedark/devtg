import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const AppWrapper = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        // Создаем axios cancel token
        const source = axios.CancelToken.source();

        const fetchData = async () => {
            const url = 'https://dbd20rank.net/api/stars/user/getinfo';
            const payload = new URLSearchParams();
            payload.append('user_id', '209811551');

            try {
                const response = await axios.post(url, payload.toString(), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    // Передаем cancel token в запрос
                    cancelToken: source.token,
                });
                setUserInfo(response.data);
            } catch (error) {
                // Проверка на отмену запроса
                if (axios.isCancel(error)) {
                    console.log('Запрос отменен');
                } else {
                    console.error('Error fetching user info:', error);
                }
            }
        };

        fetchData();

        // Отмена запроса при размонтировании компонента
        return () => {
            source.cancel('Операция прервана');
        };
    }, []); // Пустой массив зависимостей гарантирует, что useEffect выполнится только один раз

    return (
        <App userInfo={userInfo} />
    );
};

root.render(
    <React.StrictMode>
        <AppWrapper />
    </React.StrictMode>
);
