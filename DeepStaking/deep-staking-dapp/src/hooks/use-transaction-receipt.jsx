import { useEffect, useState } from "react";
import { useWaitForTransactionReceipt } from "wagmi";

export const useTransactionReceipt = ({ hash }) => {
  const [success, setSuccess] = useState(false);
  const data = useWaitForTransactionReceipt({
    hash,
  });



  useEffect(() => {
    if (data.isSuccess) {
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } 
    setSuccess(data.isSuccess);
  }, [data.isSuccess]);

  return {
    ...data,
    isSuccess: success
  };
};
