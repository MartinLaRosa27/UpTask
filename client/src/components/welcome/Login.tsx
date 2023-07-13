import React from "react";
import Link from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useUserContext } from "../../context/UserContext";

export const Login = () => {
  const router = useRouter();
  const { userAuthentication } = useUserContext();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("The username is required."),
      password: Yup.string().required("The password is required."),
    }),
    onSubmit: async (formData: any) => {
      const result = await userAuthentication(formData);
      if (result) {
        router.push("/");
      }
    },
  });

  return (
    <div id="welcome-login">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto py-4 px-0">
            <div className="card p-0">
              <div className="card-title text-center">
                <h5 className="mt-5 text-uppercase">
                  Welcome to UpTask 2023!!!
                </h5>
                <small className="para">Login to your account below.</small>
              </div>
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
                </div>{" "}
                <button
                  type="submit"
                  className="btn btn-primary mt-2"
                  disabled={
                    formik.errors.password != undefined ||
                    formik.errors.username != undefined ||
                    formik.values.username.length === 0 ||
                    formik.values.password.length === 0
                  }
                >
                  Login
                </button>
              </form>
              <div className="container pt-4">
                <hr />
              </div>
              <div className="forgot pb-5">
                <div>
                  <p className="f-text">
                    <a
                      href={process.env.NEXT_PUBLIC_ADMIN_PAGE}
                      style={{ color: "gray" }}
                    >
                      Panel de administrador
                    </a>
                  </p>
                </div>
                <div>
                  <Link href={"/sign-in"} className="sign-text fw-bold">
                    Sign Up Now
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
