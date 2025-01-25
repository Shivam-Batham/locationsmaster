"use client";

import { Card, CardTitle, CardContent } from "@/components/ui/card";
import axiosInstance from "@/lib/axiosInstance";
import { useCallback, useEffect, useState } from "react";
import LocationTable from "@/components/modals/locationTable";
import { TextRevealCard } from "@/components/ui/text-reveal-card";
import { useToast } from "@/hooks/use-toast";
interface User {
    username: string;
    email: string;
    locations: Array<string>;
    address: string;
    phone: string;
}

function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [userId, setUserID] = useState<string | null>(null);
    const { toast } = useToast();
    async function getData(id: string) {
        try {
            const response = await axiosInstance.get(`/api/user/getuser/${id}`);
            if (response.status === 200) {
                setUser(response.data.data);
               
            }
        } catch (err) {
            console.error("Error fetching user data:", err);
            toast({
                description: "failed.",
                title: "Error fetching user data",
                variant: "destructive",
            });
        }
    }

    useEffect(() => {
        const id = localStorage.getItem("userId");
        let clock: ReturnType<typeof setInterval> | null = null;
        if (id) {
            setUserID(id);
            getData(id);

            clock = setInterval(() => {
                getData(id);
            }, 3000); // 3 sec
        }

        return () => {
            if (clock) clearInterval(clock);
        };
    }, []);

    return (
        <div className="text-left  pt-32 pb-4 ">

            {user ? (
                <>
                <div className="flex   items-center  justify-center  rounded-2xl w-full">

                    <TextRevealCard
                        className=" w-[80%]"
                        text={`${user?.address}`}
                        revealText={`${user?.address}`}
                    >

                        <TextRevealCard
                            className=" w-[100%] border-none text-4xl h-[105px] m-0 p-0"
                            text={` ${user?.username},`}
                            revealText={`${user?.username}`}
                        />
                        <TextRevealCard
                            className=" w-[100%] border-none text-4xl h-[105px] m-0 p-0"
                            text={` ${user?.phone},`}
                            revealText={`${user?.phone}`}
                        />
                        <TextRevealCard
                            className=" w-[100%] border-none h-[105px] m-0 p-0"
                            text={` ${user?.email},`}
                            revealText={`${user?.email}`}
                        />
                    </TextRevealCard>
                </div>
                <Card className="p-2  w-[80%] m-auto mt-2">
                <CardTitle className="text-center m-2" >Location Master Table</CardTitle>
                <CardContent>
                    <LocationTable locations={user?.locations ?? []} />
                </CardContent>

            </Card>
            </>
                
            ) : (

                <div className="loader"></div>
            )}
            

        </div>
    );
}

export default Dashboard;
