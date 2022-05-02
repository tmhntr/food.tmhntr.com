import { Recipe } from "../../lib/models";

export const getPublicRecipes = async (): Promise<{ data: Recipe[] }> => {
  const response = await fetch(`/api/recipes/`, {
    method: "GET",
  });
  const result = await response.json();
  // console.log(result);

  return result;
};

export const postRecipe = async (recipe: Recipe): Promise<{ data: Recipe }> => {
  const response = await fetch(`/api/recipes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
  const result = await response.json();
  // console.log(result);

  return result;
};
