import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";

const Index = () => {
  return (
    <>
      <Link href="/login">
        <a>Click to login</a>
      </Link>
    </>
  );
};

export default Index;
