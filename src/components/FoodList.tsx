import React, { FC } from "react";
import {
  Button,
  FlexboxGrid,
  Input,
  InputNumber,
  InputPicker,
  List,
  Panel,
  Stack,
} from "rsuite";
import { Food, foodUnitList } from "../lib/models";

const FoodList: FC<{
  foodlist: Food[];
  updateFoodList: (foodlist: Food[]) => void;
}> = ({ foodlist, updateFoodList }) => {
  //   const { foodlist } = props;
  let initialState: Food = { name: "", amount: null, units: null };
  const [foodToAdd, setFoodToAdd] = React.useState(initialState);

  const handleAddFood = () => {
    updateFoodList([...foodlist, foodToAdd]);
    setFoodToAdd(initialState);
  };

  const handleEditFood = (index: number): void => {
    setFoodToAdd(foodlist[index]);

    updateFoodList(foodlist.filter((value, i) => i !== index));
  };
  const handleDeleteFood = (index: number): void => {
    updateFoodList(foodlist.filter((value, i) => i !== index));
  };
  return (
    <>
      <Panel header="Ingredient list" bordered bodyFill>
        <List hover>
          {foodlist.map((item, index) => (
            <List.Item key={item["name"] + index} index={index + 1}>
              <FlexboxGrid justify="space-between">
                {/*name*/}
                <FlexboxGrid.Item colspan={10}>
                  <p style={{ marginLeft: 10 }}>{item["name"]}</p>
                </FlexboxGrid.Item>
                {/* amount */}
                <FlexboxGrid.Item colspan={4}>
                  <p>
                    {item["amount"]} {item["units"]}
                  </p>
                </FlexboxGrid.Item>

                {/*edit button*/}
                <FlexboxGrid.Item colspan={4}>
                  <a onClick={() => handleEditFood(index)}>Edit</a>
                  <span style={{ padding: 5 }}>|</span>
                  <a onClick={() => handleDeleteFood(index)}>Delete</a>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </List.Item>
          ))}
        </List>
      </Panel>
      <FlexboxGrid justify={"space-between"} align="bottom">
        <FlexboxGrid.Item>
          <label>Name</label>
          <Input
            value={foodToAdd.name}
            onChange={(value) => {
              setFoodToAdd({ ...foodToAdd, name: value });
            }}
          />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item>
          <label>Amount</label>
          <InputNumber
            value={foodToAdd.amount}
            onChange={(value) => {
              value = parseInt(value.toString());
              setFoodToAdd({ ...foodToAdd, amount: value });
            }}
          />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item>
          <label>Units</label>
          <InputPicker
            value={foodToAdd.units}
            data={foodUnitList.map((item) => ({ label: item, value: item }))}
            onChange={(value) => {
              setFoodToAdd({ ...foodToAdd, units: value });
            }}
          />
        </FlexboxGrid.Item>
        <Button onClick={handleAddFood}>Add</Button>
      </FlexboxGrid>
    </>
  );
};

export default FoodList;
