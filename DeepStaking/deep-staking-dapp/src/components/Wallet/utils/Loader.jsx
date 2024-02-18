import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonLoader({props}) {

  return (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {props?.approve? <>approving</>: props?.staking? <> staking please wait</>:<>Please wait</>}
    </Button>
  )
}
