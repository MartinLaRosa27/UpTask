import React from "react";
import * as Yup from "yup";
import Cookies from "universal-cookie";
import * as cookie from "cookie";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

// ----------------------------------------------------------------------------------------
export default function Welcome() {
  const router = useRouter();

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
      if (
        formData.username == process.env.NEXT_PUBLIC_USER &&
        formData.password == process.env.NEXT_PUBLIC_PASS
      ) {
        const cookies = new Cookies();
        cookies.set("tokenAdmin", `${formData.username} ${formData.password}`, {
          path: "/",
          maxAge: Number(process.env.NEXT_PUBLIC_COOKIE_EXP_SEC),
        });
        router.push("/");
      } else {
        toast.error("Datos incorrectos", {
          style: {
            background: "#333",
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center",
          },
        });
      }
    },
  });

  return (
    <div id="welcome-login">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto py-4 px-0">
            <div className="card p-0 pb-4">
              <div className="card-title text-center">
                <h5 className="mt-5 text-uppercase">
                  Welcome to UpTask 2023 admin panel
                </h5>
                <small className="para">Login to your account below</small>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------------------
export const getServerSideProps = async (context: any) => {
  let tokenAdmin;
  if (typeof context.req.headers.cookie !== "string") {
    tokenAdmin = null;
  } else {
    const parsedCookies = cookie.parse(context.req.headers.cookie);
    tokenAdmin = parsedCookies.tokenAdmin;
  }
  if (
    tokenAdmin &&
    tokenAdmin ==
      `${process.env.NEXT_PUBLIC_USER} ${process.env.NEXT_PUBLIC_PASS}`
  ) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        tokenAdmin: false,
      },
    };
  }
};
