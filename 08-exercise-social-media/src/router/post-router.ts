import { Router } from "express";
import { createPost } from "../controller/post-controller";
import { AuthenticatedToken } from "../middleware/auth-middleware";

const router = Router();

router.route("/posts").all(AuthenticatedToken).post(createPost);

export default router;
