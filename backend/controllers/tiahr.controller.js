import TiaHR from "../models/tiahr.model.js";
import mongoose from "mongoose";
import express from "express";

export const getAllTiaHR = async (req, res) => {
  console.log("obtiene todos los tiahr");
  try {
    const tiahrs = await TiaHR.find({}, { __v: 0 });
    if (tiahrs.length === 0) {
      return res.status(404).json({
        msg: "No se encontraron registros",
      });
    }
    return res.status(200).json({
      tiahrs,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error al obtener los registros",
    });
  }
};
export const getTiaHRById = async (req, res) => {
  console.log("TIAHR POR ID");
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: "ID no válido",
      });
    }

    const tiahr = await TiaHR.findById(id);
    if (!tiahr) {
      return res.status(404).json({
        msg: "Registro no encontrado",
      });
    }
    return res.status(200).json({
      tiahr,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al obtener el registro",
    });
  }
};
export const postTiaHR = async (req, res) => {
  console.log("POST TIAHR");
  const body = req.body;
  const tiahr = new TiaHR(body);
  try {
    await tiahr.save();
    return res.status(201).json({
      tiahr,
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
      msg: "Error al crear el registro",
    });
  }
};

export const putTiaHR = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: "ID no valido",
      });
    }
    const tiahr = await TiaHR.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!tiahr) {
      return res.status(404).json({
        msg: "Registro no encontrado",
      });
    }
    return res.status(200).json({
      tiahr,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al actualizar el registro",
    });
  }
};
export const deleteTiaHR = async (req, res) => {
  console.log("DELETE TIAHR");
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: "ID no válido",
      });
    }

    const tiahr = await TiaHR.findByIdAndDelete(id);
    if (!tiahr) {
      return res.status(404).json({
        msg: "Registro no encontrado",
      });
    }
    return res.status(200).json({
      msg: "Registro eliminado correctamente",
      tiahr,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al eliminar el registro",
    });
  }
};
