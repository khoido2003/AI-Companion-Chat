"use client";

import { Poppins } from "next/font/google";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import MobileSideBar from "./mobile-sidebar";
import { Sparkle } from "lucide-react";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

export const NavBar = () => {
  return (
    <div className="fixed z-50 flex h-16 w-full items-center justify-between border-b border-primary/10 bg-secondary px-4 py-2">
      <div className="flex items-center">
        <MobileSideBar />
        <Link href="/">
          <h1
            className={cn(
              "hidden text-xl font-bold text-primary md:block md:text-3xl",
              font.className,
            )}
          >
            Companion AI
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        <Button variant="premium">
          Upgrade
          <Sparkle className="ml-2 h-4 w-4 fill-white text-white" />
        </Button>

        <ModeToggle />
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </div>
  );
};

export default NavBar;
