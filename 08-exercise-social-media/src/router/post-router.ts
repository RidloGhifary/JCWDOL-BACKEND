import { Router } from "express";
import {
  createPost,
  getPosts,
  getSinglePost,
  updatePost,
  deletePost,
} from "../controller/post-controller";
import { AuthenticatedToken } from "../middleware/auth-middleware";

const router = Router();

router.route("/").get(getPosts);
router.route("/").all(AuthenticatedToken).post(createPost);
router
  .route("/:id")
  .all(AuthenticatedToken)
  .get(getSinglePost)
  .patch(updatePost)
  .delete(deletePost);

export default router;
