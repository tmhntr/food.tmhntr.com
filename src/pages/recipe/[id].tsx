import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { FlexboxGrid, Panel, Rate, Stack } from "rsuite";
import { selectRecipes } from "../../features/user/recipeSlice";
import { Recipe as RecipeType } from "../../lib/models";

const Recipe = () => {
  const router = useRouter();
  const { id } = router.query;

  let recipes: RecipeType[] = useSelector(selectRecipes);

  let recipe = recipes.find((value) => value._id.toString() == id.toString());

  if (!recipe) {
    return <p>Loading</p>;
  }

  return (
    <Panel bordered defaultExpanded={false} shaded>
      <FlexboxGrid justify="space-around">
        <FlexboxGrid.Item
          colspan={18}
          as={"img"}
          src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F02%2F17%2F21014-Good-old-Fashioned-Pancakes-mfs_002.jpg"
          style={{ width: 360 }}
          //   width={240}
        ></FlexboxGrid.Item>
      </FlexboxGrid>
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
  );
};

export default Recipe;
