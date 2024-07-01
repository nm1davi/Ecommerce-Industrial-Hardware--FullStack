import { Router } from 'express';
import { logger } from '../config/logger.js';
import { myMiddleware, checkCartExists} from '../middlewares/myMiddleware.js';
import CartController from '../controllers/carts.controllers.js';
import Handlebars from 'handlebars';

const router = Router();

Handlebars.registerHelper('multiply', function(a, b) {
  return a * b;
});

//Router para renderizar el carrito con los Productos
router.get('/:cid', myMiddleware, async (req, res) => {
  const { cid } = req.params;
  try {
    const cartInfo = await CartController.getCartById(cid);
    res.render('cart', {
      title: "Carrito",
      cartId: cartInfo._id,
      user: req.user.toJSON(),
      products: cartInfo.products,
    });
  } catch (error) {
    logger.error('Error: ', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

//Router para ver la informacion del Carrito del Cliente
router.get('/cartinfo/:cid', myMiddleware, async (req, res) => {
  const { cid } = req.params;
  try {
    const cartInfo = await CartController.getCartById(cid);
    res.json(cartInfo);
  } catch (error) {
    logger.error('Error: ', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

//Ruta para agregar producto al Carrito del Cliente
router.post('/:cid/product/:pid',  async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await CartController.addToCart(cid, pid, quantity);
    res.status(201).json({ message: 'Producto agregado al carrito con éxito', cart: cart });
  } catch (error) {
    logger.error('Error: ', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Eliminar una unidad del producto específico del carrito
router.delete('/:cid/product/:pid', checkCartExists, async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const { cart } = req;
    const deleteSpecificProduct = await CartController.deleteSpecificProduct(pid, cart);
    res.status(200).json({ message: 'Se eliminó una unidad del producto del carrito', deleteSpecificProduct });
  } catch (error) {
    logger.error('Error: ', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Actualizar la cantidad de un producto en el carrito
router.put('/:cid/products/:pid', checkCartExists, async (req, res) => {
  const { pid } = req.params;
  const { quantity } = req.body;
  try {
    const { cart } = req;
    const updateQuantityProductCart = await CartController.updateQuantityProductCart(pid, quantity, cart);
    return res.status(200).json({ message: 'Cantidad del producto actualizada con éxito', updateQuantityProductCart });
  } catch (error) {
    logger.error('Error: ', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Actualizar el carrito con un nuevo arreglo de productos
router.put('/:cid', checkCartExists, async (req, res) => {
  const { cid } = req.params;
  const { productos } = req.body;
  try {
    const { cart } = req;
    const updateArrayProductCart = await CartController.updateArrayProductCart(cid, productos, cart);
    res.status(200).json({ message: 'Carrito actualizado con éxito', cart: updateArrayProductCart });
  } catch (error) {
    logger.error('Error: ', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Eliminar todos los productos del carrito
router.delete('/:cid', checkCartExists, async (req, res) => {
  try {
    const { cart } = req;
    const deleteAllProductCart = await CartController.deleteAllProductCart(cart);
    res.status(200).json({ message: 'Todos los productos del carrito han sido eliminados',  deleteAllProductCart});
  } catch (error) {
    logger.error('Error: ', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para finalizar el proceso de compra del carrito
router.post('/:cid/purchase', async (req, res) => {
  const { cid } = req.params;
  try {
    const response = await CartController.finalizePurchase(cid);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


export default router;
