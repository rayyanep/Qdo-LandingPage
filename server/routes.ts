import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { storage } from "./storage";

const waitlistSchema = z.object({
  email: z.string().trim().toLowerCase().email("Please enter a valid email."),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  app.post("/api/waitlist", async (req: Request, res: Response) => {
    const parsed = waitlistSchema.safeParse(req.body);
    if (!parsed.success) {
      const message =
        parsed.error.issues[0]?.message ?? "Please enter a valid email.";
      return res.status(400).json({ ok: false, message });
    }

    const { email } = parsed.data;

    try {
      const existing = await storage.getWaitlistEntryByEmail(email);
      if (existing) {
        return res.status(200).json({
          ok: true,
          alreadyOnList: true,
          message: "You're already on the waitlist.",
        });
      }

      await storage.addWaitlistEmail(email);
      return res.status(201).json({
        ok: true,
        alreadyOnList: false,
        message: "You're on the list — we'll be in touch.",
      });
    } catch (err) {
      console.error("Failed to add to waitlist:", err);
      return res.status(500).json({
        ok: false,
        message: "Something went wrong. Please try again.",
      });
    }
  });

  return httpServer;
}
