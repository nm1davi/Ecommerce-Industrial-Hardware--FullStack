import CartDao from "../dao/cart.mongodb.dao.js";
import { cartRepository } from "../repositories/index.js";

const cartDao = new CartDao();

export default class CartService {
  static getById(cartId) {
    return cartDao.getById(cartId);
  }
  static create(data){
    return cartRepository.create(data);
  }

  static async addToCart(cart, product, quantity) {
    try {
      if (!cart || !cart.productos) {
        throw new Error("El carrito o la lista de productos no están definidos.");
      }
      const existingProductIndex = cart.productos.findIndex(item => item.product && item.product._id && item.product._id.toString() === product._id.toString());

      if (existingProductIndex !== -1) {
        cart.productos[existingProductIndex].quantity += parseInt(quantity);
      } else {
        cart.productos.push({
          product: {
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock,
            category: product.category,
            status: product.status,
            _id: product._id,
          },
          quantity: parseInt(quantity)
        });
      }

      await cart.save(); // Guarda el carrito actualizado

      return cart;
    } catch (error) {
      throw error;
    }
  }
}
