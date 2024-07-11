import request from "supertest";
import { PrismaClient } from "@prisma/client";

import app from "../app";

const prisma = new PrismaClient();

describe("GET /api/users", () => {
  const sampleUsers = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "bKqzL@example.com",
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      email: "bKqzL@example.com",
    },
  ];

  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    const users = await prisma.user.findMany();

    if (users.length === 0) {
      await prisma.user.createMany({
        data: sampleUsers,
      });
    }
  });

  afterEach(async () => {
    await prisma.user.deleteMany({ where: {} });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should return an array of users", async () => {
    const response = await request(app).get("/api/users");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      message: "OK",
      users: sampleUsers.map((item) => ({
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
      })),
    });
  });
});
