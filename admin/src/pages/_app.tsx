import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { CategoryContext } from "@/context/CategoryContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>UpTask2023 - Admin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CategoryContext>
        <Toaster />
        <Component {...pageProps} />
      </CategoryContext>
    </>
  );
}
