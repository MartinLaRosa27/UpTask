import React, { useRef } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

export const CrearProyecto = () => {
  const nombreProyecto = useRef();
  const urlPostProyecto = `http://${process.env.REACT_APP_BACKEND_URL}/post-proyecto`;

  const postProyecto = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(urlPostProyecto, { nombreProyecto: nombreProyecto.current.value })
        .then((res) => {
          alert(res.data);
        });
      window.location.reload();
    } catch (e) {
      alert("No se pudo crear el proyecto.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Crear Proyecto | UpTaskV2</title>
      </Helmet>
      <div className="container mt-5">
        <form onSubmit={(e) => postProyecto(e)}>
          <div className="mb-3">
            <label htmlFor="nombreProyecto" className="form-label">
              Nombre del Proyecto:
            </label>
            <input
              type="text"
              className="form-control"
              name="nombreProyecto"
              ref={nombreProyecto}
            ></input>
            <div className="form-text">
              El nombre del proyecto se va a poder modificar posteriormente.
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Crear
          </button>
        </form>
      </div>
    </>
  );
};
