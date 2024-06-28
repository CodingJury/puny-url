import dotenv from "dotenv";
dotenv.config()

import cors from "cors"
import express from "express"
import urlRoute from "./routes/url.routes"
import indexRoute from "./routes/index.routes"

const app = express();
app.use(express.json())

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : [],
    methods: 'GET,POST,DELETE',
}
app.use(cors(corsOptions))

app.get('/', (req, res) => {
  res.json({message: "API is working fine"})
})

app.get('/:tinyURL', indexRoute);
app.use('/api/v1/url', urlRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})