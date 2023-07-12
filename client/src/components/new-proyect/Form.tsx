import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useCategoryContext } from "../../context/CategoryContext";
import { useProjectContext } from "../../context/ProjectContext";

export const Form = (props: { token: string }) => {
  const { categories, getAllCategories } = useCategoryContext();
  const { postProject } = useProjectContext();

  React.useEffect(() => {
    getAllCategories();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      categoryId: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("The project name is required.")
        .min(3, "The project name only can have between 3 and 255 characters.")
        .max(
          255,
          "The project name only can have between 3 and 255 characters."
        ),
      categoryId: Yup.string().required("The categoryId is required."),
    }),
    onSubmit: async (formData: any) => {
      postProject(formData, props.token);
      formik.values.name = "";
      formik.values.categoryId = "";
    },
  });

  return (
    <div id="new-proyect-form" className="container">
      <h2 className="text-center mt-5 mb-5">
        Register a <strong>New Project</strong>
      </h2>
      {categories ? (
        <form onSubmit={formik.handleSubmit} method="POST">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Project Name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name && formik.values.name.length !== 0 && (
              <small className="text-danger">{formik.errors.name}</small>
            )}
            <label>Project Name</label>
          </div>
          <div>
            <select
              typeof="nuber"
              className="form-select form-select-lg mb-3"
              aria-label="Default select example"
              name="categoryId"
              onChange={formik.handleChange}
              value={formik.values.categoryId}
            >
              <option value={0}>Project Category</option>
              {categories.map((category: any) => {
                return (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="d-grid gap-2 mt-4">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={
                formik.errors.name != undefined ||
                formik.errors.categoryId != undefined ||
                formik.values.name.length === 0 ||
                formik.values.categoryId === "0"
              }
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center mt-5 mb-5">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
    </div>
  );
};
