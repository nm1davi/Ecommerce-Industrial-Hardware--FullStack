import config from '../config/config.js';

export let productDao;
switch (config.persistence) {
      case 'mongodb':
            const ProductDaoMongoDb = (await import('./product.mongodb.dao.js')).default;
            productDao = new ProductDaoMongoDb();
            break;

      default:
            const ProductDaoMemory= (await import('./product.memory.dao.js')).default;
            productDao = new ProductDaoMemory();
            break;
}

export let userDao;
switch (config.persistence) {
      case 'mongodb':
            const UserDaoMongoDb = (await import('./user.mongodb.dao.js')).default;
            userDao = new UserDaoMongoDb();
            break;
}

export let cartDao;
switch (config.persistence) {
      case 'mongodb':
            const CartDao = (await import('./cart.mongodb.dao.js')).default;
            cartDao = new CartDao();
            break;
}
