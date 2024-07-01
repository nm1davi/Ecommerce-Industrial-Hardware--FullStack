import { Router } from "express";
import { UserDTO } from "../dto/user.dto.js";
import { logger } from "../config/logger.js";
import { authorizeUser, authorizeAdmin } from "../middlewares/authorize-middlewares.js";
import { uploader } from "../utils/utils.js";

import userModel from "../dao/models/user.model.js";
import ProductsController from '../controllers/products.controllers.js'
import UsersController from "../controllers/users.controller.js";

const router = Router();

// obtenerCarritoDelUsuario
export async function obtenerCarritoDelUsuario(userId) {
  try {
    const usuario = await UsersController.obtenerCarritoUsuario(userId)
    return usuario;
  } catch (error) {
   throw new Error
  }
}

//Redirect a Formulario de agregar documentos
router.get("/add/documents", async (req, res) => {
  try {
    const userDTO = new UserDTO(req.user);
    res.render("addDocuments", {
      title: "Agregar Documentos",
      user: userDTO,
    });
  } catch (error) {
    logger.error("Error:", error);
    res.render("error", { title: "Error ❌", messageError: "Error" });
  }
});

//Agregar Documentos
router.post("/:uid/:typeFile", uploader.single("file"), async (req, res) => {
  try {
    const {file, params :{ uid, typeFile}} = req;
    await UsersController.uploadFile(uid, typeFile, file);
    res.status(200).json(`Archivo cargado exitosamente`)
  } catch (error) {
    logger.error("Error:", error);
    res.status(500).json({ error: "Error al subir el documento" });
  }
});

//Lista de Usarios
router.get("/userList", async (req, res) =>{
  try {
    const users = await UsersController.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    logger.error("Error:", error);
  }
});

//  Borrar a todos los usuarios que no hayan tenido conexión en los últimos 2 días.
router.delete('/deleteSince2Days', async (req, res) =>{
  try {
    await UsersController. deleteSince2Days();
    res.status(200).json({message: "Usuario eliminado por inactividad"});
  } catch (error) {
    logger.error("Error:", error);
  }
});

//Eliminar un Usuario por su ID
router.delete('/deleteUser/:uid', authorizeAdmin,async (req, res) =>{
  try {
    const userId = req.params.uid;
    const result = await UsersController.deleteUser(userId);
    res.status(200).json({message: 'User deleted successfully', result: result});
  } catch (error) {
    res.status(404 ).json({message: 'Usuario no encontrado por su ID'});
  }
})

// Perfil del Usario por su ID (YA REGISTRADO)
router.get('/auth/current',
  async (req, res, next) => {
  try {
    const { user: { id } } = req;
    const user = await UsersController.getById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});


//Perfil del Premium
router.get('/premium', authorizeAdmin, async (req, res) =>{
  try {
    const userCart = await obtenerCarritoDelUsuario(req.user._id);
    const productos = await ProductsController.getAll();
    const userDTO = new UserDTO(req.user);
    res.render('premiumProfile', {
      title: 'Perfil Premium',
      user: userDTO,
      products: productos,
      cart: userCart 
    })
  } catch (error) {
    logger.error("Error:", error);
    res.render("error", { title: "Error ❌", messageError: "Error" });
  }
})

//Cambiar el rol de user a premium y viceversa
router.put('/premium/:uid', async (req, res) => {
  try {
    const userId = req.params.uid;
    const user = await UsersController.cambiarRolDelUsuario(userId);
    req.session.userRole = user.role;
    // Mostramos msj de éxito
    res.status(200).json({ message: 'Rol cambiado con éxito', role: user.role });
  } catch (error) {
    logger.error('Error:', error);
    res.status(500).json({ error: 'Error al cambiar el rol' });
  }
});

//Agregar un producto siendo Premium
router.get('/premium/addProduct', async (req, res) => {
  const userDTO = new UserDTO(req.user);
  res.render('addProductPremium', {
    title: 'Premium ✅',
    user: userDTO,
  });
});
//Eliminar un producto siendo Premium
router.get('/premium/deleteProduct', async (req, res) => {
  const userDTO = new UserDTO(req.user);
  res.render('deleteProductPremium', {
    title: 'Premium ✅',
    user: userDTO,
  });
});

//Cambiar el rol de user a premium y viceversa siendo admin
router.put('/admin/changeRol/:uid', authorizeAdmin,async (req, res) => {
  try {
    const userId = req.params.uid;
    const user = await UsersController.cambiarRolDelUsuarioPorAdmin(userId);
    req.session.userRole = user.role;
    // Mostramos msj de éxito
    res.status(200).json({ message: 'Rol cambiado con éxito', role: user.role });
  } catch (error) {
    logger.error('Error:', error);
    res.status(500).json({ error: 'Error al cambiar el rol' });
  }
});


export default router;
