import React from "react";
import Modal from "react-bootstrap/Modal";
import { useUserContext } from "../../context/UserContext";
import { useParticipantContext } from "../../context/ParticipantContext";

export const FormAddParticipant = (props: {
  show: boolean;
  onHide: any;
  token: string;
  projectid: string;
}) => {
  const { searchUsers, getUserByUsername, setSearchUsers } = useUserContext();
  const { postParticipant } = useParticipantContext();

  const handleChangeSearchUser = (username: String) => {
    if (!username) {
      setSearchUsers([]);
    } else {
      getUserByUsername(username, props.projectid, props.token);
    }
  };

  const handleClickAddParticipant = async (
    userId: String,
    projectId: String
  ) => {
    const form = {
      userId,
      projectId,
    };
    await postParticipant(form, props.token);
    setSearchUsers(null);
    props.onHide(true);
  };

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
          Find user to add to project
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form method="POST">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Task Description"
              name="username"
              onChange={(e) => handleChangeSearchUser(e.target.value)}
            />
            <label>Search</label>
          </div>
        </form>
        {searchUsers && searchUsers.length > 0 && (
          <ul
            className="list-group"
            style={{ height: "150px", overflow: "hidden", overflowY: "scroll" }}
          >
            {searchUsers.map((searchUser: any) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={searchUser._id}
                >
                  {searchUser.username}
                  <button
                    type="button"
                    className="btn btn-success  rounded-pill"
                    onClick={() =>
                      handleClickAddParticipant(searchUser._id, props.projectid)
                    }
                  >
                    Add
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {searchUsers && searchUsers.length === 0 && (
          <p className="text-center text-danger text-uppercase">
            No users found
          </p>
        )}
      </Modal.Body>
    </Modal>
  );
};
