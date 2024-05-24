import { Request, Response } from "express";
import * as homeService from "../../service/home.service";
import { notes } from "../../types/notes.types";

export async function handleDashboardView(req: Request, res: Response) {
  const itemPerPage = 9;

  const viewData: any = {
    body: "page/dashboard/dashboard",
    scripts: [{ src: "/js/dashboard.js" }],
  };

  let numOfNotes: number;
  try {
    numOfNotes = await homeService.GetNumOfNotes();
  } catch (error) {
    viewData.error = (error as Error).message;
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
    notes = await homeService.LoadNotes(itemPerPage, (page - 1) * itemPerPage);
  } catch (error) {
    viewData.error = error;
    res.render("base", viewData);
    return;
  }

  if (page > 1) viewData.prevHref = `/dashboard?page=${page - 1}`;
  if (page < Math.ceil(numOfNotes / itemPerPage))
    viewData.nextHref = `/dashboard?page=${page + 1}`;

  viewData.notes = notes;
  res.render("base", viewData);
}

export async function deleteNote(req: Request, res: Response) {
  const { id } = req.params;

  try {
    await homeService.DeleteNotes(id);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("error ", error);
    res.status(500).json({ error: (error as Error).message });
  }
}
