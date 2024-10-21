import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import console from "node:console";
const router = new Router();
const clientID = "3d979a6ac63b405a8840157f354f8238";
const clientSecret = "7b3384f318de4e639df948d94ebfda62";
const redirect_uri = "http://localhost:8080/callback";
const app = new Application();
const port = 8080;

app.use(router.routes());
app.use(router.allowedMethods());
console.log(`Server running on http://localhost:${port}`);

app.listen({ port: port });

app.use(
  oakCors({
    origin: ["http://localhost:3000"], // Specify the allowed origins
  })
);

router.get("/", (ctx) => {
  ctx.response.body = `<!DOCTYPE html>
    <html>
      <head><title>Hello oak!</title><head>
      <body>
        <h1>Hello oak!</h1>
      </body>
    </html>
  `;
});



router.post("/artistname", async (ctx) => {

    try{
    const body = await ctx.request.body.json();
    ctx.response.status = 200;
    ctx.response.body = body;
  } catch(_error) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Invalid request" };
  }
  
});



let globalAccessToken: string | null = null;

router.get("/callback", async (ctx) => {
  const code = ctx.request.url.searchParams.get("code");
  const tokenResult = await fetch("https://accounts.spotify.com/api/token",{
    method: "POST",
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${clientID}:${clientSecret}`), 
    },
    body: new URLSearchParams({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    }),
    json:true

  });
  console.log(tokenResult);
  const accessToken = await tokenResult.json();
  console.log(accessToken.access_token);
  globalAccessToken = accessToken.access_token;
  
});


const queryParams = new URLSearchParams({
  response_type: 'code',
  client_id: clientID,
  redirect_uri: "http://localhost:8080/callback",
}).toString(); 


router.get('/login', async (ctx) => {
  // todo: setup state to prevent cross origin attacks
  // const state = generateRandomString(16);
  await ctx.response.redirect('https://accounts.spotify.com/authorize?' + queryParams);
});

// get artists by 
// router.get("https://api.spotify.com/v1/artists/{id}", )


