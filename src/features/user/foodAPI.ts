import { getSession } from "next-auth/react";
import type { Food } from "../../lib/models";

export const getFood = async (): Promise<{ data: Food[] }> => {
  const response = await fetch(`/api/food/`, {
    method: "GET",
  });
  const result = await response.json();
  // console.log(result);

  return result;
};

export const updateFood = async (
  foodlist: Food[]
): Promise<{ data: Food[] }> => {
  const response = await fetch(`/api/food/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inventory: foodlist }),
  });
  const result = await response.json();
  console.log(result);

  return result;
};
