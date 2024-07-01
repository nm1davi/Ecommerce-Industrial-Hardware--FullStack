import winston from "winston";
import config from "./config.js";

const customeLevelOpts = {
  levels: {
    debug: 5,
    http: 4,
    info: 3,
    warning: 2,
    error: 1,
    fatal: 0,
  },
  colors: {
    debug: "white",
    http: "green",
    info: "blue",
    warning: "yellow",
    error: "magenta",
    fatal: "red",
  },
};

export const devLogger = winston.createLogger({
  levels: customeLevelOpts.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ colors: customeLevelOpts.colors }),
        winston.format.simple()
      ),
    })
  ]
});
export const prodLogger = winston.createLogger({
  levels: customeLevelOpts.levels,
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({ colors: customeLevelOpts.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./errors.log",
      level: "error",
      format: winston.format.simple(),
    }),
  ],
});

export const logger = config.env === 'production' ? prodLogger : devLogger;

export const addLogger = (req, res, next) => {
  req.logger = logger;
  next();
};
