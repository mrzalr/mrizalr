import { Express } from "express";
import * as homeController from "../controller/home.controller";
import * as noteController from "../controller/note.controller";
import * as aboutController from "../controller/about.controller";
import * as loginController from "../controller/dashboard/login.controller";
import * as dashboardController from "../controller/dashboard/dashboard.controller";
import * as writeController from "../controller/dashboard/write.controller";
import { auth } from "../middleware/auth";

export const registerRoutes = (app: Express) => {
  app.get("/", homeController.handleHomeView);
  app.get("/notes", noteController.handleNoteView);
  app.get("/about", aboutController.handleAboutView);
  app.get("/notes/:id", noteController.handleArticleView);

  app.get("/dashboard/login", loginController.handleLoginView);
  app.post("/dashboard/login", loginController.login);
  app.get("/dashboard", auth, dashboardController.handleDashboardView);
  app.delete("/dashboard/notes/:id", auth, dashboardController.deleteNote);

  app.post("/dashboard/write/parse", auth, writeController.parseNoteContent);
  app.get("/dashboard/write/:id", auth, writeController.handleWriteView);
  app.post("/dashboard/write/:id", auth, writeController.saveNote);
};
