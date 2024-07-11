import express, { Request, Response, Router } from "express";
import axios from "axios";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon");

    return res.status(200).json(data.results);
  } catch (error) {
    res.status(500).send({
      message: "OK",
      users: JSON.stringify(error),
    });
  }
});

export default router;
