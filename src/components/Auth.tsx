import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export interface AuthType {
  role: string;
  loading: JSX.Element;
  unauthorized: string; // redirect to this url
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    // Always do navigations after the first render
    if (status == "unauthenticated") {
      router.push("/login");
    }
  });

  if (status == "loading") {
    return <p>Loading...</p>;
  } else if (status == "unauthenticated") {
    return <p>Redirecting to login page...</p>;
  } else if (status == "authenticated") {
    return children;
  } else {
    return children;
  }
}

export default Auth;
