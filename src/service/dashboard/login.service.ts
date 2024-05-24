import { prisma } from "../prisma.service";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export async function login(password: string): Promise<string | undefined> {
  try {
    const dbPassword = await prisma.option.findFirst({
      where: {
        Category: "DashboardPassword",
      },
    });

    if (!dbPassword) {
      console.log("db password option not found.");
      throw new Error("Something went wrong. (500)");
    }

    const match = await bcrypt.compare(password, dbPassword.Value);
    if (match) {
      const token = await jwt.sign(
        { message: "Hello rizal, welcome~" },
        process.env.JWT_SECRET!,
        { algorithm: "HS256" }
      );
      return btoa(token);
    }
    return undefined;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong. (500)");
  }
}
