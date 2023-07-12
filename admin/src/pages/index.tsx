import React from "react";
import auth from "@/middleware/auth";
import * as cookie from "cookie";

export default function Home() {
  return (
    <>
      <h1>Hola mundo</h1>
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  let token;
  if (typeof context.req.headers.cookie !== "string") {
    token = null;
  } else {
    const parsedCookies = cookie.parse(context.req.headers.cookie);
    token = parsedCookies.token;
  }

  const user = await auth(token);
  if (!user) {
    return {
      redirect: {
        destination: "/welcome",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        token,
        user,
      },
    };
  }
};