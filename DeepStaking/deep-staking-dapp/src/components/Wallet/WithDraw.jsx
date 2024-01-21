// import React, { useState } from "react";
// import { parseEther } from "viem";
// import {
//   useContractReads,
//   useContractWrite,
//   usePrepareContractWrite,
// } from "wagmi";
// import {
//   contractAddress,
//   deepStakingAbi,
//   rewardTokenAddress,
//   RewardAbi,
// } from "../../ABI/abi";
// import { Button } from "../ui/button";
// import Lottie from 'react-lottie';
// import animationData from '../animation/animation.json'
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "../ui/drawer";
// import { Input } from "../ui/input";
// import { ButtonLoader } from "./utils/Loader";

// // const defaultOptions = {
// //   loop: true,
// //   autoplay: true,
// //   animationData: animationData,
// //   rendererSettings: {
// //     preserveAspectRatio: 'xMidYMid slice',
// //   },
// // };
// const WithDraw = () => {
//   const [value, setValue] = useState();
//   const [visible, setVisible] = useState(true);
  
//     const { config } = usePrepareContractWrite({
//         address: contractAddress,
//         abi: deepStakingAbi,
//         functionName: "withDraw",
//         args:[value]
//       });
//       const { data, isLoading, isSuccess, write } = useContractWrite(config);
//       const handleWithDraw = () => {
//         console.log("clicked");
//         if (value >1){
//           write?.();
//           setVisible(!visible);

//         }

       

//       };
//       console.log(data, "data")
//   return (
//     <div>
//       <Drawer>
//         <DrawerTrigger asChild>
//           <Button variant="outline">withdraw</Button>
//         </DrawerTrigger>

//         <DrawerContent>
//           <div className="mx-auto w-full max-w-sm ">
          
//             <DrawerFooter>
//               <Input
//                 onChange={(e) => {
//                   setValue(parseEther(e.target.value));
//                 }}
//                 placeholder="enter amount"
//               ></Input>
              
//               {isLoading?<Lottie
//              animationData={animationData}
//             />: <Button   className=" w-40 m-auto mt-5  flex justify-center items-center text-sky-200 border-2 rounded-lg border-sky-200 hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]" onClick={handleWithDraw}>Submit</Button>}

//               <DrawerClose>
//                 <Button variant="outline">Cancel</Button>
//               </DrawerClose>
//             </DrawerFooter>
//           </div>
//         </DrawerContent>
//       </Drawer>
//     </div>
//   );
// };



// export default WithDraw;



