import mongoose from 'mongoose';
import config from '../config/config.js';
import { logger } from '../config/logger.js';

export const URI = config.mongodbUri;

// Patron Singleton
export default class MongoDb {
    static #instance = null;
    constructor(connnection) {
      this.connnection = connnection;
    }
    static async getInstance() {
      if (config.persistence !== 'mongodb') {
        return null;
      }
      if (!MongoDb.#instance) {
        try {
          const URI = config.mongodbUri;
          const connection = await mongoose.connect(URI);
            logger.info("BD conectada correctamente ✔");
          MongoDb.#instance = new MongoDb(connection);
        } catch (error) {
            logger.error('Ah ocurrido un error al intentar conectarse a la DB ✖');
            console.error(error);
        }
      }
      return MongoDb.#instance;
    }
  } 
