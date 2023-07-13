import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import { createToken } from "@/helpers/jws";
import { useCategoryContext } from "@/context/CategoryContext";
import { CiSquareRemove } from "react-icons/ci";

interface EditCategoryProps {
  setSelectedCategory: any;
  selectedCategory: any;
  tokenAdmin: any;
  setRecall: any;
}

export default function EditCategory({
  setSelectedCategory,
  selectedCategory,
  tokenAdmin,
  setRecall,
}: EditCategoryProps) {
  const { postCategory } = useCategoryContext();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("The category name is required.")
        .min(3, "The category name only can have between 3 and 50 characters.")
        .max(
          144,
          "The category name only can have between 3 and 144 characters."
        ),
    }),
    onSubmit: async (formData: any) => {
      if (!selectedCategory) {
        await postCategory(formData.name, createToken(tokenAdmin));
      }
      setRecall(true);
      setSelectedCategory(null);
      formData.name = "";
    },
  });

  return (
    <div id="home-categories" className="container">
      {selectedCategory ? (
        <h5>
          <span
            className="remove-category-logo"
            onClick={() => setSelectedCategory(null)}
          >
            <CiSquareRemove fontSize={"large"} />
          </span>
          Modify: <strong>{selectedCategory.name}</strong>{" "}
        </h5>
      ) : (
        <h5>
          Register a <strong>new</strong> category
        </h5>
      )}
      <Form onSubmit={formik.handleSubmit} method="POST">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="text"
            placeholder="category name"
            required
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && formik.values.name.length > 144 && (
            // @ts-ignore
            <small className="text-danger">{formik.errors.name}</small>
          )}
        </Form.Group>
        <Button
          variant="primary"
          size="lg"
          type="submit"
          className="w-100"
          disabled={!formik.values.name || formik.errors.name != undefined}
        >
          {selectedCategory ? "Modify" : "Create"}
        </Button>
      </Form>
    </div>
  );
}
