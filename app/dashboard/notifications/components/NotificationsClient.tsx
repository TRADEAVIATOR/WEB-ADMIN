"use client";

import { useState } from "react";
import TabsList from "./TabsList";
import BirthdayTab from "./BirthdayTab";
import GeneralTab from "./GeneralTab";
import HolidayTab from "./HolidayTab";

export default function NotificationsClient() {
  const [active, setActive] = useState<"birthday" | "general" | "holiday">(
    "general"
  );

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="w-full lg:w-1/3">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <TabsList active={active} setActive={setActive} />
        </div>
      </div>
      <div className="w-full lg:flex-1">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          {active === "birthday" && <BirthdayTab />}
          {active === "general" && <GeneralTab />}
          {active === "holiday" && <HolidayTab />}
        </div>
      </div>
    </div>
  );
}
