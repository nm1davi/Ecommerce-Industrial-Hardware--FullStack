import { productDao } from '../dao/factory.js'
import { userDao } from '../dao/factory.js'
import { cartDao } from '../dao/factory.js'
import UserRepository from './user.repository.js';
import ProductRepository from './products.repository.js';
import CartRepository from './cart.repository.js';

export const productRepository = new ProductRepository(productDao);

export const userRepository = new UserRepository(userDao);

export const cartRepository = new CartRepository(cartDao);