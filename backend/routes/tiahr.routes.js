import { Router } from "express";
import {
  getAllTiaHR,
  getTiaHRById,
  postTiaHR,
  putTiaHR,
  deleteTiaHR,
} from "../controllers/tiahr.controller.js";
const tiahr = Router();
tiahr.get("/", getAllTiaHR);
tiahr.get("/:id", getTiaHRById);

tiahr.put("/:id", putTiaHR);

tiahr.post("/", postTiaHR);

tiahr.delete("/:id", deleteTiaHR);

export default tiahr;
