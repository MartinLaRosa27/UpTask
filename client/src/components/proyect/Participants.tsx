import React from "react";
import Swal from "sweetalert2";
import { AiFillDelete } from "react-icons/ai";
import { FormAddParticipant } from "./FormAddParticipant";
import { useParticipantContext } from "../../context/ParticipantContext";

export const Participants = (props: {
  token: string;
  projectId: string;
  project: any;
  user: any;
}) => {
  const { participants, getParicipants, deleteParticipant } =
    useParticipantContext();
  const [modalShow, setModalShow] = React.useState<boolean | any>(false);

  const handleClickRemoveParticipant = (participantId: String) => {
    Swal.fire({
      title: "Are you sure you want to remove the participant of the project?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteParticipant(participantId, props.projectId, props.token);
      }
    });
  };

  React.useEffect(() => {
    getParicipants(props.projectId, props.token);
  }, [props.projectId]);

  return (
    <>
      <div id="proyect-participants" className="mt-5">
        <div className="header mb-4">
          <h4>List of participants</h4>
          {props.project.userId === props.user._id && (
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => setModalShow(true)}
            >
              Add participants
            </button>
          )}
        </div>

        {participants ? (
          <>
            {participants.length > 0 && (
              <ul className="list-group list-group-flush">
                {participants.map((participant: any) => {
                  return (
                    <div key={participant._id}>
                      {participant._id === props.project.userId ? (
                        <li className="list-group-item d-flex justify-content-between align-items-center fw-bold">
                          {participant.userId} <small>Project Admin.</small>
                        </li>
                      ) : (
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          {participant.userId}
                          {props.project.userId === props.user._id && (
                            <div className="options">
                              <span
                                className="badge bg-danger rounded-pill"
                                onClick={() =>
                                  handleClickRemoveParticipant(participant._id)
                                }
                              >
                                <AiFillDelete size={18} />
                              </span>
                            </div>
                          )}
                        </li>
                      )}
                    </div>
                  );
                })}
              </ul>
            )}

            {participants.length <= 0 && (
              <h6 className="text-danger text-center">
                You are the only participant and administrator of the project. .
              </h6>
            )}
          </>
        ) : (
          <div className="text-center mt-5 mb-5 w-100">
            <div className="spinner-border" role="status"></div>
          </div>
        )}
      </div>
      <FormAddParticipant
        show={modalShow}
        onHide={() => setModalShow(false)}
        token={props.token}
        projectid={props.projectId}
      />
    </>
  );
};
