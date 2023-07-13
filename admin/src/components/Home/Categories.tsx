import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useCategoryContext } from "@/context/CategoryContext";

interface CategoriesProps {
  setSelectedCategory: any;
  selectedCategory: any[];
  recall: boolean;
  setRecall: any;
}

export default function Categories({
  setSelectedCategory,
  selectedCategory,
  recall,
  setRecall,
}: CategoriesProps) {
  const { getAllCategories } = useCategoryContext();
  const [allCategories, setAllCategories] = useState<any[] | null>(null);

  useEffect(() => {
    const callGetAllCategories = async () => {
      setAllCategories(await getAllCategories());
    };
    callGetAllCategories();
    setRecall(false);
  }, [selectedCategory, recall]);

  const handleClick = (category: any) => {
    if (
      window.confirm(
        `Are you sure you want to delete the category "${category.name}"?`
      )
    ) {
    }
  };

  return (
    <div id="home-categories">
      <div className="container list-categories">
        <h3>
          <strong>Modify</strong> or <strong>Delete</strong> categories:
        </h3>
        {!allCategories && (
          <div className="text-center">
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Loading categories...
            </Button>
          </div>
        )}
        {allCategories && allCategories.length > 0 && (
          <ListGroup as="ol">
            {allCategories.map((category: any, i: number) => {
              return (
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                  key={i}
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{category.name}</div>
                  </div>
                  <Badge
                    bg="primary"
                    pill
                    onClick={() => setSelectedCategory(category)}
                  >
                    <AiFillEdit />
                  </Badge>
                  <Badge bg="danger" pill onClick={() => handleClick(category)}>
                    <AiFillDelete />
                  </Badge>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </div>
    </div>
  );
}
