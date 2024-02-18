import { useRewardStore } from '@/hooks/use-RewardStore';
import React, { useContext } from 'react'
import TotalRewardContext from '../context/rewardContext'

const RewardBalance = () => {
  const reward = useRewardStore((state) => state.reward);
  console.log(reward)
    

    
  return (
    <div>{reward}</div>
  )
}

export default RewardBalance