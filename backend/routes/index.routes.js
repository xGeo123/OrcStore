import ejemplo from "./ejemplo.routes.js";
import tiahr from "./tiahr.routes.js";
import componente from "./componente.routes.js";

import { Router } from "express";

const indexRoutes = Router();

// local
indexRoutes.use("/ejemplo", ejemplo);
indexRoutes.use("/tiahr", tiahr);
indexRoutes.use("/componentes", componente);

export default indexRoutes;
