import React, { createContext, useContext } from "react";
import { toast } from "react-hot-toast";
import { print } from "graphql";
import gql from "graphql-tag";
import axios from "axios";
const Context = createContext();

export const ParticipantContext = ({ children }) => {
  const [participants, setParticipants] = React.useState(null);

  // ---------------------------------------------------------------------------
  const postParticipant = async (form, token) => {
    const POST_PARTICIPANT = gql`
      mutation PostParticipant($input: participantInput) {
        postParticipant(input: $input) {
          _id
          projectId
          userId
        }
      }
    `;
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(POST_PARTICIPANT),
          variables: {
            input: {
              projectId: form.projectId,
              userId: form.userId,
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
          toast.success("Participant added to project", {
            style: {
              background: "#333",
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
            },
          });
          getParicipants(form.projectId, token);
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
  const getParicipants = async (projectId, token) => {
    const GET_PARTICIPANTS = gql`
      query GetParticipants($projectId: String) {
        getParticipants(projectId: $projectId) {
          _id
          projectId
          userId
        }
      }
    `;
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(GET_PARTICIPANTS),
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
          setParticipants(res.data.data.getParticipants);
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
  const deleteParticipant = async (userId, projectId, token) => {
    const DELETE_PARTICIPANT = gql`
      mutation DeleteParticipant($userId: String, $projectId: String) {
        deleteParticipant(userId: $userId, projectId: $projectId) {
          _id
          projectId
          userId
        }
      }
    `;
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(DELETE_PARTICIPANT),
          variables: {
            userId,
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
          toast.success("Participant successfully removed from project", {
            style: {
              background: "#333",
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
            },
          });
          getParicipants(projectId, token);
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
  const LeaveProject = async (projectId, token) => {
    const LEAVE_PROJECT = gql`
      mutation LeaveProject($projectId: String) {
        leaveProject(projectId: $projectId) {
          projectId
          userId
          _id
        }
      }
    `;
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(LEAVE_PROJECT),
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
          toast.success("you leave the project", {
            style: {
              background: "#333",
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
            },
          });
          getParicipants(projectId, token);
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
        participants,
        postParticipant,
        getParicipants,
        deleteParticipant,
        LeaveProject,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useParticipantContext = () => {
  return useContext(Context);
};
