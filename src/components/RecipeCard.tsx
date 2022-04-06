import React from "react";
import { Panel } from "rsuite";

interface RecipeCardProps {
  name: string;
  description: string;
  cookTime: number;
  rating?: number;
}

const RecipeCard = (props: RecipeCardProps) => {
  return <Panel header={props.name}>RecipeCard</Panel>;
};

export default RecipeCard;
