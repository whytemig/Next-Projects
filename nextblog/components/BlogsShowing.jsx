"use client";

import { useState } from "react";
import { Button } from "./ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DialogModal from "./DialogModal";

export default function BlogsShowing() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-700 p-6 gap-6">
      <div className="">
        <Button onClick={() => setOpen(true)} className="w-full">
          New Blog
        </Button>
      </div>

      <DialogModal open={open} setOpen={setOpen} />

      <div>
        <h2 className="font-bold text-3xl text-slate-300">List of Blogs</h2>
      </div>
    </div>
  );
}
