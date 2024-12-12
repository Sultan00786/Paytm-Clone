"use client";

import { Button } from "@repo/ui/button";
import { PrismaClient } from "@repo/db/clint";
import BalanceShow from "./balanceShow";
import { Appbar } from "@repo/ui/appBar";
import { signIn, signOut, useSession } from "next-auth/react";
import { authOptions } from "../lib/auth";

const prisma = new PrismaClient();

// async function createUser() {
//    prisma.user
//       .create({
//          data: {
//             email: "terwefrf@gmail.com",
//             password: "dsffafaEff",
//          },
//       })
//       .then((e) => "Done to create user")
//       .catch((e) => {
//          console.log(e);
//          return "Error aa gaya";
//       });
// }

export default function Home() {
   const session = useSession();

   return (
      <div className="">
         <Appbar
            user={session.data?.user}
            onSignin={() => signIn()}
            onSignout={() => signOut()}
         />
         <BalanceShow />
         <Button onclick={() => {}}>Click heree</Button>
      </div>
   );
}
