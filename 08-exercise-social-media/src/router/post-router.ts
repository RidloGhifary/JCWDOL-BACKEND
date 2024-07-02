import { Router } from "express";
import {
  createPost,
  getPosts,
  getSinglePost,
  updatePost,
} from "../controller/post-controller";
import { AuthenticatedToken } from "../middleware/auth-middleware";

const router = Router();

router.route("/posts").get(getPosts);
router.route("/posts").all(AuthenticatedToken).post(createPost);
router
  .route("/posts/:id")
  .all(AuthenticatedToken)
  .get(getSinglePost)
  .patch(updatePost);

export default router;
