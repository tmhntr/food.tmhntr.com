import Link from "next/link";
import React, { FC } from "react";
import { Panel, Rate, Stack } from "rsuite";
import { Recipe } from "../lib/models";

const RecipeCard: FC<{ recipe: Recipe; style?: any }> = ({ recipe, style }) => {
  return (
    <Link href={`/recipe/${recipe._id}`}>
      <Panel bordered defaultExpanded={false} style={style} shaded>
        <img
          src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F02%2F17%2F21014-Good-old-Fashioned-Pancakes-mfs_002.jpg"
          height="240"
        />
        <Panel header={recipe.name}>
          {/* Rating */}
          <Stack>
            <Rate
              readOnly
              defaultValue={
                recipe.ratings
                  ? recipe.ratings.reduce(
                      (total, rating) => total + rating.value,
                      0
                    ) / recipe.ratings.length
                  : 0
              }
              allowHalf
            />
            <p>
              <small>{recipe.ratings.length}</small>
            </p>
          </Stack>
          {/* Description */}
          {/* Author */}
          <p>
            <small>{recipe.description}</small>
          </p>
        </Panel>
      </Panel>
    </Link>
  );
};

export default RecipeCard;
