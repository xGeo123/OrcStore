import Componente from "../models/componente.model.js";
import mongoose from "mongoose";

export const getAllComponentes = async (req, res) => {
  try {
    const componentes = await Componente.find({}, { __v: 0 });
    if (componentes.length === 0) {
      return res.status(404).json({
        msg: "No se encontraron componentes",
      });
    }
    return res.status(200).json({
      componentes,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al obtener los componentes",
    });
  }
};

export const getComponenteById = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: "ID no válido",
      });
    }
    const componente = await Componente.findById(id);
    if (!componente) {
      return res.status(404).json({
        msg: "Componente no encontrado",
      });
    }
    return res.status(200).json({
      componente,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al obtener el componente",
    });
  }
};

export const postComponente = async (req, res) => {
  const body = req.body;
  const componente = new Componente(body);
  try {
    await componente.save();
    return res.status(201).json({
      componente,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        msg: "Error de validación",
        errors,
      });
    }
    return res.status(500).json({
      msg: "Error al crear el componente",
    });
  }
};

export const putComponente = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: "ID no válido",
      });
    }
    const componente = await Componente.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!componente) {
      return res.status(404).json({
        msg: "Componente no encontrado",
      });
    }
    return res.status(200).json({
      componente,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        msg: "Error de validación",
        errors,
      });
    }
    return res.status(500).json({
      msg: "Error al actualizar el componente",
    });
  }
};

export const deleteComponente = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: "ID no válido",
      });
    }
    const componente = await Componente.findByIdAndDelete(id);
    if (!componente) {
      return res.status(404).json({
        msg: "Componente no encontrado",
      });
    }
    return res.status(200).json({
      msg: "Componente eliminado correctamente",
      componente,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al eliminar el componente",
    });
  }
};
