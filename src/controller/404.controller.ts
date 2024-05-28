import { NextFunction, Request, Response } from "express";

export function NotFoundController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(404);
  res.render("base", {
    body: "page/404",
  });
}
