import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export async function auth(req: Request, res: Response, next: NextFunction) {
  const cookies = req.cookies;
  let token = "";
  for (const key in cookies) {
    if (atob(key) === "token") {
      token = atob(cookies[key].replace("=", ""));
      break;
    }
  }

  try {
    const jwtPayload = await jwt.verify(token, process.env.JWT_SECRET!);
    if (!jwtPayload) {
      res.redirect("/dashboard/login");
      return;
    }

    next();
  } catch (error) {
    res.redirect("/dashboard/login");
  }
}
