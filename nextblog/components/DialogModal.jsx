"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DialogModal({
  open,
  setOpen,
  loading,
  setLoading,
  blogsAdded,
  setBlogsAdded,
}) {
  async function postBlog() {
    let options = {
      method: "POST",
      body: JSON.stringify(blogsAdded),
    };

    try {
      setLoading(true);
      const resp = await fetch("/api/addblog", options);
      if (!resp.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await resp.json();

      setBlogsAdded({
        title: data?.data.title,
        description: data?.data.description,
      });
      setBlogsAdded({ title: "", description: "" });
      setOpen(false);
    } catch (error) {
      setBlogsAdded({ title: "", description: "" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="">
        <Button onClick={() => setOpen(true)} className="w-full">
          New Blog
        </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Blog</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                className="col-span-3"
                name="title"
                value={blogsAdded.title}
                onChange={(e) =>
                  setBlogsAdded({ ...blogsAdded, title: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                className="col-span-3"
                name="description"
                value={blogsAdded.description}
                onChange={(e) =>
                  setBlogsAdded({ ...blogsAdded, description: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={postBlog}>
              {loading ? "Saving" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
