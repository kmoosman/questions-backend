import sequelize from "../../config/database.js";
import { v4 as uuidv4 } from "uuid";
import { deepCamelcaseKeys } from "../helpers/helpers.js";
// create table public.questions_by_disease
// (
//     id                 serial
//         primary key,
//     question_id        integer not null
//         references public.questions,
//     disease_type_id    integer
//         references public.disease_type,
//     disease_subtype_id integer
//         references public.disease_subtype,
//     created_at         timestamp default CURRENT_TIMESTAMP
// );

export const getAllQuestionsService = async () => {
  try {
    const query = `SELECT
    q.question,
    qbd.metastatic AS is_metastatic,
    q.category,
    q.selectcount AS select_count,
    array_agg(DISTINCT d.name) AS disease_types,
    array_agg(DISTINCT ds.name) FILTER (WHERE ds.name IS NOT NULL) AS disease_subtypes
FROM
    questions q
JOIN
    questions_by_disease qbd ON q.id = qbd.question_id
JOIN
    disease_type d ON qbd.disease_type_id = d.id
LEFT JOIN
    disease_subtype ds ON qbd.disease_subtype_id = ds.id
GROUP BY
    q.id, qbd.metastatic, q.category
ORDER BY
    q.id;
`;
    const questions = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    return deepCamelcaseKeys(questions);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// CREATE TABLE collections (
//   collection_id SERIAL PRIMARY KEY,
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//   expires_at TIMESTAMP WITH TIME ZONE
//   code_word TEXT NOT NULL,
// );

// CREATE TABLE collection_items (
//   item_id SERIAL PRIMARY KEY,
//   collection_id INTEGER NOT NULL,
//   type VARCHAR(255) NOT NULL,
//   title TEXT NOT NULL,
//   important BOOLEAN NOT NULL,
//   reference TEXT,
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//   updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//   FOREIGN KEY (collection_id) REFERENCES collections(collection_id)
// );

export const createCollectionService = async (data) => {
  try {
    const query = `INSERT INTO collections (collection_id, code_word) VALUES ('${data.id}', '${data.codeWord}') RETURNING collection_id;`;
    const collection = await sequelize.query(query, {
      type: sequelize.QueryTypes.INSERT,
    });

    return deepCamelcaseKeys(collection[0]);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createCollectionItemSerivce = async (data, collectionId) => {
  const itemId = uuidv4();
  try {
    const query = `INSERT INTO collection_items (item_id, collection_id, type, title, important, reference) VALUES ('${itemId}', '${collectionId}', '${data.type}', '${data.title}', ${data.important}, '${data.reference}');`;
    const item = await sequelize.query(query, {
      type: sequelize.QueryTypes.INSERT,
    });

    return deepCamelcaseKeys(item);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCollectionByIdService = async (id) => {
  try {
    const query = `SELECT * FROM collection_items WHERE collection_id = '${id}';`;
    const collection = await sequelize
      .query(query, { type: sequelize.QueryTypes.SELECT })
      .then((result) => result);
    return deepCamelcaseKeys(collection);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
