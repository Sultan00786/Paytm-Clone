"use client";

import DashboardHeading from "@repo/ui/dashboardHeading";
import { useState } from "react";
import P2pSendBox from "../../../components/P2pSendBox";

function page() {
   return (
      <div >
         <DashboardHeading title="Person to Person Transfer" />
         <P2pSendBox />
      </div>
   );
}

export default page;
