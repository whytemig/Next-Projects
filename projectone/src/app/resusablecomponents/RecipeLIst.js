import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default async function RecipeList({ recipes }) {
  return (
    <div>
      <div className="p-4 mx-auto lg:max-w-6xl sm:max-w-full">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">Recipes</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 m-8">
        {recipes && recipes.length > 0
          ? recipes.map((recipe) => (
              <Link href={`/recipes/${recipe.id}`}>
                <Card key={recipe.name}>
                  <CardContent className="bg-white rounded-md overflow-hidden shadow-md cursor-pointer hover:scale-[1.1] transition-all">
                    <div className="w-full aspect-w-16 aspect-h-8 lg:h-80">
                      <Image
                        className="w-full h-full object-cover object-top"
                        src={recipe.image}
                        width={100}
                        height={100}
                        alt={recipe.name}
                      />
                    </div>
                    <div className="p-6 ">
                      <h3 className="text-lg font-bold text-gray-700">
                        {recipe.name}
                      </h3>
                    </div>
                    <div className="mt-4 flex items-center flex-wrap gap-2">
                      <p className="text-lg text-gray-600">
                        Ratings: {recipe.rating}
                      </p>
                      <div className="ml-auto">
                        <p className="text-lg text-gray-700 font-bold">
                          {recipe.cuisine}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          : null}
      </div>
    </div>
  );
}
