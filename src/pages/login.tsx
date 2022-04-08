import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import Layout from "../components/Layout";
import { Button, ButtonToolbar, Form, Panel } from "rsuite";

const login = () => {
  const { data: session } = useSession();
  const [id, setId] = React.useState("");

  if (session) {
    return (
      <Layout>
        <p>Signed in as {session.user.name}</p> <br />
        <Button onClick={() => signOut()} appearance="primary">
          Sign out
        </Button>
      </Layout>
    );
  }
  return (
    <>
      <Panel header={<h3>Login</h3>} bordered>
        <Form fluid>
          {/* <Form.Group>
                  <Form.ControlLabel>Username or email address</Form.ControlLabel>
                  <Form.Control name="name" />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Password</Form.ControlLabel>
                  <Form.Control name="password" type="password" autoComplete="off" />
                </Form.Group> */}
          <Form.Group>
            <ButtonToolbar>
              <Button
                appearance="primary"
                onClick={() =>
                  signIn(null, { callbackUrl: "http://localhost:3000/" })
                }
              >
                Sign in
              </Button>
              {/* <Button appearance="link">Forgot password?</Button> */}
            </ButtonToolbar>
          </Form.Group>
        </Form>
      </Panel>
    </>
  );
};

export default login;
