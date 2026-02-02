"use client";

import { UserButton } from "@clerk/nextjs";

export default function ClientUserButton() {
  return <UserButton afterSwitchSessionUrl="/" />;
}
