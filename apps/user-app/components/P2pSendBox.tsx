"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textInput";
import { toast } from "@repo/ui/toast";
import { useState } from "react";
import p2pTranfer from "../app/lib/actions/p2pTranfer";

async function sendMoney(phone: string, amount: number) {
   if (!phone || !amount) {
      toast.error("Please fill all the fields");
      return;
   }

   if (phone.length != 10) {
      toast.error("Please enter a valid phone number");
      return;
   }

   const response = await p2pTranfer(phone, amount * 100);

   console.log(response);

   if (response?.success === true) {
      toast.success("Transaction successful !");
   } else toast.error("Transaction fail !");
}

function P2pSendBox() {
   const [phone, setPhone] = useState("");
   const [amount, setAmount] = useState(0);
   return (
      <div className=" mt-24 flex flex-col items-center">
         <div className="mt- w-[75%] md:w-1/3">
            <Card title="Send Cash">
               <div>
                  <TextInput
                     label="Phone No."
                     placeholder="Enter Phone No."
                     onChange={(e) => {
                        setPhone(e);
                     }}
                  />
                  <TextInput
                     label="Amount"
                     placeholder="000"
                     onChange={(e) => {
                        setAmount(Number(e));
                     }}
                  />
               </div>
               <div className="flex justify-center pt-4">
                  <Button
                     onclick={() => {
                        sendMoney(phone, amount);
                     }}
                  >
                     Send
                  </Button>
               </div>
            </Card>
         </div>
      </div>
   );
}

export default P2pSendBox;
