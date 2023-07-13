import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useCategoryContext } from "@/context/CategoryContext";

interface EditCategoryProps {
  setSelectedCategory: any;
  selectedCategory: any;
}

export default function EditCategory({
  setSelectedCategory,
  selectedCategory,
}: EditCategoryProps) {
  const { getAllCategories } = useCategoryContext();

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
      alert("ok");
      setSelectedCategory(null);
      formData.name = "";
    },
  });

  return (
    <div id="home-categories" className="container">
      <Form onSubmit={formik.handleSubmit} method="POST">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="text"
            placeholder="category name"
            required
            name="name"
            onChange={formik.handleChange}
            value={
              selectedCategory ? selectedCategory.name : formik.values.name
            }
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
