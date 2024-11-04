import { preferences } from "../config/db.ts";
import { ObjectId } from "npm:mongodb@5.6.0";
import { Context } from "https://deno.land/x/oak/mod.ts";
import console from "node:console";

async function addPreference(ctx: Context): Promise<any> {
  try {
    const body = await ctx.request.body.json();
    const result = await preferences.insertOne({
      artist_name: body.artist_name,
    });
    ctx.response.body = {
        message: "Successfully Added Artist!"
    }

    console.log(result);
  } catch {
    console.error("couldn't add preference");
  }
}

async function getPreference(ctx: Context): Promise<any> {
  try {
    const foundData = await preferences.find();
    const sendThis = JSON.stringify(await foundData.toArray());
    const parsedJSON = JSON.parse(sendThis);
    const artistNames = await parsedJSON.map(artist => artist.artist_name);
    ctx.response.body = artistNames;
  } catch {
    console.error("couldn't get preference");
  }
}

async function deletePreference(ctx: Context): Promise<any> {
  try {
    const reqBody = await ctx.request.body.json();
    ctx.response.body = await preferences.deleteOne({
      artist_name: reqBody.artist_name,
    });
    console.log(reqBody.artist_name);
  } catch {
    console.error("couldn't get preference");
  }
}

export { addPreference, deletePreference, getPreference };
