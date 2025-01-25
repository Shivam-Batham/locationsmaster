"use client";
import React, { useEffect, useState } from 'react';
// import { cn } from "@/lib/utils";
import { Menu, MenuItem } from "@/components/ui/navbar-menu";
import { Logout } from './logout';
import { useRouter } from 'next/navigation';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { AddLocation } from '@/components/modals/addLocation';
import UpdateProfile from '@/components/modals/updateProfile';


interface LayoutProps {
  children: React.ReactNode;
  // className?: string | any; 
}

export default function Layout({ children, }: LayoutProps) {
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();
  const [client,setClient] = useState<boolean>(false);
  useEffect(()=>{
    setClient(true)
  },[])
  return (
   client && <div>
      <div
        className={"fixed top-5 w-[95%]   rounded-full  inset-x-0 max-w-2xl mx-auto z-50"}
      >
        <Menu setActive={setActive}>
          <HoverBorderGradient className="sm:text-normal text-xs"  onClick={() => router.replace("/")}>
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
    </div>
  );
}


