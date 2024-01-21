import { useState } from "react";
import { useReadContract } from "wagmi";

const GetTotalStakedToken = ({ contractAddress, contractAbi }) => {
    const [visible, setVisible] = useState()
  const result = useReadContract({
    contractAbi,
    address: { contractAddress },
    functionName: "getTotalStakedTokenInContract",
  });

 

  const handleClick = ()=>{
    setVisible(result)
    console.log(result);

    
  }
  return (
    <div>
      <button
        onClick={handleClick}
        class="text-white bg-green-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        getTotalStakedToken
      </button>
    </div>
  );
};

export default GetTotalStakedToken;
