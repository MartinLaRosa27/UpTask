import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { CategoryContext } from "@/context/CategoryContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CategoryContext>
        <Toaster />
        <Component {...pageProps} />
      </CategoryContext>
    </>
  );
}
