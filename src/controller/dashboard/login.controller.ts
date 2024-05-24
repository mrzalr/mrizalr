import { Request, Response } from "express";
import * as loginService from "../../service/dashboard/login.service";
import * as jwt from "jsonwebtoken";

export async function handleLoginView(req: Request, res: Response) {
  const cookies = req.cookies;
  let token = "";
  for (const key in cookies) {
    if (atob(key) === "token") {
      token = atob(cookies[key].replace("=", ""));
      break;
    }
  }

  if (token !== "") {
    const jwtPayload = await jwt.verify(token, process.env.JWT_SECRET!);
    if (jwtPayload) {
      res.redirect("/dashboard");
      return;
    }
  }

  const viewData: any = {
    body: "page/dashboard/login",
    scripts: [{ src: "/js/login.js" }],
  };

  res.render("base", viewData);
}

export async function login(req: Request, res: Response) {
  const { password } = req.body;

  try {
    const result = await loginService.login(password);
    if (result) {
      res.status(200).json({ token: result });
      return;
    }
    res.status(200).json({ error: "password is not valid." });
  } catch (error) {
    console.log("error ", error);
    res.status(500).json({ error: (error as Error).message });
  }
}
