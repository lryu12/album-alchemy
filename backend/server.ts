import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { spotifyRouter } from "./routers/spotifyRouter.ts";
import console from "node:console";
import { dbRouter } from "./routers/dbRouter.ts";

const app = new Application();
const port = 8080;
console.log(`Server running on http://localhost:${port}`);

app.use(oakCors({
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(spotifyRouter.routes());
app.use(spotifyRouter.allowedMethods());
app.use(dbRouter.routes());
app.use(dbRouter.allowedMethods());

app.listen({ port: port });
