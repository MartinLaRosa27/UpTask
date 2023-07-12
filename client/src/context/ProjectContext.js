import React, { createContext, useContext } from "react";
import { toast } from "react-hot-toast";
import { print } from "graphql";
import gql from "graphql-tag";
import axios from "axios";
const Context = createContext();

export const ProjectContext = ({ children }) => {
  const [projects, setProjects] = React.useState(null);

  // ---------------------------------------------------------------------------
  const postProject = async (form, token) => {
    const POST_PROJECT = gql`
      mutation Mutation($input: projectInput) {
        postProject(input: $input) {
          _id
          name
          userId
          categoryId
        }
      }
    `;
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(POST_PROJECT),
          variables: {
            input: {
              name: form.name,
              categoryId: form.categoryId,
            },
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        if (!res.data.errors) {
          toast.success("Project successfully registered", {
            style: {
              background: "#333",
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
            },
          });
          getUserProjects(token);
        } else {
          toast.error(res.data.errors[0].message, {
            style: {
              background: "#333",
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
            },
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // ---------------------------------------------------------------------------
  const getUserProjects = async (token) => {
    const GET_USER_PROJECTS = gql`
      query GetUserProjects {
        getUserProjects {
          _id
          categoryId
          name
          userId
        }
      }
    `;
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(GET_USER_PROJECTS),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        if (!res.data.errors) {
          setProjects(res.data.data.getUserProjects);
        } else {
          toast.error(res.data.errors[0].message, {
            style: {
              background: "#333",
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
            },
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // ---------------------------------------------------------------------------
  const getProjectById = async (id, token) => {
    let returnValue = null;
    const GET_PROJECT_BY_ID = gql`
      query GetProjectById($getProjectByIdId: String) {
        getProjectById(id: $getProjectByIdId) {
          categoryId
          _id
          name
          userId
        }
      }
    `;
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(GET_PROJECT_BY_ID),
          variables: {
            getProjectByIdId: id,
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        if (!res.data.errors) {
          returnValue = res.data.data.getProjectById;
        } else {
          toast.error(res.data.errors[0].message, {
            style: {
              background: "#333",
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
            },
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
    return returnValue;
  };

  // ---------------------------------------------------------------------------
  const deleteProject = async (id, token) => {
    const DELETE_PROJECT = gql`
      mutation DeleteProject($deleteProjectId: String) {
        deleteProject(id: $deleteProjectId) {
          categoryId
          _id
          userId
          name
        }
      }
    `;
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(DELETE_PROJECT),
          variables: {
            deleteProjectId: id,
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        if (!res.data.errors) {
          toast.success("project successfully removed", {
            style: {
              background: "#333",
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
            },
          });
        } else {
          toast.error(res.data.errors[0].message, {
            style: {
              background: "#333",
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
            },
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // ---------------------------------------------------------------------------
  return (
    <Context.Provider
      value={{
        postProject,
        getUserProjects,
        getProjectById,
        deleteProject,
        projects,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useProjectContext = () => {
  return useContext(Context);
};
