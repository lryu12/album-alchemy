import { Router } from "https://deno.land/x/oak@v17.1.0/mod.ts";
import console from "node:console";
import "jsr:@std/dotenv/load";
const redirect_uri = "http://localhost:8080/callback";
let artistUserInput: string | " " = " ";
let globalAccessToken: string | null = null;
const spotifyRouter = new Router();

let artistID: string | null = null;

const queryParams = new URLSearchParams({
  response_type: "code",
  client_id: Deno.env.get("CLIENTID"),
  redirect_uri: "http://localhost:8080/callback",
}).toString();

spotifyRouter.get("/login", (ctx) => {
  // todo: setup state to prevent cross origin attacks
  // const state = generateRandomString(16);
  ctx.response.redirect(
    "https://accounts.spotify.com/authorize?" + queryParams,
  );
})
  .get("/callback", async (ctx) => {
    const code = ctx.request.url.searchParams.get("code");
    const tokenResult = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " +
          btoa(`${Deno.env.get("CLIENTID")}:${Deno.env.get("CLIENTSECRET")}`),
      },
      body: new URLSearchParams({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      }),
      json: true,
    });
    const accessToken = await tokenResult.json() as {
      access_token: string;
      token_type: string;
      scope: string;
      expires_in: number;
      refresh_token: string;
    };
    globalAccessToken = accessToken.access_token;
    ctx.response.redirect("http://localhost:3000/game");
  });

spotifyRouter.post("/artistname", async (ctx: RouterContext<R, P, S>) => {
  const lol = await ctx.request.body;
  const body = await lol.json();
  console.log(body);
  artistUserInput = body.data;
  const artistUrlEncoded = encodeURIComponent(artistUserInput);
  const queryString =
    `https://api.spotify.com/v1/search?q=${artistUrlEncoded}&type=artist`;
  const artistData = await fetch(queryString, {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Authorization": "Bearer " + globalAccessToken,
    },
  });
  const artistSearch: any = await artistData.json();
  artistID = artistSearch.artists.items[0].id;
  if (artistID) {
    ctx.response.body = { message: "POST request successful" };
  } else {
    ctx.response.body = { message: "POST request unsuccessful" };
  }
})
  .get("/getalbum", async (ctx) => {
    if (artistID != null) {
      try {
        const albumsResponse = await fetch(
          `https://api.spotify.com/v1/artists/${artistID}/albums`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": "Bearer " + globalAccessToken,
            },
          },
        );

        if (!albumsResponse.ok) {
          ctx.response.status = albumsResponse.status;
          ctx.response.body = { error: "Failed to fetch albums from Spotify" };
          console.error("Error fetching albums:", albumsResponse.statusText);
          return;
        }

        const albumObjects: any = await albumsResponse.json();
        ctx.response.body = albumObjects; // Assuming albumObjects has the desired structure
      } catch (error) {
        ctx.response.status = 500; // Internal server error
        ctx.response.body = { error: "Internal Server Error" };
        console.error("Error fetching albums:", error);
      }
    } else {
      ctx.response.status = 400; // Bad Request
      ctx.response.body = { error: "artistID cannot be found" };
      console.error("artistID cannot be found");
    }
  });

export { spotifyRouter };
