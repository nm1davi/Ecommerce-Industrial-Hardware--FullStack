import CartService from '../services/carts.service.js';
import Cart from '../dao/models/cart.model.js';
import Producto from '../dao/models/product.model.js';
import User from '../dao/models/user.model.js';
import TicketsService from '../services/ticket.service.js';
import ProductsController from './products.controllers.js';
import NotificationsController from './notifications.controllers.js';
import { logger } from '../config/logger.js';
import { NotFoundException, InvalidDataException } from "../utils/exception.js";
import { v4 as uuidv4 } from 'uuid';

// Función para generar un código de ticket
function generateTicketCode() {
  const uuid = uuidv4().replace(/-/g, '');
  return uuid.substr(0, 10).toUpperCase();
}

// Función para calcular el monto total de la compra
function calculateTotalAmount(products, pricesInCart) {
  return products.reduce((total, item) => {
      const productPrice = pricesInCart.find(p => p.productId.equals(item.product)).price;
      const quantity = item.quantity;

      // Verificar si tanto el precio como la cantidad son números antes de sumarlo al total
      if (typeof productPrice === 'number' && typeof quantity === 'number') {
          return total + (productPrice * quantity);
      } else {
          console.error('Error: El precio o la cantidad del producto no son números', item.product);
          logger.error(`productPrice: ${productPrice}, quantity: ${quantity}`);
          return total;
      }
  }, 0);
}

export default class CartController {

  static async create(data){
    const cart = await CartService.create(data);
    if(!cart){
      throw new InvalidDataException(`No se pudo crear el carrito 😱.`);
    }
    return cart;
  }

  static async getCartById(cartId) {
    const cart = await CartService.getById(cartId);
    if(!cart){
      throw new NotFoundException(`Carrito no encontrado 😱.`);
    }
    return cart;
  }


  static async addToCart(cid, pid, quantity) {
    try {
      const cart = await Cart.findById(cid);
      if(!cart){
        throw new NotFoundException(`Carrito no encontrado 😱.`);
      }
      const product = await Producto.findById(pid);
      if(!product){
        throw new NotFoundException(`Producto no encontrado 😱.`);
      }
          // Verificar si el producto ya está en el carrito
    const existingProductIndex = cart.productos.findIndex(item => item.product && item.product._id && item.product._id.toString() === pid);
    if (existingProductIndex !== -1) {
      // Si el producto ya está en el carrito, aumenta la cantidad
      cart.productos[existingProductIndex].quantity += parseInt(quantity);
    } else {
      // Si el producto no está en el carrito, agrégalo con detalles completos
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
    await cart.save();
    } catch (error) {
      throw error;
    }
  }

  static async deleteSpecificProduct(pid, cart){
    try {
      const productIndex = cart.productos.findIndex(product => product.product._id.toString() === pid);
      if (productIndex !== -1) {
        if (cart.productos[productIndex].quantity > 1) {
          cart.productos[productIndex].quantity -= 1; // Restar una unidad
        } else {
          cart.productos.splice(productIndex, 1); // Si la cantidad es 1, eliminar completamente el producto
        }
      }
      await cart.save();
    } catch (error) {
      throw error;
    }
  }

  static async updateQuantityProductCart(pid, quantity, cart){
    try {
      const product = cart.productos.find(p => p._id.equals(pid));
      if (!product) {
        throw new NotFoundException(`Producto no encontrado 😱.`);
      }
      if (quantity !== undefined) {
        product.quantity = quantity; // Actualizar la cantidad del producto en el carrito
        await cart.save(); // Guardar los cambios en el carrito
        logger.info('Cantidad del producto actualizada con éxito', cart )
      } else {
        logger.error('Cantidad no proporcionada correctamente')
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateArrayProductCart(cid, productos, cart){
    try {
    // Limpiar los productos actuales del carrito antes de actualizar con nuevos productos
    cart.productos = [];
    // Verifica si se proporciona un arreglo de productos
    if (productos && Array.isArray(productos)) {
      // Agrega cada producto del arreglo al carrito con su cantidad correspondiente
      productos.forEach(producto => {
        cart.productos.push({
          product: { ...producto }, // Guarda el producto completo en lugar de solo algunos campos
          quantity: producto.quantity 
        });
      });
    }
    await cart.save();
    const updatedCart = await Cart.findById(cid).populate('productos.product');
    logger.info('Arreglo actualizado con exito', updatedCart)
    } catch (error) {
      
    }
  }

  static async deleteAllProductCart(cart){
    cart.productos = [];
    await cart.save();
    logger.info('Todos los productos del carrito han sido eliminados');
  }

  static async finalizePurchase(cid) {
    try {
        const user = await User.findOne({ cart: cid }).populate('cart');
        if (!user || !user.cart) {
          logger.error('Carrito no encontrado');
          throw new NotFoundException('Carrito no encontrado');
        }
        const cart = await Cart.findById(cid).populate('productos.product');
        if (!cart) {
          logger.error('Carrito no encontrado');
          throw new NotFoundException('Carrito no encontrado');
        }
        const pricesInCart = cart.productos.map(item => ({
            productId: item.product._id,
            price: item.product.price,
        }));
        const productsToPurchase = [];
        const productsNotPurchased = [];
        for (const item of cart.productos) {
            const product = item.product;
            const requestedQuantity = item.quantity;
            if (product.stock >= requestedQuantity) {
                await ProductsController.updateStockById(product._id, product.stock - requestedQuantity);
                productsToPurchase.push({
                    product: product._id,
                    quantity: requestedQuantity
                });
            } else {
                productsNotPurchased.push(product._id);
            }
        }
        const productsNotPurchasedInfo = cart.productos.filter(item => productsNotPurchased.includes(item.product._id));
        cart.productos = productsNotPurchasedInfo;
        await cart.save();
        if (productsToPurchase.length === 0) {
          logger.info('Todos los productos en el carrito están fuera de stock');
          throw new NotFoundException('Todos los productos en el carrito están fuera de stock');
        }
        const email = user.email;
        const ticketData = {
            code: generateTicketCode(),
            amount: calculateTotalAmount(productsToPurchase, pricesInCart),
            purchaser: email,
            products: productsToPurchase.map(item => ({
                product: item.product,
                quantity: item.quantity,
                price: pricesInCart.find(p => p.productId.equals(item.product)).price
            })),
        };
        const ticket = await TicketsService.create(ticketData);
        await NotificationsController.sendPurchaseNotification(email, ticket, user);
    } catch (error) {
      logger.error('Error interno del servidor:', error);
      throw new Error('Error interno del servidor');
    }
}
}
