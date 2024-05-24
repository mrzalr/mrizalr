import { Request, Response } from "express";
import { navbarData } from "../types/view/navbar.types";
import * as homeService from "../service/home.service";
import { notes } from "../types/notes.types";

export async function handleHomeView(req: Request, res: Response) {
  const navbarData: navbarData = {
    menu: "about",
    menuLink: "/about",
  };

  const viewData: any = {
    body: "page/home",
    navbarData: navbarData,
  };

  let notes: notes[];
  try {
    notes = await homeService.LoadNotes(6, 0, true);
  } catch (error) {
    viewData.error = error;
    res.render("base", viewData);
    return;
  }

  viewData.notes = notes;
  res.render("base", viewData);
}
