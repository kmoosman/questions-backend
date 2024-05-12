import dotenv from "dotenv";
import { Sequelize } from "sequelize";

const env = process.env.NODE_ENV || "development";

// const { database, username, host, dialect, password } =
//     extractDatabaseCredentials(process.env.DATABASE_URL);

// if (env !== 'production') {
//     dotenv.config({ path: '.env.development' });
// } else {
//     dotenv.config();
// }

// DEV ONLY
const { database, username, host, dialect, password } = {
  database: "patient_questions",
  username: "postgres",
  host: "localhost",
  dialect: "postgres",
};

// PROD
// if (env !== "production") {
//     import("dotenv").then((dotenv) => {
//         dotenv.config();
//     });
// }

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "postgres",
  dialectOptions: {},
  // dialectOptions: {
  //     ssl: {
  //         rejectUnauthorized: false,
  //     },
  // },
});

export default sequelize;

// function extractDatabaseCredentials(databaseUrl) {
//     const url = new URL(databaseUrl);

//     const credentials = {
//         host: url.hostname,
//         port: url.port,
//         database: url.pathname.substr(1),
//         username: url.username,
//         password: url.password,
//         dialect: "postgres",
//     };

//     return credentials;
// }
