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
  return (
    <Context.Provider value={{ getAllCategories }}>{children}</Context.Provider>
  );
};

export const useCategoryContext = () => {
  return useContext(Context);
};
