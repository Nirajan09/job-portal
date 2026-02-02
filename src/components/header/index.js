"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { AlignJustify } from "lucide-react";
import Link from "next/link";

// Dynamically import client-only UserButton
const ClientUserButton = dynamic(() => import("../ClientUserButton"), { ssr: false });

const Header = ({ User, profileInfo }) => {
  const menuItem = [
    { label: "Home", path: "/", show: true },
    { label: "Login", path: "/sign-in", show: !User },
    { label: "Register", path: "/sign-up", show: !User },
    { label: "Jobs", path: "/jobs", show: !!User },
    { label: "Activity", path: "/activity", show: profileInfo?.role === "candidate" },
    { label: "Membership", path: "/membership", show: !!User },
    { label: "Account", path: "/account", show: !!User },
  ];

  return (
    <header className="flex justify-between h-[12vh] w-full items-center shrink-0 p-6 lg:p-8 border-b-2">
      <Link href="/" className="lg:text-size-4xl md:text-size-3xl text-size-2xl font-bold text-3xl mr-6 -text--clr-slate800">
        JobVista.
      </Link>

      <nav className="md:flex md:gap-[2em] md:items-center hidden">
        {menuItem.map(
          (item) =>
            item.show && (
              <Link
                key={item.label}
                href={item.path}
                className="md:text-size-base tracking-wide transition-color delay-[.001s] -text--clr-slate800 font-semibold lg:text-size-xl relative after:block after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-black after:scale-x-0 after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100"
                onClick={() => {
                  if (typeof window !== "undefined") sessionStorage.removeItem("filterParams");
                }}
              >
                {item.label}
              </Link>
            )
        )}
        {User && <ClientUserButton />}
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <Button className="md:hidden">
            <AlignJustify className="h-6 w-6" />
            <span className="sr-only">Toggle Navigation Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <Link href="#" className="mr-6">
            <h3 className="lg:text-size-[100px] md:text-size-3xl text-size-2xl -text--clr-slate800">JobVista.</h3>
          </Link>
          <div className="grid gap-2 py-6">
            {menuItem.map(
              (item) =>
                item.show && (
                  <Link key={item.label} href={item.path} className="flex w-full items-center py-2 text-lg font-semibold">
                    {item.label}
                  </Link>
                )
            )}
            {User && <ClientUserButton />}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
