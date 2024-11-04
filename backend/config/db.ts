import { MongoClient } from "npm:mongodb@5.6.0";
import console from "node:console";
import "jsr:@std/dotenv/load";
import type { Document } from "../../../../Library/Caches/deno/npm/registry.npmjs.org/bson/5.5.1/bson.d.ts";

const MONGO_URI = Deno.env.get("MONGO_URI");

if (!MONGO_URI) {
  console.error("MONGO_URI is not set");
  Deno.exit();
}

const client = new MongoClient(MONGO_URI);

try {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log("Connected to MongoDB");
} catch (err) {
  console.error("Error connecting to MongoDB", err);
  Deno.exit(1);
}

const db = client.db("AlbumAlchemy");
const preferences: Document = db.collection("preferences");

export { db, preferences };
