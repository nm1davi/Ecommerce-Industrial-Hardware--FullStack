import { productDao } from "../dao/factory.js";
import {productRepository} from "../repositories/index.js";

export default class ProductsService {
      static getAll(filters ={}, opts = {}){
            return productDao.get(filters, opts)
      }
      static getById(pid) {
            return productRepository.getById(pid);
          }
      static create(data) {
            return productRepository.create(data);
          }
          static updateById(pid, data) {
            return productRepository.updateById(pid, data);
        }
      static deleteById(pid) {
            return productRepository.deleteById(pid);
          }
}