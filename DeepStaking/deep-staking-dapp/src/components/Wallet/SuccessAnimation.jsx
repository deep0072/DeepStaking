import Lottie from "react-lottie";
import animationData from "../lottie/animation.json";
import { useTransactionReceipt } from "@/hooks/use-transaction-receipt";

import React from "react";

const SuccessAnimation = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useTransactionReceipt({
      hash,
    });
  return (
    <div>{<Lottie options={defaultOptions} height={400} width={400} />}</div>
  );
};

export default SuccessAnimation;
