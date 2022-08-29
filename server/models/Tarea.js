const mongoose = require("mongoose");

const tareaSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: [true, "Todos los proyectos tienen que tener asignados un ID."],
  },

  nombreTarea: {
    type: String,
    required: [true, "La tarea tiene que tener asignado un nombre."],
    minLength: [
      8,
      "El nombre de la tarea tiene que tener al menos 6 caracteres.",
    ],
    maxLength: [255, "El nombre de la tarea puede tener hasta 255 caracteres."],
  },

  _idProyecto: {
    type: String,
    required: [
      true,
      "Todas las tareas tienen que tener asignadas un ID de un proyecto.",
    ],
    immutable: [true, "No se puede modificar el proyecto asignado a la tarea."],
  },

  createdAd: {
    type: Date,
    immutable: [
      true,
      "La fecha de creación del proyecto no se puede modificar.",
    ],
    default: () => Date.now(),
  },

  updatedAd: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("Tarea", tareaSchema);
