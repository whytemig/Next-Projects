"use client";
import UserButton from "@/app/_components/UserButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        <Button variant={pathname === "/server" ? "default" : "outline"}>
          <Link href="/server">Server</Link>
        </Button>
        <Button variant={pathname === "/client" ? "default" : "outline"}>
          <Link href="/settings">Client</Link>
        </Button>
        <Button variant={pathname === "/admin" ? "default" : "outline"}>
          <Link href="/settings">Admin</Link>
        </Button>
        <Button variant={pathname === "/settings" ? "default" : "outline"}>
          <Link href="/settings">Settings</Link>
        </Button>
      </div>
      <UserButton />
    </div>
  );
};

export default Navbar;
