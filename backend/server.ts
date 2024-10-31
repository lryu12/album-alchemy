import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { Application } from "https://deno.land/x/oak@v12.1.0/application.ts";
import  dbRouter  from './routers/dbRouter.ts';
import  spotifyRouter from './routers/spotifyRouter.ts';
import console from "node:console";

const app = new Application();
const port = 8080;
console.log(`Server running on http://localhost:${port}`);

app.use(oakCors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization"], 
}));

app.listen({ port: port });
app.use(spotifyRouter.routes());
app.use(spotifyRouter.allowedMethods());
app.use(dbRouter.routes());
app.use(dbRouter.allowedMethods());

