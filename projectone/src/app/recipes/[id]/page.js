import RecipeDetailsCard from "@/resusablecomponents/RecipeDetailsCard";
import React from "react";

async function fetchRecipe(id) {
  try {
    const resp = await fetch(`https://dummyjson.com/recipes/${id}`);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function RecipeDetails({ params }) {
  const details = await fetchRecipe(params?.id);

  return (
    <div>
      <RecipeDetailsCard details={details} />
    </div>
  );
}
