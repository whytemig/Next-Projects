"use client";

import { useState } from "react";
import DialogModal from "./DialogModal";

export default function BlogsShowing() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogsAdded, setBlogsAdded] = useState({
    title: "",
    description: "",
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-700 p-6 gap-6">
      <DialogModal
        open={open}
        setOpen={setOpen}
        loading={loading}
        setLoading={setLoading}
        setBlogsAdded={setBlogsAdded}
        blogsAdded={blogsAdded}
      />

      <div>
        <h2 className="font-bold text-3xl text-slate-300">List of Blogs</h2>
      </div>
    </div>
  );
}
