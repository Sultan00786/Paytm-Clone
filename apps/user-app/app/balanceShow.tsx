"use client";

import { useBalance } from "@repo/store/useBalance";

function BalanceShow() {
   const balance = useBalance();
   return <div>Here Balance is {balance}</div>;
}

export default BalanceShow;
