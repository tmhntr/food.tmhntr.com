import Link from "next/link";
import React, { FC } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Button,
  Container,
  Content,
  Dropdown,
  FlexboxGrid,
  Header,
  Nav,
  Navbar,
  Popover,
  Whisper,
} from "rsuite";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { Session } from "next-auth";
import { useDispatch } from "react-redux";
import { getUserIdAsync } from "../features/user/userSlice";

const style = {
  nav: {
    // width: 300,
    margin: "0 auto",
  },
};

interface LayoutProps {
  activeKey?: string;
  children?: React.ReactNode;
}

// interface NavLinkProps {
//   as: string;
//   href: string;
// }

// const NavLink = React.forwardRef(
//   (props: NavLinkProps, ref: React.Ref<HTMLAnchorElement>) => {
//     const { as, href, ...rest } = props;
//     return (
//       <Link href={href} as={as}>
//         <a ref={ref} {...rest} />
//       </Link>
//     );
//   }
// );

const UserButton: FC<{ session: Session }> = ({ session }) => {
  const router = useRouter();
  const ref = React.useRef();
  const dispatch = useDispatch();

  const onSelect = (key: string) => {
    switch (key) {
      case "food":
        dispatch(getUserIdAsync());
        router.push("/food");
        break;
      case "sign out":
        signOut({ callbackUrl: "http://localhost:3000" });
        break;
      default:
        break;
    }
  };

  const userMenu = (
    <Popover title={session.user.name}>
      <Dropdown.Menu onSelect={onSelect}>
        <Dropdown.Item eventKey={"food"}>My Food</Dropdown.Item>
        <Dropdown.Item eventKey={"sign out"}>Sign Out</Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
  );

  return (
    <Whisper
      placement="bottomEnd"
      trigger="hover"
      controlId="control-id-hover-enterable"
      enterable
      ref={ref}
      speaker={userMenu}
    >
      <Avatar src={session.user.image} alt={session.user.name} />
    </Whisper>
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
          <Navbar.Brand href="/" style={style.nav}>
            Food Manager
          </Navbar.Brand>
          <Nav style={style.nav} pullRight activeKey={activeKey}>
            {session ? (
              <Nav.Item>
                <UserButton session={session} />
              </Nav.Item>
            ) : (
              <Nav.Item onSelect={() => signIn()}>Sign in</Nav.Item>
            )}
          </Nav>
        </Navbar>
      </Header>
      <Content>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={18}>{children}</FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </Container>
  );
};

export default Layout;
