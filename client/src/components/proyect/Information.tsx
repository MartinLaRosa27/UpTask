import React from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useProjectContext } from "../../context/ProjectContext";
import { useParticipantContext } from "../../context/ParticipantContext";

export const Information = (props: {
  token: string;
  projectId: string;
  project: any;
  user: any;
}) => {
  const router = useRouter();
  const { deleteProject } = useProjectContext();
  const { LeaveProject } = useParticipantContext();

  const handleClickLeveProject = () => {
    Swal.fire({
      title: "Are you sure you want to leave the project?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await LeaveProject(props.projectId, props.token);
        router.push("/");
      }
    });
  };

  const handleClickDeleteProject = () => {
    Swal.fire({
      title: "Are you sure you want to delete the project?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteProject(props.projectId, props.token);
        router.push("/");
      }
    });
  };

  return (
    <div className="text-center">
      <h1 className="fw-bold">{props.project.name}</h1>
      <h6>{props.project.categoryId}</h6>
      <div className="buttons mt-2 mb-3">
        {props.user._id === props.project.userId ? (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleClickDeleteProject()}
          >
            Delete Project
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleClickLeveProject()}
          >
            leave project
          </button>
        )}
      </div>
    </div>
  );
};
