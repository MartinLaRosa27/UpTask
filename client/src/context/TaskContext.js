import React, { createContext, useContext } from "react";
import { toast } from "react-hot-toast";
import { print } from "graphql";
import gql from "graphql-tag";
import axios from "axios";
const Context = createContext();

export const TaskContext = ({ children }) => {
  const [tasks, setTaks] = React.useState(null);

  // ---------------------------------------------------------------------------
  const postTask = async (form, token) => {
    let returnValue = false;
    const POST_TASK = gql`
      mutation PostTask($input: taskInput) {
        postTask(input: $input) {
          _id
          description
          userId
          projectId
          completed
        }
      }
    `;
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(POST_TASK),
          variables: {
            input: {
              description: form.description,
              projectId: form.projectId,
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
          toast.success("Task successfully registered", {
            style: {
              background: "#333",
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
            },
          });
          getProjectTask(form.projectId, token);
          returnValue = true;
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
  const getProjectTask = async (projectId, token) => {
    const GET_PROJECT_TASK = gql`
      query GetProjectTask($projectId: String) {
        getProjectTask(projectId: $projectId) {
          description
          projectId
          userId
          _id
          completed
        }
      }
    `;
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(GET_PROJECT_TASK),
          variables: {
            projectId,
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
          setTaks(res.data.data.getProjectTask);
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
  const updateTask = async (taskId, projectId, token) => {
    const UPADATE_TASK = gql`
      mutation UpdateTask($taskId: String) {
        updateTask(taskId: $taskId) {
          _id
          completed
          description
          projectId
          userId
        }
      }
    `;
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(UPADATE_TASK),
          variables: {
            taskId,
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
          getProjectTask(projectId, token);
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
  const deleteTaks = async (taskId, projectId, token) => {
    const DELETE_TASK = gql`
      mutation DeleteTask($taskId: String) {
        deleteTask(taskId: $taskId) {
          _id
          completed
          description
          projectId
          userId
        }
      }
    `;
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(DELETE_TASK),
          variables: {
            taskId,
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
          toast.success("task successfully removed", {
            style: {
              background: "#333",
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
            },
          });
          getProjectTask(projectId, token);
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
        tasks,
        postTask,
        getProjectTask,
        updateTask,
        deleteTaks,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(Context);
};
