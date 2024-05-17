import express from "express";
const router = express.Router();
import {
  getAllQuestions,
  createCollection,
  getCollectionById,
} from "../controllers/questionController.js";
import { collectionSessionLimiter } from "../middleware/rateLimit.js";

router.get("/", getAllQuestions);

router.get("/:id", getCollectionById);

router.post("/create", collectionSessionLimiter, createCollection);

// router.get("/:id", getQuestionsByCancerType);

// //get all questions by cancer subtypes
// router.get("/:id/:subtypeId", getQuestionsByCancerSubtype);

export default router;
