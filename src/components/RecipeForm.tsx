import React, { FC } from "react";
import {
  Button,
  ButtonToolbar,
  Form,
  Input,
  IconButton,
  Modal,
  Panel,
  List,
  FlexboxGrid,
  InputNumber,
  InputPicker,
  Whisper,
  Tooltip,
  Stack,
} from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";

import { Food, foodUnitList, Recipe } from "../lib/models";
import { useDispatch } from "react-redux";
import { postRecipeAsync } from "../features/user/recipeSlice";
import FoodList from "./FoodList";

const DirectionList: FC<{
  directionlist: string[];
  updateDirectionList: (directionlist: string[]) => void;
}> = ({ directionlist, updateDirectionList }) => {
  //   const { foodlist } = props;
  let initialState = "";
  const [directionToAdd, setDirectionToAdd] = React.useState(initialState);

  const handleAddDirection = () => {
    updateDirectionList([...directionlist, directionToAdd]);
    setDirectionToAdd(initialState);
  };

  const handleEditDirection = (index: number): void => {
    setDirectionToAdd(directionlist[index]);

    updateDirectionList(directionlist.filter((value, i) => i !== index));
  };
  const handleDeleteDirection = (index: number): void => {
    updateDirectionList(directionlist.filter((value, i) => i !== index));
  };
  return (
    <>
      <Panel header="Directions" bordered bodyFill>
        <List hover>
          {directionlist.map((item, index) => (
            <List.Item key={item["name"] + index} index={index + 1}>
              <FlexboxGrid>
                {/*name*/}
                <FlexboxGrid.Item colspan={8}>
                  <p style={{ marginLeft: 10 }}>{item}</p>
                </FlexboxGrid.Item>

                <FlexboxGrid.Item
                  colspan={6}
                  style={{ justifySelf: "flex-end" }}
                >
                  <a onClick={() => handleEditDirection(index)}>Edit</a>
                  <span style={{ padding: 5 }}>|</span>
                  <a onClick={() => handleDeleteDirection(index)}>Delete</a>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </List.Item>
          ))}
        </List>
      </Panel>
      <Stack spacing={6} alignItems={"flex-end"}>
        <div>
          <label>Name</label>
          <Input
            as="textarea"
            rows={3}
            placeholder="Direction"
            value={directionToAdd}
            onChange={(value) => {
              setDirectionToAdd(value);
            }}
          />
        </div>
        <Button onClick={handleAddDirection}>Add</Button>
      </Stack>
    </>
  );
};

const RecipeForm: FC<{ style?: any }> = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const dispatch = useDispatch();

  let initialState: Recipe = {
    name: "",
    description: "",
    servings: null,
    cookTime: null,
    ingredients: [],
    directions: [],
  };
  const [recipe, setRecipe] = React.useState(initialState);

  const handleCancel = () => {
    setRecipe(initialState);
    setOpen(false);
  };

  const handleSubmit = () => {
    dispatch(postRecipeAsync(recipe));
    handleCancel();
  };

  return (
    <>
      <IconButton
        icon={<PlusIcon />}
        color="blue"
        appearance="primary"
        circle
        onClick={handleOpen}
        {...props}
      />
      <Modal
        backdrop={"static"}
        keyboard={false}
        open={open}
        onClose={handleCancel}
      >
        <Modal.Header>
          <Modal.Title>Recipe Form</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <label>Recipe name</label>
          <Whisper trigger="focus" speaker={<Tooltip>Required</Tooltip>}>
            <Input
              style={{ width: 300 }}
              placeholder="Recipe name"
              onChange={(value) => {
                setRecipe({ ...recipe, name: value });
              }}
            />
          </Whisper>
          <label>Description</label>
          <Input
            as="textarea"
            rows={3}
            placeholder="Description"
            onChange={(value) => {
              setRecipe({ ...recipe, description: value });
            }}
          />
          <Stack justifyContent={"space-between"}>
            <div>
              <label>Servings</label>
              <InputNumber
                onChange={(value) => {
                  value = parseInt(value.toString());
                  setRecipe({ ...recipe, servings: value });
                }}
              />
            </div>
            <div>
              <label>Cook time</label>
              <InputNumber
                onChange={(value) => {
                  value = parseInt(value.toString());
                  setRecipe({ ...recipe, cookTime: value });
                }}
              />
            </div>
          </Stack>
          <FoodList
            foodlist={recipe.ingredients}
            updateFoodList={(foodlist) => {
              setRecipe({ ...recipe, ingredients: foodlist });
            }}
          />
          <DirectionList
            directionlist={recipe.directions}
            updateDirectionList={(directionlist) => {
              setRecipe({ ...recipe, directions: directionlist });
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <ButtonToolbar>
            <Button onClick={handleSubmit} appearance="primary">
              Submit
            </Button>
            <Button onClick={handleCancel} appearance="default">
              Cancel
            </Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RecipeForm;
