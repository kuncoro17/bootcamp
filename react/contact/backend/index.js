import express from "express";
import cors from "cors";
//import {UserRoute} from "routes/UserRoute";
import UserRoute from "./routes/index.js"


const app = express();
app.use(cors());
app.use(UserRoute);
app.use(express.json());
app.use('/api', UserRoute); // Prefiks rute dengan '/api'
app.listen(5432,()=>{
    console.log("Server is running on port 5432")
})
