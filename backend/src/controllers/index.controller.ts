import { Request, Response } from "express"
import { RedisManager } from "../managers/redis.manager"
import { handleServerError } from "../utils/helper.util"

export async function redirectToFullUrl(req: Request, res: Response) {
  const { tinyURL } = req.params;
  try {
    const data = await RedisManager.getInstance().getData(tinyURL);

    if(!data) {
      return res.status(404).json({message: "URL not round"});
    }

    return res.status(302).redirect(data);
  } catch(error) {
    return handleServerError(res, error)
  }
}