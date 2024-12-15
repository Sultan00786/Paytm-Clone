"use client";
import { Toaster } from "@repo/ui/toast";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

export const Provider = ({
   children,
}: {
   children: React.ReactNode;
}) => {
   return (
      <RecoilRoot>
         <SessionProvider>
            {children}
            <Toaster />
         </SessionProvider>
      </RecoilRoot>
   );
};
