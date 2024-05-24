import { Request, Response } from "express";
import { navbarData } from "../types/view/navbar.types";
import { notes } from "../types/notes.types";
import * as homeService from "../service/home.service";

export async function handleNoteView(req: Request, res: Response) {
  const itemPerPage = 9;
  const navbarData: navbarData = {
    title: "notes.",
    menu: "about",
    menuLink: "/about",
  };

  const viewData: any = {
    body: "page/notes",
    pageTitle: "notes | mrizalr.",
    navbarData,
  };

  let numOfNotes: number;
  try {
    numOfNotes = await homeService.GetNumOfNotes(true);
  } catch (error) {
    viewData.error = error;
    res.render("base", viewData);
    return;
  }

  let page: number = Number(req.query["page"]);
  if (page < 1) page = 1;
  if (page > Math.ceil(numOfNotes / itemPerPage))
    page = Math.ceil(numOfNotes / itemPerPage);
  page = page || 1;

  let notes: notes[];
  try {
    notes = await homeService.LoadNotes(
      itemPerPage,
      (page - 1) * itemPerPage,
      true
    );
  } catch (error) {
    viewData.error = error;
    res.render("base", viewData);
    return;
  }

  if (page > 1) viewData.prevHref = `/notes?page=${page - 1}`;
  if (page < Math.ceil(numOfNotes / itemPerPage))
    viewData.nextHref = `/notes?page=${page + 1}`;

  viewData.notes = notes;
  res.render("base", viewData);
}

export async function handleArticleView(req: Request, res: Response) {
  const { id } = req.params;

  const navbarData: navbarData = {
    title: "mrizalr.",
    menu: "notes",
    menuLink: "/notes",
  };

  const viewData: any = {
    body: "page/article",
    navbarData,
  };

  try {
    const note = await homeService.GetNotesByID(id);
    if (!note) {
      viewData.error = new Error(`Note with id ${id} not found. (404)`).message;
      res.render("base", viewData);
      return;
    }

    note.Content = homeService.parseNoteContent(note.Content);
    viewData.note = note;
    viewData.pageTitle = `${note.Title} | mrizalr.`;
  } catch (error) {
    viewData.error = (error as Error).message;
    res.render("base", viewData);
    return;
  }

  res.render("base", viewData);
}
