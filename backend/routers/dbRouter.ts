import { Router } from "https://deno.land/x/oak@v17.1.0/mod.ts";
import {
  addPreference,
  deletePreference,
  getPreference,
} from "../controllers/preferencesController.ts";
const dbRouter = new Router();

dbRouter
  .post("/preference/add", addPreference)
  .get("/preference/get", getPreference)
  .delete("/preference/delete", deletePreference);

export { dbRouter };
