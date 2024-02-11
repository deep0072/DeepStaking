import React, { useState } from "react";
import TotalStakeContext from "./totalStakedCoinContext";

const TotalStakeContextProvider = ({ children }) => {
  const [status, setStatus] = useState(false);
  return (
    <TotalStakeContext.Provider value={{ status, setStatus }}>
      {children}
    </TotalStakeContext.Provider>
  );
};

export default TotalStakeContextProvider;
