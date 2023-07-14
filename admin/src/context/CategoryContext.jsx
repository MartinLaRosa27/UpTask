import React, { createContext, useContext } from "react";
import { print } from "graphql";
import { toast } from "react-hot-toast";
import axios from "axios";
import gql from "graphql-tag";
const Context = createContext();

export const CategoryContext = ({ children }) => {
  // ---------------------------------------------------------------------------
  const getAllCategories = async () => {
    let categoriesAux = [];
    const GET_ALL_CATEGORIES = gql`
      query GetAllCategories {
        getAllCategories {
          name
          _id
        }
      }
    `;
    await axios
      .post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
        query: print(GET_ALL_CATEGORIES),
      })
      .then((res) => {
        if (!res.data.errors) {
          categoriesAux = res.data.data.getAllCategories;
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
    return categoriesAux;
  };

  // ---------------------------------------------------------------------------
  const postCategory = async (name, token) => {
    const POST_CATEGORY = gql`
      mutation Mutation($input: categoryInput) {
        postCategory(input: $input) {
          name
          _id
        }
      }
    `;
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(POST_CATEGORY),
          variables: {
            input: {
              name,
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
          toast.success("Category successfully registered", {
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
  const deleteProject = async (id, token) => {
    const DELETE_CATEGORY = gql`
      mutation DeleteCategory($deleteCategoryId: String) {
        deleteCategory(id: $deleteCategoryId) {
          name
          _id
        }
      }
    `;
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(DELETE_CATEGORY),
          variables: {
            deleteCategoryId: id,
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
          toast.success("category successfully removed", {
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
    <Context.Provider value={{ getAllCategories, postCategory, deleteProject }}>
      {children}
    </Context.Provider>
  );
};

export const useCategoryContext = () => {
  return useContext(Context);
};
