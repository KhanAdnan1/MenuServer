import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//app.use(cors());
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests from all origins but only if credentials are present
    callback(null, true);
  },
  credentials: true, // Allow credentials (cookies, etc.)
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


//import routes

import MenuAccess from "./routes/menuAccess.routs.js";

//routes declaration

app.use("/restaurant",MenuAccess)

export default app;