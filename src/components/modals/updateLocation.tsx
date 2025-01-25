"use client";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import axiosInstance from "@/lib/axiosInstance";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";


export default function UpdateLocation({ index }: { index: number }) {
    const LocationSchema = z.object({
        location: z.string(),

    });
    const [location, setLocation] = useState("");
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof LocationSchema>>({
        resolver: zodResolver(LocationSchema),
        defaultValues: {
            location: ""
        },
    });
    const { toast } = useToast();
    const handleSave = async (data: z.infer<typeof LocationSchema>) => {
        try {
            const response = await axiosInstance.put(`/api/user/locations/update/${index}`, {
                location: location
            });
            if (response.status==200) {

                toast({
                    description: "success",
                    title: response?.data?.message,
                    variant: "default",
                });
            }
        } catch (err) {
            toast({
                description: "Failed",
                title:"Error in update location",
                variant: "destructive",
            });
        } finally {
            setOpen(false);
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-green-500 hover:border-green-500" onClick={() => setOpen(true)}>Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Enter New Location</DialogTitle>
                    <DialogDescription>
                        Make changes to your Location here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(handleSave)} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="location" className="text-right">
                            location
                        </Label>
                        <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="col-span-3" />
                    </div>

                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}


