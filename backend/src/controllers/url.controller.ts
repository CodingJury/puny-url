import { Request, Response } from "express";
import { RedisManager } from "../managers/redis.manager";
import { handleServerError, handleSuccess } from "../utils/helper.util";
import { urlSchemaValidator } from "../utils/validator.util";
import { generateHash } from "../utils/generateHash.util";

export async function addURL(req: Request, res: Response) {
  try {
    const validator = urlSchemaValidator.safeParse(req.body);
    if(!validator.success) {
      return handleServerError(res, validator.error)
    }

    const alreadyPresent = await RedisManager.getInstance().checkValueExist(validator.data.originalUrl)
    if(alreadyPresent) {
      return handleSuccess(res, "URL already present")
    }

    const shortId = await getUniqueShortId();
    if(shortId) {
      const redisResponse = await RedisManager.getInstance().addData(shortId, validator.data.originalUrl)
      if(redisResponse) {
        return handleSuccess(res, "URL added successfully")
      }else{
        return handleServerError(res, {}, 500, "Unable to add data into database")  
      }
    } else {
      return handleServerError(res, {}, 500, "Unable to generate shortId, Please try after some time")
    }
  } catch(error) {
    return handleServerError(res, error)
  }
}

export async function listURL(req: Request, res: Response) {
  try {
    const redisResponse = await RedisManager.getInstance().listData()
    return handleSuccess(res, redisResponse)
  } catch(error) {
    return handleServerError(res, error)
  }
}

export async function clearAll(req: Request, res: Response) {
  try {
    const redisResponse = await RedisManager.getInstance().clearAll()
    return handleSuccess(res, redisResponse)
  } catch(error) {
    return handleServerError(res, error)
  }
}

async function getUniqueShortId() {
  let MAX_ITERATION = 100;
  let shortId = generateHash();

  while (true && --MAX_ITERATION) {
    const found = await RedisManager.getInstance().getData(shortId);
    if(!found){
      return shortId;
    }
    shortId = generateHash();
  }

  return null;
}