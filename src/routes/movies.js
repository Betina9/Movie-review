import express from "express";
import {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
} from "../controllers/moviesController.js";
import { addReview, getAllReviews } from "../controllers/reviewsController.js";

const router = express.Router();

router.get("/", getAllMovies);

router.get("/:id", getMovieById);

router.post("/", addMovie);

router.put("/:id", updateMovie);

router.post("/:id/reviews", addReview);

router.get("/:id/reviews", getAllReviews);

export default router;
