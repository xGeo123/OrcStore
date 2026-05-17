import componente from "./componente.routes.js";
import { Router } from "express";

const indexRoutes = Router();

indexRoutes.use("/componentes", componente);

export default indexRoutes;
