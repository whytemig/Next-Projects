import BlogsShowing from "@/components/BlogsShowing";

export const metadata = {
  title: "Blogs",
};

async function fetchBlogs() {
  try {
    const resp = await fetch("http://localhost:3000/api/getblog/", {
      method: "GET",
      cache: "no-store",
    });

    if (!resp.ok) {
      throw new Error("failed to fetched");
    }
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function Blogs() {
  const blogList = await fetchBlogs();

  return (
    <div className="">
      <BlogsShowing blogList={blogList} />
    </div>
  );
}
