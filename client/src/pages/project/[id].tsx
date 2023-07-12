import React from "react";
import auth from "@/middleware/auth";
import * as cookie from "cookie";
import Head from "next/head";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { List } from "@/components/List";
import { Tasks } from "@/components/proyect/Tasks";
import { Participants } from "@/components/proyect/Participants";
import { useProjectContext } from "../../context/ProjectContext";
import { Information } from "@/components/proyect/Information";

export default function Proyect(props: {
  user: any;
  token: string;
  projectId: string;
}) {
  const { getProjectById } = useProjectContext();
  const [project, setProject] = React.useState<any>(null);
  const [error, setError] = React.useState<boolean | any>(false);

  React.useEffect(() => {
    const callGetProjectById = async () => {
      const result = await getProjectById(props.projectId, props.token);
      if (result) {
        setProject(result);
      } else {
        setError(true);
      }
    };
    callGetProjectById();
  }, [props.projectId]);

  return (
    <>
      <Head>
        <title>UpTask 2023</title>
      </Head>
      <main id="proyect">
        <Header user={props.user} token={props.token} />
        <div className="list-container">
          <List token={props.token} />
          {!error && (
            <>
              {project ? (
                <>
                  <Head>
                    <title>{project.name} | UpTask 2023</title>
                  </Head>
                  <div className="information pt-5 pb-5">
                    <Information
                      project={project}
                      token={props.token}
                      projectId={props.projectId}
                      user={props.user}
                    />
                    <Tasks token={props.token} projectId={props.projectId} />
                    <Participants
                      project={project}
                      token={props.token}
                      projectId={props.projectId}
                      user={props.user}
                    />
                  </div>
                </>
              ) : (
                <div className="text-center mt-5 mb-5 w-100">
                  <div className="spinner-border" role="status"></div>
                </div>
              )}
            </>
          )}

          {error && (
            <div className="alert alert-danger mt-5 mb-5" role="alert">
              project could not be found
            </div>
          )}
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
        projectId: context.query.id,
      },
    };
  }
};
