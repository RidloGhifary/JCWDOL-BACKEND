import { Router } from "express";
import { createPost } from "../controller/post-controller";

const router = Router();

router.route("/posts").post(createPost);

export default router;
