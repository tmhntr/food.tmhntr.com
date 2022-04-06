import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FlexboxGrid, Header, Panel } from "rsuite";
import Layout from "../components/Layout";

const Index = () => {
  return (
    <>
      <Header>
        <title>HOME</title>
      </Header>
      <Layout activeKey="home">
        <Grid fluid>
          <Grid.Item colspan={12}>
            <Panel header={<h3>Login</h3>} bordered>
              <Form fluid>
                <Form.Group>
                  <Form.ControlLabel>
                    Username or email address
                  </Form.ControlLabel>
                  <Form.Control name="name" />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Password</Form.ControlLabel>
                  <Form.Control
                    name="password"
                    type="password"
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group>
                  <ButtonToolbar>
                    <Button appearance="primary">Sign in</Button>
                    <Button appearance="link">Forgot password?</Button>
                  </ButtonToolbar>
                </Form.Group>
              </Form>
            </Panel>
          </Grid.Item>
        </Grid>
      </Layout>
    </>
  );
};

Index.auth = true;

export default Index;
