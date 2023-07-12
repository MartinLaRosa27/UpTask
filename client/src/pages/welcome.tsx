import { Footer } from "@/components/Footer";
import { Login } from "@/components/welcome/Login";
import auth from "@/middleware/auth";
import * as cookie from "cookie";
import Head from "next/head";

export default function Welcome() {
  return (
    <>
      <Head>
        <title>Login with your account | UpTask 2023</title>
      </Head>
      <main>
        <Login />
        <Footer />
      </main>
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

  if (await auth(token)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        token,
      },
    };
  }
};
