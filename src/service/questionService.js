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
