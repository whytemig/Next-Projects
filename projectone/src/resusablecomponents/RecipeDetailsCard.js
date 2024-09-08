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
          <h2 className="text-3xl font-extrabold text-gray-950">
            {details?.name}
          </h2>
          <div className=" gap-4 mt-5">
            <p className="text-xl text-gray-700">{details?.mealType[0]}</p>
          </div>
          <div className="mt-5">
            <p className="text-xl text-gray-800">{details?.cuisine}</p>
          </div>
          <div className="mt-5">
            <h3 className="text-lg font-bold text-gray-700 ">Ingredients</h3>
            <ul className="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-700">
              {details?.ingredients.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
