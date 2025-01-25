"use client";
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
// import { HoveredLink } from "@/components/ui/navbar-menu";
import { Menu, MenuItem } from "@/components/ui/navbar-menu";
import { Logout } from './logout';
import { useRouter } from 'next/navigation';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { AddLocation } from '@/components/modals/addLocation';
import UpdateProfile from '@/components/modals/updateProfile';


export default function Navbar({ className, children }: { className?: string; children: React.ReactNode }) {
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();
  return (
    <>
      <div
        className={cn("fixed top-5   rounded-md w-[80%]  inset-x-0 max-w-2xl mx-auto z-50", className)}
      >
        <Menu setActive={setActive}>
          <HoverBorderGradient onClick={() => router.replace("/")}>
            Home
          </HoverBorderGradient>
          <UpdateProfile />
          <AddLocation />
          <Logout />
        </Menu>
      </div>
      <div className=' bg-[#0E0E10]'
      >
        {children}
      </div>
    </>
  );
}


