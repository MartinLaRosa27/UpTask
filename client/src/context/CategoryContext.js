import React, { createContext, useContext } from "react";
import axios from "axios";
import { print } from "graphql";
import gql from "graphql-tag";
const Context = createContext();

export const CategoryContext = ({ children }) => {
  const [categories, setCategories] = React.useState(null);

  // ---------------------------------------------------------------------------
  const getAllCategories = async () => {
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
          setCategories(res.data.data.getAllCategories);
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
    <Context.Provider value={{ getAllCategories, categories }}>
      {children}
    </Context.Provider>
  );
};

export const useCategoryContext = () => {
  return useContext(Context);
};
