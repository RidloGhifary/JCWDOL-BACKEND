import { Router } from "express";
import { likePost } from "../controller/like-post-controller";
import { AuthenticatedToken } from "../middleware/auth-middleware";

const router = Router();

router.post("/:postId/:userId", AuthenticatedToken, likePost);

export default router;
