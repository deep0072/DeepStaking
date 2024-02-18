import React, { useContext, useState } from "react";
import TotalRewardContext  from "./rewardContext";

const TotalRewardContextProvider = ({children}) => {
    const [rewardTotal, setRewardTotal] = useState(0);

   
    
  return (
    <TotalRewardContext.Provider value={{rewardTotal,setRewardTotal}}>
        {children}

    </TotalRewardContext.Provider>
  )
}

export default TotalRewardContextProvider