import { Prisma } from "@prisma/client";
import { serviceResult } from "../types/common.types";
import { notes } from "../types/notes.types";
import { prisma } from "./prisma.service";
import { randomUUID } from "crypto";

export async function LoadNotes(
  limit: number,
  offset: number,
  published?: boolean
): Promise<notes[]> {
  try {
    const option: Prisma.noteFindManyArgs = {
      orderBy: {
        UpdatedAt: "desc",
      },
    };

    if (limit >= 0) option.take = limit;
    if (offset >= 0) option.skip = offset;
    if (published) option.where = { Published: published };

    const notes: notes[] = await prisma.note.findMany(option);

    return notes;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong. (500)");
  }
}

export async function GetNumOfNotes(published?: boolean): Promise<number> {
  try {
    const option: Prisma.noteCountArgs = {};
    if (published) option.where = { Published: published };

    const count = await prisma.note.count(option);
    return count;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong. (500)");
  }
}

export async function DeleteNotes(id: string) {
  try {
    await prisma.note.delete({
      where: {
        ID: id,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong. (500)");
  }
}

export async function GetNotesByID(id: string) {
  try {
    const note = await prisma.note.findFirst({
      where: {
        ID: id,
      },
    });
    return note;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong. (500)");
  }
}

export async function SaveNote(id: string, payload: notes): Promise<string> {
  try {
    if (id !== "new") {
      payload.UpdatedAt = new Date();
      await prisma.note.update({
        data: payload,
        where: {
          ID: id,
        },
      });
      return id;
    }

    payload.ID = randomUUID();
    await prisma.note.create({
      data: payload,
    });
    return payload.ID;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong. (500)");
  }
}

export function parseNoteContent(content: string) {
  const patterns = [
    {
      pattern: /@{{type:heading;content:([^}]+)}}/gm,
      replaceWith: `<h1 class='text-xl font-bold py-4'>$1</h1>`,
    },
    {
      pattern: /@{{type:listul;content:([^}]+)}}/gm,
      replaceWith: function (match: string, ...args: any[]): string {
        return `<ul class="list-disc px-8 py-2">${buildList(args[0])}</ul>`;
      },
    },
    {
      pattern: /@{{type:listol;content:([^}]+)}}/gm,
      replaceWith: function (match: string, ...args: any[]): string {
        return `<ol class="list-decimal px-8 py-2">${buildList(args[0])}</ol>`;
      },
    },
    {
      pattern: /@{{type:quote;content:([^}]+)}}/gm,
      replaceWith: `<div class="border-l-4 border-l-black/20 bg-black/10 p-2 my-2"><span class="font-light italic">$1</span></div>`,
    },
    {
      pattern: /@{{type:image;content:([^}]+)}}/gm,
      replaceWith: function (match: string, ...args: any[]): string {
        return buildImage(args[0]);
      },
    },
    {
      pattern: /@{{type:link;content:([^}]+)}}/gm,
      replaceWith: function (match: string, ...args: any[]): string {
        return buildLink(args[0]);
      },
    },
    {
      pattern: /@{{type:gist;content:([^}]+)}}/gm,
      replaceWith: `<iframe class="w-full" onload="this.height = this.contentWindow.document.documentElement.scrollHeight+10" srcdoc="<html><head></head><body><script src='$1'></script></body></html>"></iframe>`,
    },
    { pattern: /@{{type:br}}/gm, replaceWith: "<br>" },
    {
      pattern: /(^[^<\s].+[^>\s]$)/gm,
      replaceWith: "<p class='font-light'>$1</p>",
    },
    {
      pattern: /@{{type:bold;content:([^}]+)}}/gm,
      replaceWith: `<strong>$1</strong>`,
    },
    {
      pattern: /@{{type:italic;content:([^}]+)}}/gm,
      replaceWith: `<em>$1</em>`,
    },
    {
      pattern: /@{{type:underline;content:([^}]+)}}/gm,
      replaceWith: `<u>$1</u>`,
    },
    {
      pattern: /@{{type:block;content:([^}]+)}}/gm,
      replaceWith: `<span class="font-medium bg-black/10 px-1">$1</span>`,
    },
  ];

  let result = content;
  patterns.forEach((p) => {
    if (typeof p.replaceWith === "string")
      result = result.replace(p.pattern, p.replaceWith);
    else result = result.replace(p.pattern, p.replaceWith);
  });

  return result;
}

function buildList(content: String) {
  const contents = content.split("|");

  let result = "";
  contents.forEach((c) => {
    result += `<li>${c}</li>\n`;
  });

  return result;
}

function buildImage(content: String) {
  const contents = content.split("|");

  return `
        <div class="flex items-center flex-col gap-2 m-4">
            <img class="w-full object-cover rounded-lg" src="${contents[0]}" alt="${contents[2]}">
            <span class="text-center text-black/60 text-sm font-medium">${contents[1]}</span>
        </div>`;
}

function buildLink(content: String) {
  const contents = content.split("|");

  return `
        <a href="${contents[2]}" target="_blank" class="flex flex-col sm:flex-row sm:w-[30rem] gap-3 m-4 sm:mx-auto p-2 border-[1px] border-black/20 rounded-lg">
            <img class="w-full sm:w-32 h-32 object-cover rounded-lg" src="${contents[0]}" alt="${contents[1]}">
            <div class="flex flex-col gap-1 sm:pt-3">
                <h1 class="text-xl font-medium">${contents[3]}</h1>
                <p class="line-clamp-3 text-sm font-light">${contents[4]}</p>
            </div>
        </a>
        `;
}
