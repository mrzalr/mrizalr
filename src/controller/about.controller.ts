import { Request, Response } from "express";
import { navbarData } from "../types/view/navbar.types";

export async function handleAboutView(req: Request, res: Response) {
  const educations = [
    {
      image: "/img/um.jpg",
      title: "S1 Teknik Informatika",
      instance: "Universitas Negeri Malang",
      year: "2016 - 2021",
      url: "https://um.ac.id",
    },
  ];

  const experiences = [
    {
      image: "/img/runsystem.jpg",
      title: "Backend Engineer",
      instance: "Runsystem",
      year: "08/2023 - present",
      url: "https://runsystem.id",
    },
    {
      image: "/img/mv.jpeg",
      title: "Unity Engineer (VR)",
      instance: "Machine Vision",
      year: "03/2021 - 05/2023",
      url: "https://machinevision.global",
    },
    {
      image: "/img/rakamin.jpg",
      title: "Backend Engineer Trainee",
      instance: "Rakamin Virtual Internship",
      year: "01/2023",
      url: "https://www.rakamin.com/virtual-internship-experience",
    },
    {
      image: "/img/dts.jpg",
      title: "Backend Engineer Trainee",
      instance: "Digitalent Scholarship Kominfo",
      year: "11/2022",
      url: "https://digitalent.kominfo.go.id",
    },
  ];
  const navbarData: navbarData = {
    menu: "notes",
    menuLink: "/notes",
    title: "about",
  };

  const viewData: any = {
    body: "page/about",
    pageTitle: "about | mrizalr.",
    navbarData,
    educations,
    experiences,
  };
  res.render("base", viewData);
}
