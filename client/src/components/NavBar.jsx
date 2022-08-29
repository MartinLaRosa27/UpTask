import React from "react";
import { Routes, Route, NavLink, BrowserRouter } from "react-router-dom";
import { CrearProyecto } from "./CrearProyecto.jsx";
import { EditarProyecto } from "./EditarProyecto.jsx";
import { Proyectos } from "./Proyectos.jsx";

export const NavBar = () => {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container container-fluid">
          <NavLink to="/" className="navbar-brand font-italic">
            UpTask
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Mis Proyectos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/crear-proyecto" className="nav-link">
                  Crear Proyecto
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Proyectos />}></Route>
        <Route path="/crear-proyecto" element={<CrearProyecto />}></Route>
        <Route path="/editar-proyecto/:id" element={<EditarProyecto />}></Route>
        <Route
          path="*"
          element={<h1 className="mt-5 text-center">ERROR 404 :(</h1>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};
