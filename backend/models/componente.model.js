import mongoose from "mongoose";

const componenteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
    enum: ["CPU", "GPU", "RAM", "Almacenamiento", "Placa Madre", "Fuente de Poder", "Refrigeración", "Gabinete", "Monitor", "Otro"],
  },
  precio: {
    type: Number,
    required: true,
    min: 0,
  },
  descripcion: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
    required: false,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
});

const Componente = mongoose.model("Componente", componenteSchema);
export default Componente;
