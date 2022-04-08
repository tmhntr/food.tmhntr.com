import React, { useEffect } from "react";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";
import { Button, Col, Grid, Header, Row } from "rsuite";
import Layout from "../components/Layout";
import RecipeForm from "../components/RecipeForm";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  getPublicRecipesAsync,
  selectRecipes,
} from "../features/user/recipeSlice";
import { Recipe } from "../lib/models";
import RecipeCard from "../components/RecipeCard";

const styles = {
  button: {
    // justifyContent: "center",
    // alignItems: "center",
    position: "fixed",
    bottom: 80,
    right: 80,
    width: 60,
    height: 60,
    // backgroundColor: "#26653A",
  },
};

const Index = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  let recipes: Recipe[] = useSelector(selectRecipes);
  useEffect(() => {
    dispatch(getPublicRecipesAsync());
  }, []);
  return (
    <>
      <Grid fluid>
        <Row>
          {recipes.map((recipe, index) => (
            <Col xs={24} md={12} key={recipe.id ? recipe.id : index}>
              <RecipeCard recipe={recipe} style={{ margin: 48 }} />
            </Col>
          ))}
        </Row>
      </Grid>
      {session && <RecipeForm style={styles.button} />}
    </>
  );
};

Index.auth = true;

export default Index;
