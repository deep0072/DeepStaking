import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ButtonLoader({ props }) {
  console.log(props, "props.........................");

  return (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {props?.isConfirmingApprove ? (
        <>approving</>
      ) : props?.isConfirmingStake ? (
        <> staking please wait</>
      ) : (
        <>Please wait</>
      )}
    </Button>
  );
}
