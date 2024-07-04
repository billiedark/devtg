import React, { createContext, useReducer } from 'react';

const initialState = {
    level: 0,
    balance: 0,
    energy: 22,
    emax: 0,
    rpc: 0,
    eps: 0,
    progress: 0,
};

export const AppContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER_INFO':
            return { ...state, ...action.payload };
        case 'UPDATE_BALANCE':
            return { ...state, balance: action.payload };
        case 'UPDATE_ENERGY':
            return { ...state, energy: action.payload };
        case 'UPDATE_MAX_ENERGY':
            return { ...state, emax: action.payload };
        // Добавьте другие действия по мере необходимости
        default:
            return state;
    }
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};
