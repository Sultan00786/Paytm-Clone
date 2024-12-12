import { PrismaClient } from "@repo/db/clint";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";

const prisma = new PrismaClient();

export default async function Home() {
   const session = await getServerSession(authOptions);

   console.log(session);

   if (session.user) {
      redirect("/dashboard");
   } else redirect("/api/auth/signin");
}
