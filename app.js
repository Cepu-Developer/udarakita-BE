const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const AuthController = require("./controllers/AuthController");
const db = require("./config/database");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Izinkan akses dari dua alamat yang berbeda
const allowedOrigins = ["https://cek-udara.my.id", "https://localhost:5173"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Setup express-session middleware
app.use(
  session({
    secret: "your-secret-key", // Gantilah dengan kunci rahasia Anda sendiri
    resave: false,
    saveUninitialized: false,
  })
);

// Rute
app.get("/users", AuthController.getUsers);
app.post("/register", AuthController.register);
app.post("/login", AuthController.login);
app.delete("/logout", AuthController.logout);

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
