import UserModel from '../dao/models/user.model.js';
import Cart from '../dao/models/cart.model.js';
import { createHash } from '../utils/utils.js';
import { logger } from '../config/logger.js';

export default class SessionsController {
      static async loginUser(req) {
            try {
                // Verificar si el usuario tiene un carrito asociado
                if (!req.user.cart) {
                    // Si el usuario no tiene un carrito, crea uno automáticamente
                    const newCart = await Cart.create({ productos: [] });
            
                    // Asigna el ID del nuevo carrito al usuario
                    req.user.cart = newCart._id;
            
                    // Guarda los cambios en el usuario para agregar la referencia al carrito
                    await req.user.save();
                }
                await req.user.updateLastConnection();
                req.session.userRole = req.user.role;
                const userRole = req.user.role;
        
                // Redirecciona de acuerdo al rol del usuario
                if (userRole === 'admin') {
                    return "/admin";
                } else if (userRole === 'user') {
                    return "/profile";
                } else if (userRole === 'premium'){
                    return "/api/users/premium";
                } else {
                    // Puedes manejar otros roles o situaciones según sea necesario
                    throw new Error("Acceso no autorizado");
                }
            } catch (error) {
                logger.error("Error al iniciar sesión:", error);
                throw new Error("Error interno del servidor");
            }
        }
    
        static async registerUser(req) {
            try {
                const { first_name, last_name, email, password } = req.body;
        
                // Verificar si el usuario ya existe en la base de datos
                const existingUser = await UserModel.findOne({ email });
                if (existingUser) {
                    throw new Error(`Ya existe un usuario con el correo ${email} en el sistema`);
                }
        
                // Crear un nuevo usuario en la base de datos
                const newUser = await UserModel.create({
                    first_name,
                    last_name,
                    email,
                    password: createHash(password),
                    age: 18, // Aquí deberías establecer la edad del usuario según tus requerimientos
                });
        
                // Iniciar sesión con el nuevo usuario
                req.login(newUser, (err) => {
                    if (err) {
                        throw new Error("Error al iniciar sesión");
                    }
                });
        
                // Redireccionar a la página de inicio de sesión
                return "/login";
            } catch (error) {
                logger.error("Error al registrar usuario:", error);
                throw new Error("Error interno del servidor");
            }
        }
        
    static async recoverPassword(email, password) {
        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                throw new Error("Email o Contraseña Invalida.");
            }
            user.password = createHash(password);
            await UserModel.updateOne({ email }, user);
            return "/login";
        } catch (error) {
            logger.error("Error al recuperar contraseña:", error);
            throw new Error("Error interno del servidor");
        }
    }

    static async viewProfile(session) {
        try {
            if (!session.user) {
                throw new Error("No estás autenticado");
            }
            return session.user;
        } catch (error) {
            logger.error("Error al ver el perfil:", error);
            throw new Error("Error interno del servidor");
        }
    }

    static async logoutUser(req) {
        try {
            // Actualiza la última conexión del usuario antes de cerrar sesión
            await req.user.updateLastConnection();
        
            req.session.destroy((error) => {
                if (error) {
                    throw new Error(error.message);
                }
            });
            return "/";
        } catch (error) {
            logger.error("Error al cerrar sesión:", error);
            throw new Error("Error interno del servidor");
        }
    }
}
