import React from "react";
import * as cookie from "cookie";
import HeaderHome from "@/components/Home/HeaderHome";
import Categories from "@/components/Home/Categories";

// ----------------------------------------------------------------------------------------
export default function Home() {
  return (
    <>
      <HeaderHome />
      <Categories />
    </>
  );
}

// ----------------------------------------------------------------------------------------
export const getServerSideProps = async (context: any) => {
  let tokenAdmin;
  if (typeof context.req.headers.cookie !== "string") {
    tokenAdmin = null;
  } else {
    const parsedCookies = cookie.parse(context.req.headers.cookie);
    tokenAdmin = parsedCookies.tokenAdmin;
  }
  if (!tokenAdmin) {
    tokenAdmin = null;
  }
  if (
    !tokenAdmin ||
    tokenAdmin !=
      `${process.env.NEXT_PUBLIC_USER} ${process.env.NEXT_PUBLIC_PASS}`
  ) {
    return {
      redirect: {
        destination: "/welcome",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        tokenAdmin,
      },
    };
  }
};
