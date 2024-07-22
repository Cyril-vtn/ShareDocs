import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn("header", className)}>
      <Link href="/" className="md:flex-1">
        <h1>
          <span className="text-2xl font-bold">Share</span>
          <span className="text-2xl font-light">Docs</span>
        </h1>
      </Link>
      {children}
    </div>
  );
};

export default Header;
