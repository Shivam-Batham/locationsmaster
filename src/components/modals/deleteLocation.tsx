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
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/lib/axiosInstance";
import { useState } from "react";

export default function DeleteLocation({ index }: { index: number }) {
    const [open, setOpen] = useState(false);
    const {toast} = useToast();
    const handleDelete = async () => {
        try {
          const response =   await axiosInstance.delete(`/api/user/locations/delete/${index}`);
            if(response.status == 200){
                toast({
                    description: "success",
                    title: response?.data?.message,
                    variant: "default",
                });
            }
        } catch (err) {
            toast({
                description: "failed",
                title: "Error in deleting location",
                variant: "default",
            });
        }finally{
            setOpen(false)
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-red-500 hover:border-red-500" onClick={() => setOpen(true)}>Delete</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Are you sure ?</DialogTitle>
                    <DialogDescription>
                        If you are sure than click on delete button
                    </DialogDescription>
                </DialogHeader>

                <Button className="" onClick={handleDelete}>Delete</Button>
            </DialogContent>
        </Dialog>
    )
}


