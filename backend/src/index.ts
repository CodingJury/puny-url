import express from "express"
import urlRoute from "./routes/url.routes"
import indexRoute from "./routes/index.routes"
import dotenv from "dotenv";

dotenv.config()
const app = express();
app.use(express.json())

app.get('/', (req, res) => {
  res.json({message: "API is working fine"})
})

app.get('/:tinyURL', indexRoute);
app.use('/api/v1/url', urlRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})