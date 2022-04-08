import Link from "next/link";
import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Container,
  Content,
  Header,
  Nav,
  Navbar,
  Popover,
  Whisper,
} from "rsuite";
import { Exit } from "@rsuite/icons";

import "./layout.less";
import LogoutButton from "./LogoutButton";
import { signOut, useSession } from "next-auth/react";

interface LayoutProps {
  activeKey?: string;
  children?: React.ReactNode;
}

interface NavLinkProps {
  as: string;
  href: string;
}

const NavLink = React.forwardRef(
  (props: NavLinkProps, ref: React.Ref<HTMLAnchorElement>) => {
    const { as, href, ...rest } = props;
    return (
      <Link href={href} as={as}>
        <a ref={ref} {...rest} />
      </Link>
    );
  }
);

const ProfileMenu = () => {
  return (
    <Popover title="Title">
      <p>This is a default Popover </p>
      <p>Content</p>
      <p>
        <a>link</a>
      </p>
    </Popover>
  );
};

const Layout: React.FunctionComponent<LayoutProps> = ({
  activeKey,
  children,
}) => {
  const { data: session } = useSession();

  return (
    <Container>
      <Header>
        <Navbar>
          <Nav>Food Manager</Nav>
          <Nav activeKey={activeKey}>
            <Nav.Item eventKey="home" as={NavLink} href="/">
              Home
            </Nav.Item>
            <Nav.Item eventKey="one" as={NavLink} href="/one">
              Profile
            </Nav.Item>
          </Nav>
          <Nav pullRight activeKey={activeKey}>
            {session ? (
              <Nav.Item
                icon={<Exit />}
                onSelect={() =>
                  signOut({ callbackUrl: "http://localhost:3000" })
                }
              >
                Sign out
              </Nav.Item>
            ) : (
              <Nav.Item>
                <Whisper
                  placement="bottomStart"
                  trigger="hover"
                  controlId="control-id-hover-enterable"
                  speaker={ProfileMenu}
                  enterable
                >
                  <Button>Hover + Enterable</Button>
                </Whisper>
              </Nav.Item>
            )}
          </Nav>
        </Navbar>
      </Header>
      <Content>{children}</Content>
    </Container>
  );
};

Layout.propTypes = {
  activeKey: PropTypes.string,
  children: PropTypes.node,
};

export default Layout;
