import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AppState, AppThunk } from "../../app/store";
import type { Recipe } from "../../lib/models";
import { getPublicRecipes, postRecipe } from "./recipeAPI";
import { fetchUser } from "./userAPI";

export interface RecipeState {
  myRecipes: Recipe[];
  buffer: Recipe[];
  bufferSize: number;
  status: "idle" | "loading" | "failed";
}

const initialState: RecipeState = {
  myRecipes: [],
  buffer: [],
  bufferSize: 20,
  status: "idle",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getPublicRecipesAsync = createAsyncThunk(
  "recipes/getPublicRecipes",
  async (arg, thunkAPI) => {
    const response = await getPublicRecipes();

    return response.data;
  }
);
export const getMyRecipesAsync = createAsyncThunk(
  "recipes/getMyRecipes",
  async (arg, thunkAPI) => {
    const response = await getPublicRecipes();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const postRecipeAsync = createAsyncThunk(
  "recipes/postRecipe",
  async (arg: Recipe, thunkAPI) => {
    const response = await postRecipe(arg);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addToBuffer: (state, action: PayloadAction<Recipe[]>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.buffer = action.payload;
      // while (state.buffer.length > state.bufferSize) {
      //   state.buffer.pop();
      // }
    },
    setMyRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.myRecipes = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getPublicRecipesAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPublicRecipesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload) state.buffer = action.payload;
      });
  },
});

export const { addToBuffer } = recipeSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectRecipes = (state: AppState) => state.recipes.buffer;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (id: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectUserName(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(getNameAsync(id));
//     }
//   };

export default recipeSlice.reducer;
