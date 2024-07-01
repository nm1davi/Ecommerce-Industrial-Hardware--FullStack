import { ProductDTO } from "../dto/product.dto.js";
export default class ProductRepository {
      constructor (dao){
            this.dao = dao;
      }
      async create(data) {
            const {
                  title,
                  description,
                  price,
                  thumbnail,
                  code,
                  stock,
                  category,
                  status,
                  owner
            } = data;
            const dataDao = {
                  title,  
                  description,
                  price,
                  thumbnail,
                  code,
                  stock,
                  category,
                  status,
                  owner
                };
            const product = await this.dao.create(dataDao);
            return new ProductDTO(product);
          }
        
          async updateById(pid, data) {
            const updatedProduct = await this.dao.updateById(pid, data);
            return new ProductDTO(updatedProduct);
        }
        async getById(pid) {
            let product = await this.dao.getById(pid)
            if (product) {
              product = new ProductDTO(product);
            }
            return product;
          }
          deleteById(pid) {
            return this.dao.deleteById(pid);
          }
}