import React from "react";
import Swal from "sweetalert2";
import { useTaskContext } from "../../context/TaskContext";
import { AiFillDelete, AiOutlineSmile } from "react-icons/ai";
import { BiSad } from "react-icons/bi";
import { FormTask } from "./FormTask";

export const Tasks = (props: { token: string; projectId: string }) => {
  const { getProjectTask, tasks, updateTask, deleteTaks } = useTaskContext();
  const [modalShow, setModalShow] = React.useState<boolean | any>(false);

  const handleClickDeleteTask = (taskId: string) => {
    Swal.fire({
      title: "Are you sure you want to delete the task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteTaks(taskId, props.projectId, props.token);
      }
    });
  };

  React.useEffect(() => {
    getProjectTask(props.projectId, props.token);
  }, [props.projectId]);

  return (
    <>
      <div id="proyect-tasks" className="mt-5">
        <div className="header mb-4">
          <h4>List of tasks</h4>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => setModalShow(true)}
          >
            Add Task
          </button>
        </div>

        {tasks ? (
          <>
            {tasks.length > 0 ? (
              <ul className="list-group list-group-flush">
                {tasks.map((task: any) => {
                  return (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center"
                      key={task._id}
                    >
                      {task.description}
                      <div className="options">
                        {task.completed ? (
                          <span
                            className="badge bg-success rounded-pill"
                            onClick={() =>
                              updateTask(task._id, props.projectId, props.token)
                            }
                          >
                            <AiOutlineSmile size={18} />
                          </span>
                        ) : (
                          <span
                            className="badge bg-warning rounded-pill"
                            onClick={() =>
                              updateTask(task._id, props.projectId, props.token)
                            }
                          >
                            <BiSad size={18} />
                          </span>
                        )}

                        <span
                          className="badge bg-danger rounded-pill"
                          onClick={() => handleClickDeleteTask(task._id)}
                        >
                          <AiFillDelete size={18} />
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <h6 className="text-danger text-center">
                No tasks were registered in the project.
              </h6>
            )}
          </>
        ) : (
          <div className="text-center mt-5 mb-5 w-100">
            <div className="spinner-border" role="status"></div>
          </div>
        )}
      </div>
      <FormTask
        show={modalShow}
        onHide={() => setModalShow(false)}
        token={props.token}
        projectid={props.projectId}
      />
    </>
  );
};
