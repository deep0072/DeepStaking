import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Approve } from "./Approve";
import { StakeToken } from "./StakeToken";

const CardWrapper = () => {
  return (
    <Card style={{ margin: "auto", marginTop: "2px" }} className="w-[350px]">
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

export default CardWrapper;
