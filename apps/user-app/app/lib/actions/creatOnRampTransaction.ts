"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { prisma } from "@repo/db/clint";

export default async function creatOnRampTransaction(
   amount: number,
   provider: string
) {
   const session = await getServerSession(authOptions);
   const userId = session?.user?.id;
   if (!userId) {
      return {
         message: "Unauthorized",
      };
   }

   const token = Math.random();

   try {
      await prisma.onRampTransaction.create({
         data: {
            startTime: new Date(),
            status: "Processing",
            provider: provider,
            amount: amount * 100,
            token: token.toString(),
            userId: Number(userId),
         },
      });
   } catch (error) {
      console.log(error);
      return {
         message: "Internal Server Error",
      };
   }

   return {
      message: "OnRamp Transacion successfully created !",
   };
}
