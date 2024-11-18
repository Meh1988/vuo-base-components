import { NextFunction, Request, Response } from "express";

/**
 * Error handler middleware
 * @param err: The error to handle
 * @param req: The request
 * @param res: The response
 * @param next: The next function
 * @returns The error message
 */
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(500).send({ errors: [{ message: err.message }] });
};

export default errorHandler;
