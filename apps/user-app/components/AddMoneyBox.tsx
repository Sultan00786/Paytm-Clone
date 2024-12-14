"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import Select from "@repo/ui/selectOption";
import { TextInput } from "@repo/ui/textInput";
import { useRouter } from "next/navigation";
import { useState } from "react";
import creatOnRampTransaction from "../app/lib/actions/creatOnRampTransaction";

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
   const [amount, setAmount] = useState(0);
   const [provider, setProvider] = useState(
      SUPPORTED_BANK[0]?.name || ""
   );

   const router = useRouter();

   return (
      <Card title="Add Money">
         <div>
            <TextInput
               label="Amount"
               placeholder="Enter amount"
               onChange={(e) => {
                  setAmount(Number(e));
               }}
            />
            <div>
               <h3>Bank</h3>

               {/* critiacal component !!!! */}
               <Select
                  setRedirect={setRedirect}
                  options={SUPPORTED_BANK}
                  funcSelect={(e) => {
                     setProvider(e || "");
                     setRedirect(
                        SUPPORTED_BANK.find(
                           (bank) => bank.name === e
                        )?.redirect || ""
                     );
                  }}
               />

               <div className="flex justify-center pt-4">
                  <Button
                     onclick={async () => {
                        // window.location.href = redirectUrl || "";
                        const respones =
                        await creatOnRampTransaction(
                           amount,
                           provider
                        );
                        router.push(redirectUrl || "");
                        console.log(respones);
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
