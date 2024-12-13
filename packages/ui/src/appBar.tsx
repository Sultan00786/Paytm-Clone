import { Session } from "node:inspector/promises";
import { Button } from "./button";

interface AppbarProps {
   isAuth: Boolean;
   // TODO: can u figure out what the type should be here?
   onSignin: () => void;
   onSignout: () => void;
}
export const Appbar = ({
   isAuth,
   onSignin,
   onSignout,
}: AppbarProps) => {
   return (
      <div className="flex justify-between border-b px-4">
         <div className="text-lg flex flex-col justify-center">
            PayTM
         </div>
         <div className="flex flex-col justify-center pt-2">
            <Button onclick={isAuth ? onSignout : onSignin}>
               {isAuth ? "Logout" : "Login"}
            </Button>
         </div>
      </div>
   );
};
