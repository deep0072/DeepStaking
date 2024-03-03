import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Approve } from "./Approve";

const ApproveStakeWrapper = () => {
  return (
    <Card class=" border-2 border-green-400 rounded-lg mx-auto w-[350px] hover:shadow-[0_1px_3px_#00FF00,0_1px_1px_#00FF00,1px_0_1px_#00FF00] p-4">
      <CardHeader>
        <CardTitle>DeepStake</CardTitle>
        <CardDescription>Stake token</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <Approve />
        </div>
      </CardContent>
    </Card>
  );
};

export default ApproveStakeWrapper;
