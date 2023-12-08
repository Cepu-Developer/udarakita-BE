import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";

dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database Connected...");
} catch (error) {
  console.error(error);
}

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE", // Mengizinkan metode HTTP tertentu
    allowedHeaders: "Content-Type, Authorization", // Mengizinkan header tertentu
    exposedHeaders: "Authorization", // Header yang akan diekspos ke klien
    maxAge: 600, // Waktu dalam detik untuk hasil dari CORS preflight cache
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5000, () => console.log("Server running at port 5000"));
