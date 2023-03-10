import express from "express";
import dotenv from 'dotenv';

import authRouter from "./router/authRouter.js";
import { connectDatabase } from "./service/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_, res) => res.send('Back End App Test API'));

app.use('/auth', authRouter);

async function startServer() {
    await connectDatabase()
    app.listen(PORT, () => console.log(`Server is listening...`));
}

startServer();