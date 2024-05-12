import express from "express";
const router = express.Router();
import { getAllQuestions } from "../controllers/questionController.js";

router.get("/", getAllQuestions);

// router.get("/:id", getQuestionsByCancerType);

// //get all questions by cancer subtypes
// router.get("/:id/:subtypeId", getQuestionsByCancerSubtype);

export default router;
