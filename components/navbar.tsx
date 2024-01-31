"use client";

import { Poppins } from "next/font/google";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Menu, Sparkle } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

export const NavBar = () => {
  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary">
      <div className="flex items-center">
        <Menu className="block md:hidden" />
        <Link href="/" />
        <h1
          className={cn(
            "hidden md:block text-xl md:text-3xl font-bold text-primary",
            font.className
          )}
        >
          Companion AI
        </h1>
      </div>
      <div className="flex items-center gap-x-3">
        <Button variant="premium">
          Upgrade
          <Sparkle className="h-4 w-4 fill-white text-white ml-2" />
        </Button>

        <ModeToggle />
        <UserButton />
      </div>
    </div>
  );
};

export default NavBar;
