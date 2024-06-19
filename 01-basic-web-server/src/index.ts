import http, { IncomingMessage, ServerResponse } from "http";
import { users } from "./data/data.js";

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "GET") {
      if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write("Hello from nodejs with typescript");
        res.end();
      }

      if (req.url === "/users") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(users));
        res.end();
      }

      if (req.url === "/about") {
        res.writeHead(200, {
          "Content-Type": "text/html",
        });
        res.write("<p>About</p>");
        res.end();
      }
    }

    if (req.method === "POST") {
      if (req.url === "/register") {
        let body = "";

        req.on("data", (chunk) => {
          body += chunk.toString();
        });

        req.on("end", () => {
          const userData = JSON.parse(body);
          res.writeHead(201, {
            "Content-Type": "application/json",
          });
          res.end(
            JSON.stringify({ userData, message: "User has been created" })
          );
        });
      }
    }

    if (req.method === "PUT") {
      if (req.url === "/update-user/1") {
        const userId = req.url?.split("/")[2];
        const user = users.find(
          (user: { id: number; name: string; age: number }) =>
            user.id !== Number(userId)
        );

        if (user) {
          const updatedUser = {
            id: Number(userId),
            name: "Jonathan",
            age: user.age,
          };
          const index = users.indexOf(user);
          users[index] = updatedUser;
          res.writeHead(200, {
            "Content-Type": "application/json",
          });
          res.end(
            JSON.stringify({ updatedUser, message: "User has been updated" })
          );
        }
      }
    }

    if (req.method === "DELETE") {
      if (req.url === "/delete-user/1") {
        const userId = parseInt(req.url.split("/")[2]);
        const user = users.find((user) => {
          return user.id !== userId;
        });
        if (user) {
          const index = users.indexOf(user);
          users.slice(index, 1);
          res.writeHead(200, {
            "Content-Type": "application/json",
          });
          res.end(
            JSON.stringify({
              message: "User has been deleted",
            })
          );
        } else {
          res.writeHead(404, {
            "Content-Type": "application/json",
          });
          res.end(JSON.stringify({ message: "User not found" }));
        }
      }
    }
  }
);

const port = process.env.port || 3200;

server.listen(port, () => console.log(`Server running on port: ${port}`));
