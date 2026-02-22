import express from "express";
import { connection } from "./database/db.js";
import uploadRouter from "./routes/uploadRoutes.js";
import { loginRouter } from "./routes/authRoute.js";


const app = express();
app.use(express.json()) //always necessary

connection();

app.use("/api/files", uploadRouter);
app.use("/api/auth", loginRouter);

app.get("/",(req, res)=>{
    res.send("Application is running");
});


app.listen(5000, ()=>{
    console.log("Server running on port 5000");
});