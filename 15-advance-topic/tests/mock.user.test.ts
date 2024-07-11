import { prismaMock } from "../setup_test/singleton";
import { getUser } from "../setup_test/function";

test("should return an array of users", async () => {
  prismaMock.user.findMany.mockResolvedValue([
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
  ]);

  await expect(getUser()).resolves.toEqual([
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
  ]);
});
