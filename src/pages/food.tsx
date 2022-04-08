import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import FoodList from "../components/FoodList";
import Layout from "../components/Layout";
import {
  getFoodAsync,
  selectFood,
  updateFoodAsync,
} from "../features/user/foodSlice";

import { Food as FoodType } from "../lib/models";

const Food = () => {
  const dispatch = useDispatch();

  let inventory = useSelector(selectFood);

  const updateFoodList = (foodlist: FoodType[]) => {
    dispatch(updateFoodAsync(foodlist));
  };

  useEffect(() => {
    dispatch(getFoodAsync());
  }, []);

  // console.log(foodlist);

  return <FoodList foodlist={inventory} updateFoodList={updateFoodList} />;
};

export default Food;
