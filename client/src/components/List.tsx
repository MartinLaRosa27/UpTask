import React from "react";
import Link from "next/link";
import { useProjectContext } from "../context/ProjectContext";

export const List = (props: { token: string }) => {
  const [show, setShow] = React.useState(false);
  const { getUserProjects, projects } = useProjectContext();

  const handleClick = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  React.useEffect(() => {
    getUserProjects(props.token);
  }, []);

  return (
    <div id="list">
      <div className="container text-center pt-3 pb-2">
        {/* default */}
        <div className="default">
          <h3 className="fw-bold default-title">My Projects</h3>
          {projects ? (
            <>
              {projects.length > 0 ? (
                <ul className="list-group mt-3">
                  {projects.map((project: any) => {
                    return (
                      <li className="list-group-item" key={project._id}>
                        <Link href={`/project/${project._id}`} className="item">
                          {project.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <h6 className="mt-5 text-uppercase text-danger">
                  No projects saved yet
                </h6>
              )}
            </>
          ) : (
            <div className="text-center mt-5 mb-5">
              <div className="spinner-border" role="status"></div>
            </div>
          )}
        </div>
        {/* responsive */}
        <div className="responsive">
          <h3 className="fw-bold" onClick={() => handleClick()}>
            {!show ? <>Show My Projects</> : <>Hide My Projects</>}
          </h3>
          {show && (
            <>
              {projects ? (
                <>
                  {projects.length > 0 ? (
                    <ul className="list-group mt-3">
                      {projects.map((project: any) => {
                        return (
                          <li className="list-group-item" key={project._id}>
                            <Link
                              href={`/project/${project._id}`}
                              className="item"
                            >
                              {project.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <h6 className="mt-5 text-uppercase text-danger">
                      No projects saved yet
                    </h6>
                  )}
                </>
              ) : (
                <div className="text-center mt-5 mb-5">
                  <div className="spinner-border" role="status"></div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
