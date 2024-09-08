import RecipeList from "../../resusablecomponents/RecipeLIst";

async function fetchRecipes() {
  try {
    const resp = await fetch("https://dummyjson.com/recipes");
    const data = await resp.json();
    return data?.recipes;
  } catch (error) {
    console.log(error);
  }
}

export default async function Recipes() {
  const recipes = await fetchRecipes();
  return (
    <div>
      <RecipeList recipes={recipes} />
    </div>
  );
}
