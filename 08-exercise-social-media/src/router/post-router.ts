import { Router } from "express";
import {
  createPost,
  getPosts,
  getSinglePost,
} from "../controller/post-controller";
import { AuthenticatedToken } from "../middleware/auth-middleware";

const router = Router();

router.route("/posts").all(AuthenticatedToken).post(createPost);
router.route("/posts").get(getPosts);
router.route("/posts/:id").get(getSinglePost);

export default router;
