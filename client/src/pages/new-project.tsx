import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { List } from "@/components/List";
import { Form } from "@/components/new-proyect/Form";
import auth from "@/middleware/auth";
import * as cookie from "cookie";
import Head from "next/head";

export default function NewProject(props: { user: any; token: string }) {
  return (
    <>
      <Head>
        <title>New Project | UpTask 2023</title>
      </Head>
      <main>
        <Header user={props.user} token={props.token} />
        <div className="list-container">
          <List token={props.token} />
          <Form token={props.token} />
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
