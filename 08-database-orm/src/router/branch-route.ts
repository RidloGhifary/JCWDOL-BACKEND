import { Router } from "express";
import { createBranch, getBranches } from "../controller/branch-controller";

const router: Router = Router();

router.route("/branch").get(getBranches).post(createBranch);

export default router;
