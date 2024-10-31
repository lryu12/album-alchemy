import { db, collection} from '../config/db.ts'
import { Router } from "https://deno.land/x/oak/mod.ts";
import { addPreference } from "../controllers/preferencesController.ts";
const dbRouter = new Router();

dbRouter
  .post("/items", addPreference);
  
export default dbRouter;


