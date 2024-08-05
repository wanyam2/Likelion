// src/contexts/BlueLightContext.js
import React, { createContext, useState, useContext } from 'react';

const BlueLightContext = createContext();

export const BlueLightProvider = ({ children }) => {
    const [blueLight, setBlueLight] = useState(false);

    const toggleBlueLight = () => {
        setBlueLight(prevState => !prevState);
    };

    return (
        <BlueLightContext.Provider value={{ blueLight, toggleBlueLight }}>
            {children}
        </BlueLightContext.Provider>
    );
};

export const useBlueLight = () => useContext(BlueLightContext);
