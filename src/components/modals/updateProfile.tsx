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


export default function UpdateProfile() {
    const updateProfileSchema = z.object({
        name: z.string(),
        address: z.string(),
        phone: z.string(),
    });
    const [name,setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone,setPhone] = useState("");
    const [open, setOpen] = useState(false);
    const userId = localStorage.getItem("userId");

    const form = useForm<z.infer<typeof updateProfileSchema>>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            name: "",
            address: "",
            phone: ""
        },
    });
    const {toast} = useToast()

    const handleSave= async (data: z.infer<typeof updateProfileSchema>)=>{
            try{
                
               const response =  await axiosInstance.put(`/api/user/updateuser/${userId}`, {
                    name: name,
                    address: address,
                    phone: phone
                });
                if(response.status == 200){
                   toast({
                    description: "success",
                    title: response?.data?.message,
                    variant: "default",
                });
                }

            }catch(err){
              
            }finally{
              setOpen(false)
            }
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <HoverBorderGradient>
        <p  onClick={() => setOpen(true)}>Edit Profile</p>
        </HoverBorderGradient>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSave)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value={name} onChange={(e)=>setName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
            Phone
            </Label>
            <Input id="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
            Address
            </Label>
            <Input id="address" value={address} onChange={(e)=>setAddress(e.target.value)} className="col-span-3" />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


