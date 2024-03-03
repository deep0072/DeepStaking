// rewardStore.js
import { create } from "zustand";

const useWalletBalance = create((set) => ({
  timeStamp: 0,

  setWalletBalance: () => set({ timeStamp: Date.now() }),
}));

export default useWalletBalance;
