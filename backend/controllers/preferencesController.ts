import preferences from "../config/db.ts";
import { ObjectId } from "npm:mongodb@5.6.0";
import { Context } from "https://deno.land/x/oak/mod.ts";
import console from "node:console";


async function addPreference( ctx : Context){
    try {
        const body = ctx.request.body.json();
        const result = await preferences.insertOne(body);
        console.log(result);
    } catch {
        console.error("couldn't add preference");
    }
}

export { addPreference };