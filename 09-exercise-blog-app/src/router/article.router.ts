import { Router } from "express";

import {
  getAllArticles,
  createArticle,
  deleteArticle,
  getSingleArticle,
  updateArticle,
} from "../controller/article.controller";

const router: Router = Router();

router.route("/").get(getAllArticles).post(createArticle);
router
  .route("/:id")
  .get(getSingleArticle)
  .patch(updateArticle)
  .delete(deleteArticle);

export default router;
