import mongoose from "mongoose";
const tiahRSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: false,
  },
  apellido: {
    type: String,
    required: true,
  },
  contacto: {
    type: [String],
    required: false,
  },
  puesto: {
    type: String,
    required: true,
  },
  departamento: {
    type: String,
    required: true,
  },
});

const TiaHR = mongoose.model("TiaHR", tiahRSchema);
export default TiaHR;
