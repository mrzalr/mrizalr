import express from "express";
import { registerRoutes } from "./route/route";
import * as dotenv from "dotenv";
import { prisma } from "./service/prisma.service";
import cookieParser from "cookie-parser";

try {
  (async function () {
    await prisma.$connect();

    const app = express();
    app.set("view engine", "ejs");
    app.use(express.static("public"));
    app.use(express.json());
    app.use(cookieParser());
    registerRoutes(app);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is listening on port :${port}`);
    });
  })();
} catch (error) {
  console.log(error);
}
