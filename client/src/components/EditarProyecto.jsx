import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import axios from "axios";

export const EditarProyecto = () => {
  // Constantes:
  const { id } = useParams();
  const [proyectoId, setProyectoId] = useState([]);
  const [tarea, setTarea] = useState([]);
  const nombreProyecto = useRef();
  const nombreTarea = useRef();
  const urlGetProyectoId = `http://${process.env.REACT_APP_BACKEND_URL}/get-proyecto-id`;
  const urlPostTarea = `http://${process.env.REACT_APP_BACKEND_URL}/post-tarea`;
  const urlPatchProyecto = `http://${process.env.REACT_APP_BACKEND_URL}/patch-proyecto`;
  const urlGetTarea = `http://${process.env.REACT_APP_BACKEND_URL}/get-tarea`;
  const urlDeleteTarea = `http://${process.env.REACT_APP_BACKEND_URL}/delete-tarea`;

  // Obtiene el proyecto por ID:
  const getProyectoId = async (e) => {
    try {
      await axios.get(`${urlGetProyectoId}/${id}`).then((res) => {
        setProyectoId(res.data);
      });
    } catch (e) {
      setProyectoId([]);
    }
  };

  // Crea una tarea:
  const postTarea = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${urlPostTarea}/${nombreTarea.current.value}/${proyectoId._id}`)
        .then((res) => {
          alert(res.data);
        });
    } catch (e) {
      alert("No se pudo guardar la tarea.");
    }
  };

  // Editar nombre proyecto:
  const patchProyecto = async (e) => {
    e.preventDefault();
    try {
      await axios
        .patch(`${urlPatchProyecto}/${nombreProyecto.current.value}`)
        .then((res) => {
          alert(res.data);
        });
    } catch (e) {
      alert("No se pudo modificar el nombre del proyecto");
    }
  };

  // Obtiene todas las tareas:
  const getTarea = async (e) => {
    try {
      await axios.get(`${urlGetTarea}/${id}`).then((res) => {
        setTarea(res.data);
      });
    } catch (e) {
      setTarea([]);
    }
  };

  // Elimina tareas:
  const deleteTarea = async (e, idTarea) => {
    e.preventDefault();
    try {
      await axios.delete(`${urlDeleteTarea}/${idTarea}`).then((res) => {
        alert(res.data);
      });
    } catch (e) {
      alert("No se pudo eliminar la tarea");
    }
  };

  // UseEffect:
  useEffect(() => {
    getProyectoId();
    getTarea();
  }, []);

  // Retorno del componente:
  return (
    <>
      <Helmet>
        <title>Nombre del Proyecto</title>
      </Helmet>

      {/* MODIFICAR NOMBRE DEL PROYECTO */}
      <div className="container mt-5">
        <h3 className="text-center">
          Modificar nombre del proyecto "{proyectoId.nombreProyecto}"
        </h3>
        <form onSubmit={(e) => patchProyecto(e)}>
          <div className="mb-3">
            <label htmlFor="nombreProyecto" className="form-label">
              Nombre del Proyecto:
            </label>
            <input
              type="text"
              className="form-control"
              name="nombreProyecto"
              placeholder={proyectoId.nombreProyecto}
              ref={nombreProyecto}
            ></input>
          </div>
          <button type="submit" className="btn btn-primary">
            Modificar
          </button>
        </form>
      </div>

      {/* AGREGAR TAREA EN EL PROYECTO */}
      <div className="container mt-5">
        <h3 className="text-center">
          Crear tarea para el proyecto "{proyectoId.nombreProyecto}"
        </h3>
        <form onSubmit={(e) => postTarea(e)}>
          <div className="mb-3">
            <label htmlFor="nombreTarea" className="form-label">
              Nombre de la tarea:
            </label>
            <input
              type="text"
              className="form-control"
              name="nombreTarea"
              ref={nombreTarea}
            ></input>
          </div>
          <button type="submit" className="btn btn-primary">
            Agregar
          </button>
        </form>
      </div>

      {/* ADMINISTRAR TAREAS */}
      <div className="container mt-5">
        <h3 className="text-center">
          Tareas del proyecto "{proyectoId.nombreProyecto}"
        </h3>
        <ul className="list-group">
          {tarea.map((tar) => {
            return (
              <li className="list-group-item" key={tar._id}>
                <form onSubmit={(e) => deleteTarea(e, tar._id)}>
                  <button
                    type="submit"
                    className="btn-close"
                    aria-label="Close"
                  ></button>{" "}
                  {tar.nombreTarea}
                </form>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
