// LikedStatusContext.js
import React, { createContext, useContext, useState } from 'react';

const LikedStatusContext = createContext();

export const useLikedStatus = () => useContext(LikedStatusContext);

export const LikedStatusProvider = ({ children }) => {
  const [likedStatus, setLikedStatus] = useState({});

  const updateLikedStatus = (id, liked) => {
    setLikedStatus(prevStatus => ({
      ...prevStatus,
      [id]: liked,
    }));
  };

  return (
    <LikedStatusContext.Provider value={{ likedStatus, updateLikedStatus }}>
      {children}
    </LikedStatusContext.Provider>
  );
};
