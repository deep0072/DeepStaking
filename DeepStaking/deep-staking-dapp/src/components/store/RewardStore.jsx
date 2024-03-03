// rewardStore.js
import { create } from "zustand";

const useRewardStore = create((set) => ({
  timeStamp: 0,

  setReward: () => set({ timeStamp: Date.now() }),
}));

export default useRewardStore;
