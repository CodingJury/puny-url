import express from "express";
import { redirectToFullUrl } from "../controllers/index.controller";
const router = express.Router();

router.get('/:tinyURL', redirectToFullUrl);

export default router;