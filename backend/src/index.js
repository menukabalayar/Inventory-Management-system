// src/index.js
import express from "express";
import cors from "cors";
import { connection } from "./database/db.js";
import uploadRouter from "./routes/uploadRoutes.js"; // matches export default
import { loginRouter } from "./routes/authRoute.js"; // assuming this is exported as named
import inventoryRouter from "./routes/inventoryRoute.js"; // correct path
import userRouter from "./routes/userRoutes.js"; // correct path




const app = express();

// Enable CORS for frontend
app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Parse JSON requests
app.use(express.json());

// Connect to DB
connection();

// Routes
app.use("/api/files", uploadRouter);
app.use("/api/auth", loginRouter);

// Register the routes
app.use("/api/inventory", inventoryRouter);
app.use("/api/users", userRouter); // Add this line to register user routes

// Test root route
app.get("/", (req, res) => {
  res.send("Application is running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});