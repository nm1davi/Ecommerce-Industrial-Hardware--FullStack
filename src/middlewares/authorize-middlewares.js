import ProductsService from "../services/product.service.js";

//MIDLEWARES 
export const authorizeAdmin = (req, res, next) => {
      const user = req.user;
    
      if (!user || (user.role !== 'admin' && user.role !== 'premium')) {
        return res.status(403).json({ message: 'No tienes permisos de administrador' });
      }
      next();
    };
    
export const authorizeUser = (req, res, next) => {
      const user = req.user;
    
      if (!user || user.role !== 'user') {
        return res.status(403).json({ message: 'No tienes permisos de usuario' });
      }
      next();
    };

// Middleware para autorizar la eliminación de productos solo para el propietario o el admin
export const authorizeDelete = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await ProductsService.getById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Verificar si el usuario es admin
    if (req.user.role === 'admin') {
      return next(); // Permitir que el admin elimine cualquier producto
    }

    // Verificar si el usuario premium es el propietario del producto
    if (req.user.role === 'premium' && product.owner === req.user.email) {
      return next(); // Permitir que el propietario premium elimine su producto
    }

    // Si el usuario no es admin ni el propietario del producto, negar el acceso
    return res.status(403).json({ error: 'Unauthorized' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
