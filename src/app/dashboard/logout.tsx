"use client";
import React from "react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import axiosInstance from "@/lib/axiosInstance";
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation";

export function Logout() {
    
    const { toast } = useToast();
    const router = useRouter();
    const handleLogout = async () => {
        try {
            const response = await axiosInstance.get(`/api/user/logout`)
            if (response.status ==200) {
                toast({
                    description: "success",
                    title: response?.data?.message,
                    variant: "default",
                });
                router.replace("/")
            }
        } catch (err) {
            toast({
                title: "Logout Unsuccessfull.",
                description: "failed",
                variant: "destructive",
            });
        }
    }
    return (
        <HoverBorderGradient onClick={handleLogout}>
            Logout
        </HoverBorderGradient>
    );
}