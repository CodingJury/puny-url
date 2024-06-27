import express from "express";
import { addURL, listURL, clearAll } from "../controllers/url.controller";
const router = express.Router();

router.post('/', addURL);
router.get('/', listURL);
router.delete('/', clearAll);

export default router;