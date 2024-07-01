import { Router } from 'express';
import { UserDTO } from '../dto/user.dto.js';
import { logger } from '../config/logger.js';
import {authorizeAdmin, authorizeUser} from '../middlewares/authorize-middlewares.js'

import ProductsController from '../controllers/products.controllers.js'
import UsersController from "../controllers/users.controller.js";

import { obtenerCarritoDelUsuario } from './user.router.js';


const router = Router();

// GET LOGGER
router.get('/loggerTest', (req, res) => {
  req.logger.debug('Hola desde el request index home 😁 (debug)');
  req.logger.http('Hola desde el request index home 😁 (http)');
  req.logger.info('Hola desde el request index home 😁 (info)');
  req.logger.warning('Hola desde el request index home 😁 (warning)');
  req.logger.error('Hola desde el request index home 😁 (error)');
  req.logger.fatal('Hola desde el request index home 😁 (fatal)');
  res.send('Hello Coder House 🖐️');
});
//GET INICIO
router.get('/', async (req, res) => {
  try {
    res.render('index',{ title: 'Inicio',})
  } catch (error) {
    logger.error('Error:', error);
    res.render('error', { title: 'Error ❌', messageError: 'Error' });
  }
  });

  //GET DE PROFILE USER
router.get('/profile', authorizeUser , async (req, res) => {
  if(!req.user){
    return res.redirect('login');
  }
  try {
    // Obtener productos
    const productos = await ProductsController.getAll();
    // Obtener información del carrito del usuario desde la base de datos
    const userCart = await obtenerCarritoDelUsuario(req.user._id); 
    const userDTO = new UserDTO(req.user);
    res.render('profile', {
      title: 'Profile ✅',
      user: userDTO,
      products: productos,
      cart: userCart 
    });
  } catch (error) {
    logger.error('Error al obtener información para el perfil:', error);
    res.render('error', { title: 'Error ❌', messageError: 'Error al obtener información para el perfil' });
  }
});

router.get('/contact', authorizeUser , async (req, res) => {
  if(!req.user){
    return res.redirect('login');
  }
  try {
    const userDTO = new UserDTO(req.user);
    res.render('contact', {
      title: 'Conctact ✅',
      user: userDTO,
    });
  } catch (error) {
    logger.error('Error al obtener información para el perfil:', error);
    res.render('error', { title: 'Error ❌', messageError: 'Error al obtener información para el perfil' });
  }
});

  //GET DE ADMIN PROFILE
router.get('/admin', authorizeAdmin, async (req, res) => {
  const userDTO = new UserDTO(req.user);
  res.render('adminProfile', {
    title: 'Admin ✅',
    user: userDTO,
  });
});
  //GET DE ADD PRODUCT
router.get('/admin/addProduct', authorizeAdmin, async (req, res) => {
  const userDTO = new UserDTO(req.user);
  res.render('addProduct', {
    title: 'Admin ✅',
    user: userDTO,
  });
});
  //GET DE DELETE PRODUCT
router.get('/admin/deleteProduct', authorizeAdmin, async (req, res) => {
  const userDTO = new UserDTO(req.user);
  res.render('deleteProduct', {
    title: 'Admin ✅',
    user: userDTO,
  });
});
  //GET DE UPDATE PRODUCT
router.get('/admin/updateProduct', authorizeAdmin, async (req, res) => {
  const userDTO = new UserDTO(req.user);
  res.render('updateProduct', {
    title: 'Admin ✅',
    user: userDTO,
  });
});
  //GET DE LISTA DE USUARIOS
router.get('/admin/userList', authorizeAdmin, async (req, res) => {
  const users = await UsersController.getAllUsers();
  const userDTO = new UserDTO(req.user);
  res.render('usersList', {
    title: 'Admin ✅',
    user: userDTO,
    users: users
  });
});

//GET DE LOGIN
router.get('/login', (req, res) => {
  res.render('login',{title: 'Login ✅'})
});

//GET DE REGISTER
router.get('/register', (req, res) => {
  res.render('register',{title: 'Register ✅'})
});

//GET DE RECUPERAR CONTRASEÑA
router.get('/recovery-password', (req, res) => {
  res.render('recover-password', {title: 'Recuperar Contraseña'})
});

export default router;