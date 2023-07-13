import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useCategoryContext } from "@/context/CategoryContext";

// ----------------------------------------------------------------------------------------
export default function Categories() {
  const { getAllCategories } = useCategoryContext();
  const [allCategories, setAllCategories] = useState<any[] | null>(null);

  useEffect(() => {
    const callGetAllCategories = async () => {
      setAllCategories(await getAllCategories());
    };
    callGetAllCategories();
  }, []);

  return (
    <div id="home-categories">
      <div className="container list-categories">
        <h3>
          <strong>Modify</strong> or <strong>Delete</strong> categories:
        </h3>
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
                  <Badge bg="primary" pill>
                    <AiFillEdit />
                  </Badge>
                  <Badge bg="danger" pill>
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
