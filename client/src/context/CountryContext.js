import React, { createContext, useContext } from "react";
import { print } from "graphql";
import gql from "graphql-tag";
import axios from "axios";
const Context = createContext();

export const CountryContext = ({ children }) => {
  const [countriesList, setCountriesList] = React.useState(null);

  // ---------------------------------------------------------------------------
  const getAllCountries = async () => {
    const GET_ALL_COUNTRIES = gql`
      query GetAllCountries {
        getAllCountries {
          _id
          country_code
          country_name
          phone_code
        }
      }
    `;
    await axios
      .post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
        query: print(GET_ALL_COUNTRIES),
      })
      .then((res) => {
        if (!res.data.errors) {
          setCountriesList(res.data.data.getAllCountries);
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
    <Context.Provider value={{ countriesList, getAllCountries }}>
      {children}
    </Context.Provider>
  );
};

export const useCountryContext = () => {
  return useContext(Context);
};
