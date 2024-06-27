import { Response } from "express";

export function handleSuccess(res: Response, data: any = null, status = 200) {
  res.status(status).json({
    status: 'success',
    data: data,
  });
}

export function handleServerError(
  res: Response,
  error: any,
  status = 500,
  message = "Internal Server Error"
) {
  console.log(error)
  res.status(status).json({
    status: "error",
    message
  })
}