import productModel from './models/product.model.js';

export default class ProductDao {
    async get(filters = {}, opts = {}) {
        const productos = await productModel.find({}).sort({"title": 1});
        const formattedProducts = productos.map(product => ({
          _id: product._id,
          title: product.title,
          description: product.description,
          price: product.price,
          thumbnail: product.thumbnail,
          code: product.code,
          stock: product.stock,
          category: product.category,
          status: product.status,
          owner: product.owner
        }))
        return formattedProducts;
    }
    
    async getById(pid) {
      try {
          const product = await productModel.findById(pid);
          return product;
      } catch (error) {
          throw new Error(`Error fetching product with ID ${pid}: ${error.message}`);
      }
  }

    async create(data) {
      return productModel.create(data);
    }
    
    async updateById(pid, data) {
      try {
          const result = await productModel.findByIdAndUpdate(pid, { $set: data }, { new: true });
          return result;
      } catch (error) {
          throw new Error(`Error updating product with ID ${pid}: ${error.message}`);
      }
  }
  
    async deleteById(pid) {
      try {
        const result = await productModel.findByIdAndDelete(pid);
        return result;
      } catch (error) {
        throw new Error(`Error deleting product with ID ${pid}: ${error.message}`);
      }
    }
}
