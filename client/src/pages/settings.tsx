import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { List } from "@/components/List";
import { Main } from "@/components/settings/Main";
import auth from "@/middleware/auth";
import * as cookie from "cookie";
import Head from "next/head";

export default function Settings(props: { user: any; token: string }) {
  return (
    <>
      <Head>
        <title>{props.user.username} | UpTask 2023</title>
      </Head>
      <main>
        <Header user={props.user} token={props.token} />
        <div className="list-container">
          <List token={props.token} />
          <Main user={props.user} token={props.token} />
        </div>
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
  if (!token) {
    token = null;
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
        user,
        token,
      },
    };
  }
};
