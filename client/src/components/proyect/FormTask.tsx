import React from "react";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTaskContext } from "../../context/TaskContext";

export const FormTask = (props: {
  show: boolean;
  onHide: any;
  token: string;
  projectid: string;
}) => {
  const { postTask } = useTaskContext();

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: Yup.object({
      description: Yup.string()
        .required("The description of the task is required.")
        .min(
          3,
          "The description of the task only can have between 3 and 100 characters."
        )
        .max(
          100,
          "The description of the task only can have between 3 and 100 characters."
        ),
    }),
    onSubmit: async (formData: any) => {
      formData.projectId = props.projectid;
      if (await postTask(formData, props.token)) {
        formik.values.description = "";
        props.onHide(true);
      }
    },
  });

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="fw-bold fst-italic"
        >
          Add new task for the project
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form method="POST" onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Task Description"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
            {formik.errors.description &&
              formik.values.description.length !== 0 && (
                <small className="text-danger">
                  {formik.errors.description}
                </small>
              )}
            <label>Task Description</label>
          </div>
          <button
            type="submit"
            className="btn btn-warning mt-4"
            style={{ border: "1px solid black" }}
            disabled={
              formik.errors.description != undefined ||
              formik.values.description.length === 0
            }
          >
            Save
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
