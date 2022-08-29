const express = require("express");
const shortid = require("shortid");
const router = express.Router();
const Proyecto = require("./models/Proyecto.js");
const Tarea = require("./models/Tarea.js");

module.exports = () => {
  router.get("/get-proyecto", async (req, res) => {
    const proyecto = await Proyecto.find();
    res.send(proyecto);
  });

  router.post("/post-proyecto", async (req, res) => {
    const { nombreProyecto } = req.body;
    try {
      const proyecto = await Proyecto.create({
        _id: shortid.generate(),
        nombreProyecto: nombreProyecto,
      });
      proyecto.save();
      res.send("Proyecto creado");
    } catch (e) {
      res.send(e.message);
    }
  });

  router.delete("/delete-proyecto/:id", async (req, res) => {
    try {
      await Proyecto.deleteOne({ _id: req.params.id });
      res.send("Proyecto eliminado");
    } catch (e) {
      res.send("No se pudo eliminar el proyecto");
    }
  });

  router.get("/get-proyecto-id/:id", async (req, res) => {
    const proyectoId = await Proyecto.findOne({ _id: req.params.id });
    res.send(proyectoId);
  });

  router.post("/post-tarea/:nombreTarea/:proyectoid", async (req, res) => {
    console.log(req.params.proyectoid);
    try {
      const tarea = await Tarea.create({
        _id: shortid.generate(),
        nombreTarea: req.params.nombreTarea,
        _idProyecto: req.params.proyectoid,
      });
      tarea.save();
      res.send("Tarea creada");
    } catch (e) {
      res.send(e.message);
    }
  });

  router.patch("/patch-proyecto/:nombreproyecto", async (req, res) => {
    try {
      await Proyecto.updateOne({
        nombreProyecto: req.params.nombreproyecto,
        updatedAd: Date.now(),
      });
      res.send("Nombre del proyecto editado");
    } catch (e) {
      res.send(e.message);
    }
  });

  router.get("/get-tarea/:id", async (req, res) => {
    const tareas = await Tarea.find({ _idProyecto: req.params.id });
    res.send(tareas);
  });

  router.delete("/delete-tarea/:id", async (req, res) => {
    try {
      await Tarea.deleteOne({ _id: req.params.id });
      res.send("Tarea eliminada");
    } catch (e) {
      res.send("No se pudo eliminar la tarea");
    }
  });

  return router;
};
