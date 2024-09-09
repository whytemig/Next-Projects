import Link from "next/link";

export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center items-center bg-slate-700 p-6">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold text-slate-300">Blogs Collection</h2>
        <Link
          className="bg-slate-800 bg text-slate-300 font-semibold py-2 px-6 rounded mt-4"
          href="/blogs"
        >
          Explore Blogs
        </Link>
      </div>
    </main>
  );
}
