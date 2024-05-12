import { getAllQuestionsService } from "../service/questionService.js";

export const getAllQuestions = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await getAllQuestionsService(id);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
