import cartModel from "./models/cart.model.js";
import { logger } from "../config/logger.js";
export default class CartDao {
  async getById(cartId) {
    try {
      const cart = await cartModel.findById(cartId).populate('productos.product');
      if (!cart) {
        return null;
      }

      return {
        _id: cart._id,
        products: cart.productos.map(item => {
          if (item.product && item.product._id) {
            return {
              _id: item.product._id,
              title: item.product.title,
              description: item.product.description,
              price: item.product.price,
              thumbnail: item.product.thumbnail,
              code: item.product.code,
              stock: item.product.stock,
              category: item.product.category,
              status: item.product.status,
              quantity: item.quantity
            };
          } else {
            logger.error('Producto sin _id:', item.product);
            return null; // Puedes manejar el caso donde no hay _id
          }
        }).filter(product => product !== null) // Filtra productos nulos, si los hay
      };
    } catch (error) {
      logger.error('Error al obtener información del carrito:', error);
      throw new Error('Error interno al obtener información del carrito');
    }
  }

  async create(data){
    return cartModel.create(data);
  }

  async updateById(cid, data) {
    try {
        const result = await productModel.findByIdAndUpdate(cid, { $set: data }, { new: true });
        return result;
    } catch (error) {
        throw new Error(`Error updating cart with ID ${cid}: ${error.message}`);
    }
}

}
