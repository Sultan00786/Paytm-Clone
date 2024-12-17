"use server";

import { prisma } from "@repo/db/clint";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export default async function (phone: string, amount: number) {
   const fromUser = await getServerSession(authOptions);
   const fromUserId = fromUser?.user?.id;
   if (!fromUserId) {
      return {
         success: false,
         error: "User not found",
      };
   }

   const toUser = await prisma.user.findFirst({
      where: {
         number: phone,
      },
      include: {
         Balance: true,
      },
   });
   const toUserId = toUser?.id;
   if (!toUserId) {
      return {
         success: false,
         error: "User not found",
      };
   }

   const fromBalance = await prisma.balance.findUnique({
      where: {
         userId: Number(fromUserId),
      },
   });
   if (!fromBalance || fromBalance.amount < amount) {
      return {
         success: false,
         error: "Insufficient balance",
      };
   }

   await prisma.$transaction(async (txs) => {
      await txs.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(fromUserId)} FOR UPDATE`;

      await txs.balance.update({
         where: {
            userId: Number(fromUserId),
         },
         data: {
            amount: {
               decrement: amount,
            },
         },
      });

      await txs.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(toUserId)} FOR UPDATE`;

      await txs.balance.update({
         where: {
            userId: toUserId,
         },
         data: {
            amount: {
               increment: amount,
            },
         },
      });

      await txs.p2pTransaction.create({
         data: {
            amount: amount,
            timeStamp: new Date(),
            fromUserId: Number(fromUserId),
            toUserId: toUserId,
         },
      });
   });

   return {
      success: true,
      message: "Transaction successful",
   };
}
