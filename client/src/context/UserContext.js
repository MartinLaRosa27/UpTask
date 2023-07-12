import React, { createContext, useContext } from "react";
import { toast } from "react-hot-toast";
import { print } from "graphql";
import gql from "graphql-tag";
import Cookies from "universal-cookie";
import axios from "axios";
const Context = createContext();

export const UserContext = ({ children }) => {
  const [searchUsers, setSearchUsers] = React.useState(null);

  // ---------------------------------------------------------------------------
  const postUser = async (form) => {
    let userConfirmation = false;
    const POST_USER = gql`
      mutation PostUser($input: userInput) {
        postUser(input: $input)
      }
    `;
    await axios
      .post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
        query: print(POST_USER),
        variables: {
          input: {
            country: form.country,
            password: form.password,
            username: form.username,
          },
        },
      })
      .then((res) => {
        if (!res.data.errors) {
          toast.success("User successfully registered", {
            style: {
              background: "#333",
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
            },
          });
          const cookies = new Cookies();
          cookies.set("token", res.data.data.postUser, {
            path: "/",
            maxAge: process.env.NEXT_PUBLIC_COOKIE_EXP_SEC,
          });
          userConfirmation = true;
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
    return userConfirmation;
  };

  // ---------------------------------------------------------------------------
  const patchUser = async (form, token) => {
    const PATCH_USER = gql`
      mutation PatchUser($input: userInput) {
        patchUser(input: $input)
      }
    `;
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(PATCH_USER),
          variables: {
            input: {
              username: form.username,
              country: form.country,
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
          toast.success("User information changed successfully", {
            style: {
              background: "#333",
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
            },
          });
          const cookies = new Cookies();
          cookies.set("token", res.data.data.patchUser, {
            path: "/",
            maxAge: process.env.NEXT_PUBLIC_COOKIE_EXP_SEC,
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
  const userAuthentication = async (form) => {
    let userConfirmation = false;
    const AUTHENTICATE_USER = gql`
      query Query($input: userInput) {
        userAuthentication(input: $input)
      }
    `;
    await axios
      .post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
        query: print(AUTHENTICATE_USER),
        variables: {
          input: {
            password: form.password,
            username: form.username,
          },
        },
      })
      .then((res) => {
        if (!res.data.errors) {
          toast.success("Login successful", {
            style: {
              background: "#333",
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
            },
          });
          const cookies = new Cookies();
          cookies.set("token", res.data.data.userAuthentication, {
            path: "/",
            maxAge: process.env.NEXT_PUBLIC_COOKIE_EXP_SEC,
          });
          userConfirmation = true;
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
    return userConfirmation;
  };

  // ---------------------------------------------------------------------------
  const getUserByUsername = async (username, projectId, token) => {
    const GET_USER_BY_USERNAME = gql`
      query GetUserByUsername($projectId: String, $username: String) {
        getUserByUsername(projectId: $projectId, username: $username) {
          _id
          country
          img
          username
        }
      }
    `;
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(GET_USER_BY_USERNAME),
          variables: {
            username,
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
          setSearchUsers(res.data.data.getUserByUsername);
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
  const logout = () => {
    const cookies = new Cookies();
    cookies.remove("token", { path: "/" });
    window.location.reload();
  };

  // ---------------------------------------------------------------------------
  return (
    <Context.Provider
      value={{
        searchUsers,
        postUser,
        patchUser,
        userAuthentication,
        logout,
        getUserByUsername,
        setSearchUsers,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useUserContext = () => {
  return useContext(Context);
};
