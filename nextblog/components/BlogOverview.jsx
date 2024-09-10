import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BlogOverview({ blogList }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
      {blogList &&
        blogList?.data.length > 0 &&
        blogList?.data.map((item) => (
          <Card key={item._id} className="p-5 mb-5">
            <CardContent>{item.title}</CardContent>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        ))}
    </div>
  );
}
