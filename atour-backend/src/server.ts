import * as cors from "cors";
import app from "./app";
import { initMongo } from "./db";
import Tour from "./routes/Tour";
import User from "./routes/User";

const PORT = 8081;

async function main() {
  const { db } = await initMongo();

  app.use(cors());

  app.use((req, res, next) => {
    res.locals.db = db;
    next();
  });

  app.use("/tour", Tour);
  app.use("/user", User);

  app.listen(PORT, () => {
    console.log("Express server listening on port " + PORT);
  });
}
main().then(() => console.log("OK"));
