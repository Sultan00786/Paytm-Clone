import { Dispatch, SetStateAction } from "react";

interface PropType {
   setRedirect: Dispatch<SetStateAction<string | undefined>>;
   options: {
      name: string;
      redirect: string;
   }[];
}

function Select({ setRedirect, options }: PropType) {
   return (
      <div>
         <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) => {
               setRedirect(
                  options.find(
                     (bank) => bank.name === e.target.value
                  )?.redirect || ""
               );
            }}
         >
            {options.map((bank, index) => {
               return (
                  <option key={index} value={bank.name}>
                     {bank.name}
                  </option>
               );
            })}
         </select>
      </div>
   );
}

export default Select;
