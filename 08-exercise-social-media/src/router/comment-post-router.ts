import { Router } from "express";
import { createComment } from "../controller/comment-post-controller";
import { AuthenticatedToken } from "../middleware/auth-middleware";

const router: Router = Router();

router.post("/:postId", AuthenticatedToken, createComment);

export default router;
