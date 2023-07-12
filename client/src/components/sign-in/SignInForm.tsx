import React from "react";
import Link from "next/link";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useCountryContext } from "../../context/CountryContext";
import { useUserContext } from "../../context/UserContext";

export const SignInForm = () => {
  const router = useRouter();
  const { countriesList, getAllCountries } = useCountryContext();
  const { postUser } = useUserContext();

  React.useEffect(() => {
    getAllCountries();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordValidation: "",
      country: "United States",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("The username is required.")
        .min(3, "The username only can have between 3 and 50 characters.")
        .max(50, "The username only can have between 3 and 50 characters.")
        .matches(/^[A-Za-z0-9]+$/, "The username cannot have blank space."),
      password: Yup.string()
        .required("The password is required.")
        .min(8, "The password only can have between 8 and 25 characters.")
        .max(25, "The password only can have between 8 and 25 characters.")
        .matches(
          /^[0-9a-zA-Z]+$/,
          "The password can only contain lowercase letters, uppercase letters, and numbers."
        )
        .oneOf(
          [Yup.ref("passwordValidation")],
          "The passwords entered do not match."
        ),
      country: Yup.string().required("The country is required."),
    }),
    onSubmit: async (formData: any) => {
      const result = await postUser(formData);
      if (result) {
        router.push("/");
      }
    },
  });

  return (
    <div id="sign-in-siginform">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto py-4 px-0">
            <div className="card p-0">
              <div className="card-title text-center">
                <h5 className="mt-5 text-uppercase">Create a new account</h5>
                <small className="para">Create an account to access.</small>
              </div>

              {countriesList ? (
                <form
                  className="signup"
                  onSubmit={formik.handleSubmit}
                  method="POST"
                >
                  <div className="form-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      name="username"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    />
                    {formik.errors.username &&
                      formik.values.username.length !== 0 && (
                        <small className="text-danger">
                          {formik.errors.username}
                        </small>
                      )}
                  </div>
                  <div className="form-group mb-2">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    {formik.errors.password &&
                      formik.values.password.length !== 0 && (
                        <small className="text-danger">
                          {formik.errors.password}
                        </small>
                      )}
                  </div>
                  <div className="form-group mb-2">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password Validation"
                      name="passwordValidation"
                      onChange={formik.handleChange}
                      value={formik.values.passwordValidation}
                    />
                    {formik.errors.passwordValidation &&
                      formik.values.passwordValidation.length !== 0 && (
                        <small className="text-danger">
                          {formik.errors.passwordValidation}
                        </small>
                      )}
                  </div>

                  <div className="form-group mb-2">
                    <select
                      id="country"
                      className="form-select form-control"
                      name="country"
                      onChange={formik.handleChange}
                      value={formik.values.country}
                    >
                      <option defaultValue={formik.values.country}>
                        {formik.values.country}
                      </option>
                      {countriesList.map((country: any) => {
                        return (
                          <option
                            value={country.country_name}
                            key={country._id}
                          >
                            {country.country_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary mt-2"
                    disabled={
                      formik.errors.country != undefined ||
                      formik.errors.password != undefined ||
                      formik.errors.passwordValidation != undefined ||
                      formik.errors.username != undefined ||
                      formik.values.passwordValidation.length === 0 ||
                      formik.values.username.length === 0 ||
                      formik.values.password.length === 0
                    }
                  >
                    Sign Up
                  </button>
                </form>
              ) : (
                <div className="text-center mt-5 mb-5">
                  <div className="spinner-border" role="status"></div>
                </div>
              )}

              <div className="forgot pt-3 pb-5 text-center">
                <div>
                  <Link href={"/welcome"} className="sign-text fw-bold">
                    Sign in with an existing account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
