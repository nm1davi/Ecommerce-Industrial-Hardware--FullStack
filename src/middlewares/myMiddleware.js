import { logger } from "../config/logger.js";
import Cart from "../dao/models/cart.model.js";

export const myMiddleware = (req, res, next) => {
      logger.info("Se ha recibido una nueva solicitud de Carrito");
      next();
    };

    // Middleware para verificar si un carrito existe
export const checkCartExists = async (req, res, next) => {
  const { cid } = req.params;
  try {
    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    req.cart = cart;
    next();
  } catch (error) {
    logger.error('Error: ', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};