import express from "express";
import { connection } from "./database/db.js";


const app = express();
app.use(express.json()) //always necessary

connection();

app.get("/",(req, res)=>{
    res.send("Application is running");
});


app.listen(5000, ()=>{
    console.log("Server running on port 5000");
});