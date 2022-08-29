const mongoose = require("mongoose");

const proyectoSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: [true, "Todos los proyectos tienen que tener asignados un ID."],
  },

  nombreProyecto: {
    type: String,
    required: [true, "El proyecto tiene que tener asginado un nombre."],
    minLength: [
      8,
      "El nombre del proyecto tiene que tener al menos 6 caracteres.",
    ],
    maxLength: [
      255,
      "El nombre del proyecto puede tener hasta 255 caracteres.",
    ],
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

module.exports = mongoose.model("Proyecto", proyectoSchema);
