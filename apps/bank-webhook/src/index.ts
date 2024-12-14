import { prisma } from "@repo/db/clint";
import express from "express";
const app = express();

type PaymentInfo = {
   token: string;
   userId: string;
   amount: number;
};

app.use(express.json());

app.get("/", (req, res) => {
   res.send("Hello World!");
});

app.post("/bankwebhook", async (req, res) => {
   const paymentInfo: PaymentInfo = {
      token: req.body.token,
      userId: req.body.user_identifier,
      amount: req.body.amount,
   };

   try {
      const transactionResult = await prisma.$transaction([
         // update balance amt or increate amt
         prisma.balance.update({
            where: {
               userId: Number(paymentInfo.userId),
            },
            data: {
               amount: {
                  increment: Number(paymentInfo.amount),
               },
            },
         }),

         //  and also update transciption status
         prisma.onRampTransaction.update({
            where: {
               token: paymentInfo.token,
            },
            data: {
               status: "Success",
            },
         }),
      ]);

      res.json({
         message: "Payment Captured !!",
      });
   } catch (error) {
      console.log(error);
      res.status(411).json({
         message: "Error while processing webhook",
      });
   }
});

app.listen(3003, () => {
   console.log("Server is running on port: 3003");
});
