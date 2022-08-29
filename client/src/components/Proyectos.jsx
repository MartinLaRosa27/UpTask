import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { NavLink } from "react-router-dom";

export const Proyectos = () => {
  const [proyecto, setProyecto] = useState([]);
  const urlGetProyecto = `http://${process.env.REACT_APP_BACKEND_URL}/get-proyecto`;
  const urlDeleteProyecto = `http://${process.env.REACT_APP_BACKEND_URL}/delete-proyecto`;

  const getProyecto = async (e) => {
    try {
      await axios.get(urlGetProyecto).then((res) => {
        setProyecto(res.data);
      });
    } catch (e) {
      setProyecto([]);
    }
  };

  const deleteProyecto = async (e, id) => {
    try {
      await axios.delete(`${urlDeleteProyecto}/${id}`).then((res) => {
        alert(res.data);
      });
      window.location.reload();
    } catch (e) {
      alert("No se pudo eliminar el proyecto");
    }
  };

  useEffect(() => {
    getProyecto();
  }, []);

  return (
    <>
      <Helmet>
        <title>UpTaskV2</title>
      </Helmet>

      <div className="container mt-5">
        {/* Todos los proyectos */}
        <ul className="list-group">
          {proyecto.map((pro) => {
            return (
              <li className="list-group-item" key={pro._id}>
                <form onSubmit={(e) => deleteProyecto(e, pro._id)}>
                  <button
                    type="submit"
                    className="btn-close"
                    aria-label="Close"
                  ></button>{" "}
                  <NavLink
                    to={`/editar-proyecto/${pro._id}`}
                    className="text-uppercase text-decoration-none text-dark"
                  >
                    {pro.nombreProyecto}
                  </NavLink>
                </form>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
