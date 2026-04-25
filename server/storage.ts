import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

export interface WaitlistEntry {
  id: string;
  email: string;
  createdAt: Date;
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  addWaitlistEmail(email: string): Promise<WaitlistEntry>;
  getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined>;
  listWaitlistEntries(): Promise<WaitlistEntry[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private waitlist: Map<string, WaitlistEntry>;

  constructor() {
    this.users = new Map();
    this.waitlist = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async addWaitlistEmail(email: string): Promise<WaitlistEntry> {
    const normalized = email.trim().toLowerCase();
    const entry: WaitlistEntry = {
      id: randomUUID(),
      email: normalized,
      createdAt: new Date(),
    };
    this.waitlist.set(normalized, entry);
    return entry;
  }

  async getWaitlistEntryByEmail(
    email: string,
  ): Promise<WaitlistEntry | undefined> {
    return this.waitlist.get(email.trim().toLowerCase());
  }

  async listWaitlistEntries(): Promise<WaitlistEntry[]> {
    return Array.from(this.waitlist.values()).sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
    );
  }
}

export const storage = new MemStorage();
