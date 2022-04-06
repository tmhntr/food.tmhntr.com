import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LogoutButton from "../components/LogoutButton";

const Index = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return (
      <>
        <Link href="/login">
          <a>Click to login</a>
        </Link>
      </>
    );
  }

  return (
    <>
      <h1>Protected Page</h1>
      <p>You can view this page because you are signed in.</p>
      <code>{JSON.stringify(session)}</code>
      <LogoutButton />
    </>
  );
};

export default Index;
