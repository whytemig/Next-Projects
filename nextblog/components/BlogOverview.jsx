// import Card from "@/components/ui/"

export default function BlogOverview({ blogList }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
      {blogList &&
        blogList?.data.length > 0 &&
        blogList?.data.map((item) => <div key={item._id}>{item.title}</div>)}
    </div>
  );
}
