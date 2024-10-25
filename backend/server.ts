import { Application, Router, type RouterContext } from "https://deno.land/x/oak@v17.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { load } from "jsr:@std/dotenv";
import { Track } from "../models/Album.ts";
import console from "node:console";
const clientID = "3d979a6ac63b405a8840157f354f8238";
const clientSecret = "7b3384f318de4e639df948d94ebfda62";
const redirect_uri = "http://localhost:8080/callback";
let artistUserInput : string | " " = " ";
let globalAccessToken: string | null = null;
const router = new Router();
const app = new Application();
const port = 8080;
console.log(`Server running on http://localhost:${port}`);

console.log(await load({ export: true }));
console.log(Deno.env.get("CLIENTID"));

app.use(oakCors({
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE, OPTIONS", // Specify allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
}));


app.listen({ port: port });



router.post("/artistname", async (ctx : RouterContext<R, P, S>) => {

  const body = await ctx.request.body.json();
  artistUserInput = body.data;
  const artistUrlEncoded = encodeURIComponent(artistUserInput)
  const type = "artist";
  const queryString = `https://api.spotify.com/v1/search?q=${artistUrlEncoded}&type=${type}`;
  console.log(queryString);
  const artistData = await fetch(queryString, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + globalAccessToken, 
    }
  });

  const artistSearch = await artistData.json();
  const artistID = artistSearch.artists.items[0].id;

  const artistTop5Tracks = await fetch ( `https://api.spotify.com/v1/artists/${artistID}/top-tracks`, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + globalAccessToken, 
    }
  });
  try{
    ctx.response.body = artistTop5Tracks;
  } catch(_error) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Invalid request" };
  }
  const artistAlbumsJson = await artistTop5Tracks.json();
  
  const trackSet : Track[] = [];
  for (const track of artistAlbumsJson.tracks) {
    trackSet.push(new Track(track.album, track.id, track.name, track.release_date, track.type, track.uri));
    console.log(track.name);
  }
  ctx.response.body = { tracks : trackSet};
  
});

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
  const accessToken : unknown = await tokenResult.json();
  console.log(accessToken.access_token);
  globalAccessToken = accessToken.access_token;
  await ctx.response.redirect('http://localhost:3000/game');
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

app.use(router.routes());
app.use(router.allowedMethods());