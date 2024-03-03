// rewardStore.js
import { create } from "zustand";

const useStakeStore = create((set) => ({
  timeStamp: 0,

  setStakeBalance: () => set({ timeStamp: Date.now() }),
}));

export default useStakeStore;
