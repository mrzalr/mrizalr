import { Request, Response } from "express";
import * as homeService from "../../service/home.service";
import { notes } from "../../types/notes.types";

export async function handleWriteView(req: Request, res: Response) {
  const { id } = req.params;

  const viewData: any = {
    body: "page/dashboard/write",
    scripts: [{ src: "/js/write.js" }, { src: "/js/editor.js" }],
  };

  let note: notes = {
    ID: id,
    Title: "Write note title here~",
    ImageUrl: null,
    Published: false,
    Content: "",
    CreatedAt: null,
    UpdatedAt: null,
  };
  if (id !== "new") {
    try {
      const _note = (await homeService.GetNotesByID(id)) as notes;
      if (_note) note = _note;
    } catch (error) {
      viewData.error = (error as Error).message;
    }
  }

  viewData.note = note;
  res.render("base", viewData);
}

export async function saveNote(req: Request, res: Response) {
  const { id } = req.params;
  const payload = req.body;

  try {
    const _id = await homeService.SaveNote(id, payload as notes);
    res.status(201).send({ id: _id });
  } catch (error) {
    res.status(500).send({ error: (error as Error).message });
  }
}

export function parseNoteContent(req: Request, res: Response) {
  const { content } = req.body;

  const parsed = homeService.parseNoteContent(content);
  res.status(200).json({ result: parsed });
}
