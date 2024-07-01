import UsersService from "../services/users.service.js";
import EmailService from "../services/email.service.js";
import User from '../dao/models/user.model.js';
import { logger } from '../config/logger.js';
import { NotFoundException, InvalidDataException } from "../utils/exception.js";

export default class UsersController {
  static updateById(uid, data) {
    return UsersService.updateById(uid, data);
  }

  static async getById(uid) {
    const user = await UsersService.getById(uid);
    if (!user) {
      throw new NotFoundException(`User ${uid} not found 😱.`);
    }
    return user;
  }
  
  static uploadFile(uid, typeFile, file) {
    const data = {};
    if (typeFile === "profilePicture") {
      Object.assign(data, { pictureProfile: file.filename });
    } else if (typeFile === "productPicture") {
      Object.assign(data, { pictureProduct: file.filename });
    } else if (typeFile === "document") {
      Object.assign(data, { document: file.filename });
    }
    return UsersService.updateById(uid, data);
  }

  static async getAllUsers() {
    const users = await UsersService.getAll();
    if (!users) {
      throw new NotFoundException(`Users not found 😱.`);
    }
    return users;
  }

  static async deleteSince2Days() {
    try {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2); // Resta 2 días
  
      const users = await UsersService.getAll();
      const usersToDelete = users.filter(user => {
        return user.last_connection < twoDaysAgo;
      });
  
      const deletionPromises = usersToDelete.map(async user => {
        await UsersService.deleteById(user.id);
        await EmailService.getInstance().sendEmail(
          user.email,
          "Eliminación de cuenta por inactividad",
          `<p>Hola ${user.firstname},</p><p>Tu cuenta ha sido eliminada por inactividad.</p>`,
        );
      });
  
      await Promise.all(deletionPromises);
  
      return { message: `Se eliminaron ${usersToDelete.length} usuarios inactivos.` };
    } catch (error) {
      logger.error("Error:", error);
      throw new NotFoundException(`Usuarios no encontrados 😱.`);
    }
  }
  
   static async deleteUser(uid){
    const user = await UsersService.getById(uid);
    if(!user){
      throw new NotFoundException(`User not found 😱.`);
    }
    return UsersService.deleteById(uid);
  }

  static async obtenerCarritoUsuario(uid){
    try {
      const usuario = await User.findById(uid).populate("cart");
      if (!usuario) {
        throw new NotFoundException("Usuario no encontrado");
      }
      return usuario.cart;
    } catch (error) {
      throw new Error("Error al obtener el carrito del usuario: " + error.message);
    }
  }

  static async cambiarRolDelUsuario(uid) {
    try {
      const user = await User.findById(uid);
      if (!user) {
        throw new NotFoundException("Usuario no encontrado");
      }
      if (user.role === 'user') {
        // Si el usuario está cambiando de 'user' a 'premium', verificar los documentos
        if (!user.pictureProfile.length || !user.pictureProduct.length || !user.document.length) {
          throw new InvalidDataException('Para ser premium, debes tener los siguientes archivos cargados: Identificación, Comprobante de domicilio y Comprobante de estado de cuenta');
        }
      }
      user.role = user.role === 'user' ? 'premium' : 'user';
      await user.save();
      return user;
    } catch (error) {
      throw new Error("Error al cambiar el rol del usuario: " + error.message);
    }
  }
  static async cambiarRolDelUsuarioPorAdmin(uid){
    try {
      const user = await User.findById(uid);
      if (!user) {
        throw new NotFoundException("Usuario no encontrado");
      }
      
      user.role = user.role === 'user' ? 'premium' : 'user';
      await user.save();
      return user;
    } catch (error) {
      throw new Error("Error al cambiar el rol del usuario: " + error.message);
    }
  }
}
