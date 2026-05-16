import { Router } from "express";
import {
  getAllComponentes,
  getComponenteById,
  postComponente,
  putComponente,
  deleteComponente,
} from "../controllers/componente.controller.js";

const componente = Router();

componente.get("/", getAllComponentes);
componente.get("/:id", getComponenteById);
componente.post("/", postComponente);
componente.put("/:id", putComponente);
componente.delete("/:id", deleteComponente);

export default componente;
