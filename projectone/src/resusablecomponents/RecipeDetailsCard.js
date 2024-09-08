import Image from "next/image";

export default function RecipeDetailsCard({ details }) {
  return (
    <div className="p-6 lg:max-w-6xl max-w-2xl mx-auto">
      <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="w-full lg:sticky top-0 sm:flex gap-2">
          <Image
            priority
            width={100}
            height={100}
            src={details?.image}
            alt={details?.name}
            className="w-4/5 rounded object-cover"
          />
        </div>
        <div className="">
          <h2>{details?.name}</h2>
        </div>
      </div>
    </div>
  );
}
