import enumsError from "../utils/enumsError.js";

export const errorHandlerMiddleware = (error, req, res, next) => {
  console.error(error.cause || error.message);
  switch (error.code) {
    case enumsError.BAD_REQUEST_ERROR:
    case enumsError.INVALID_PARAMS_ERROR:
      res.status(400).json({ status: 'error', message: error.message });
      break;
    case enumsError.DATA_BASE_ERROR:
    case enumsError.ROUTING_ERROR:
    default:
      res.status(500).json({ status: 'error', message: error.message });
  }
};