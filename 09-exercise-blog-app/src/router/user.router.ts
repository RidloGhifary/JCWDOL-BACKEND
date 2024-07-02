import { Router } from "express";
import { getAllUsers } from "../controller/user.controller";

const router: Router = Router();

router.route("/").get(getAllUsers);

export default router;
