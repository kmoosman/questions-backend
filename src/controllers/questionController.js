import {
  getAllQuestionsService,
  createCollectionService,
  createCollectionItemSerivce,
  getCollectionByIdService,
} from "../service/questionService.js";
import { v4 as uuidv4 } from "uuid";

export const getAllQuestions = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await getAllQuestionsService(id);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCollection = async (req, res) => {
  try {
    if (req.body.betaCode !== process.env.BETA_CODE) {
      return res.status(401).json({ message: "Invalid beta code" });
    }
    const id = uuidv4();
    req.body.id = id;

    const results = await createCollectionService(req.body);

    const items = await Promise.all(
      req.body.collection.map(async (item) => {
        const collectionToAdd = {
          collectionId: id,
          type: item.type,
          title: item.title.replace("'", "''"),
          important: item.important,
          reference:
            item.reference === "undefined" || item.reference === "null"
              ? null
              : item.reference,
        };

        return await createCollectionItemSerivce(collectionToAdd, id);
      })
    );

    return res.status(201).json({
      message: "Collection created successfully",
      collectionId: id,
      items: items,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCollectionById = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await getCollectionByIdService(id);
    //convert the title back to the original form
    // results.collection.map((item) => {
    //   item.title = item.title.replace("\\", "'");
    // });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
