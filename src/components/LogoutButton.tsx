import { signOut } from "next-auth/react";
import React, { FC } from "react";
import { Button } from "rsuite";

const LogoutButton: FC = () => {
  return (
    <Button onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}>
      Sign out
    </Button>
  );
};

export default LogoutButton;
