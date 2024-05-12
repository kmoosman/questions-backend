import dotenv from "dotenv";
import "./config.js";
import express from "express";
import bodyParser from "body-parser";
import questionRoutes from "./src/routes/questionRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();

// const corsOptions = {
//   origin: '',
//   credentials: true
// };
const corsOptions = {
  origin: "https://questions.medtechstack.com",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/questions", questionRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const environment = process.env.NODE_ENV;

if (environment === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
      res.redirect(`https://${req.header("host")}${req.url}`);
    } else {
      next();
    }
  });
}

export default app;
