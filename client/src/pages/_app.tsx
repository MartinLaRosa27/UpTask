import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CountryContext } from "@/context/CountryContext";
import { UserContext } from "@/context/UserContext";
import { CategoryContext } from "@/context/CategoryContext";
import { ProjectContext } from "@/context/ProjectContext";
import { TaskContext } from "@/context/TaskContext";
import { ParticipantContext } from "@/context/ParticipantContext";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>UpTask 2023</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        </style> */}
      </Head>
      <CountryContext>
        <UserContext>
          <CategoryContext>
            <ProjectContext>
              <TaskContext>
                <ParticipantContext>
                  <Toaster />
                  <Component {...pageProps} />
                </ParticipantContext>
              </TaskContext>
            </ProjectContext>
          </CategoryContext>
        </UserContext>
      </CountryContext>
    </>
  );
}