import express from "express";
import mongoose from "mongoose";
import { registerUser, loginUser } from "./authController.js";
import { authenticateJWT } from "./authMiddleware.js";

const app = express();
app.use(express.json());

// Connect to MongoDB (optional, if using MongoDB)
mongoose
  .connect(
    "mongodb+srv://<your_username>:<your_password>@authdemo.agy67.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Public routes
app.post("/register", registerUser); // Register user
app.post("/login", loginUser); // Login user

// Protected route
app.get("/dashboard", authenticateJWT, (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}` });
});

app.listen(3000, () => console.log("Server running on port 3000"));
