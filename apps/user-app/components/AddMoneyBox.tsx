"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import Select from "@repo/ui/selectOption";
import { TextInput } from "@repo/ui/textInput";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SUPPORTED_BANK = [
   {
      name: "Axis Bank",
      redirect: "https://www.axisbank.com/",
   },
   {
      name: "HDFC Bank",
      redirect: "https://netbanking.hdfcbank.com/netbanking/",
   },
];

export default function AddMoneyBox() {
   const [redirectUrl, setRedirect] = useState(
      SUPPORTED_BANK[0]?.redirect
   );

   const router = useRouter();

   return (
      <Card title="Add Money">
         <div>
            <TextInput
               label="Amount"
               placeholder="Enter amount"
               onChange={() => {}}
            />
            <div>
               <h3>Bank</h3>
               <Select
                  setRedirect={setRedirect}
                  options={SUPPORTED_BANK}
               />
               <div className="flex justify-center pt-4">
                  <Button
                     onclick={() => {
                        // window.location.href = redirectUrl || "";
                        router.push(redirectUrl || "");
                     }}
                  >
                     Add Money
                  </Button>
               </div>
            </div>
         </div>
      </Card>
   );
}
