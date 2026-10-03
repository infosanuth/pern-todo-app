import express from 'express';
import cors from 'cors';
import todoRouts from "./routes/todos.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/todos", todoRouts);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(5000, ()=>{
    console.log("Server listening on port 5000");
});