import { Footer } from "@/components/Footer";
import { SignInForm } from "@/components/sign-in/SignInForm";
import auth from "@/middleware/auth";
import * as cookie from "cookie";
import Head from "next/head";

export default function SignIn() {
  return (
    <>
      <Head>
        <title>Create your account | UpTask 2023</title>
      </Head>
      <main>
        <SignInForm />
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
