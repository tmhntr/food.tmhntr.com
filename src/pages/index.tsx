import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Col, FlexboxGrid, Grid, Header, Panel, Row } from "rsuite";
import Layout from "../components/Layout";

const Index = () => {
  return (
    <>
      <Header>
        <title>HOME</title>
      </Header>
      <Layout activeKey="home">
        <Grid fluid>
          <Row>
            <Col></Col>
          </Row>
        </Grid>
      </Layout>
    </>
  );
};

Index.auth = true;

export default Index;
