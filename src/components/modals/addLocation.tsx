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
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { useToast } from "@/hooks/use-toast";


export  function AddLocation() {
    const AddLocationSchema = z.object({
      location: z.string(),
    });
    const [ location,setLocation] = useState("");
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof AddLocationSchema>>({
        resolver: zodResolver(AddLocationSchema),
        defaultValues: {
            location: "",
        },
    });
    const {toast} = useToast();

    const handleSave = async (data: z.infer<typeof AddLocationSchema>)=>{
            try{
                const response = await axiosInstance.post(`/api/user/locations/add`, {
                  location:  location,
                });
                if(response.status == 201){
                  toast({
                    title: response.data.message,
                    description:"success",
                    variant: "default",
                  });
                }
            }catch(err){
              toast({
                title: "Failed to add location",
                description: "Something went wrong",
                variant: "destructive",
              });
            }finally{
              setOpen(false)
            }
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <HoverBorderGradient>
        <p onClick={() => setOpen(true)}>Add  location</p>
        </HoverBorderGradient>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Visited location</DialogTitle>
          <DialogDescription>
            Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSave)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
            Location
            </Label>
            <Input id="username" value={location} onChange={(e)=>setLocation(e.target.value)} className="col-span-3" />
          </div>
          <DialogFooter>
            <Button type="submit">Save location</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


