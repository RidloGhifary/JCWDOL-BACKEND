import { Router } from "express";
import {
  createBranch,
  getBranches,
  getBranch,
  updateBranch,
  deleteBranch,
  getBranchStatus,
} from "../controller/branch-controller";

const router: Router = Router();

router.route("/branch/stats").get(getBranchStatus);
router.route("/branch").get(getBranches).post(createBranch);
router
  .route("/branch/:id")
  .get(getBranch)
  .patch(updateBranch)
  .delete(deleteBranch);

export default router;
