import DashboardHeading from "@repo/ui/dashboardHeading";
import AddMoneyBox from "../../../components/AddMoneyBox";
import BalanceCard from "../../../components/BalanceCard";
import TransactionsListCard from "../../../components/TransactionsListCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { prisma } from "@repo/db/clint";
import Loader from "@repo/ui/loading";

const getAmount = async (userId: string) => {
   const id = Number(userId);
   const balance = await prisma.balance.findFirst({
      where: {
         userId: id,
      },
   });
   if (balance)
      return {
         amount: balance.amount,
         locked: balance.locked,
      };
   else
      return {
         amount: 0,
         locked: 0,
      };
};

async function getOnRampTransactions(userId: string) {
   const txns = await prisma.onRampTransaction.findMany({
      where: {
         userId: Number(userId),
      },
      orderBy: { startTime: "desc" },
   });
   return txns.map((t) => ({
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider,
   }));
}

export default async function Transfer() {
   const session = await getServerSession(authOptions);
   const balance = await getAmount(session?.user.id);
   const transactions = await getOnRampTransactions(
      session?.user.id
   );
   return (
      <div>
         <DashboardHeading title="Transfer" />
         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4 mt-4">
            <AddMoneyBox />
            <div className="flex flex-col gap-4">
               <BalanceCard
                  amount={balance.amount}
                  locked={balance.locked}
               />
               <TransactionsListCard
                  transactions={transactions}
               />
            </div>
         </div>
      </div>
   );
}
