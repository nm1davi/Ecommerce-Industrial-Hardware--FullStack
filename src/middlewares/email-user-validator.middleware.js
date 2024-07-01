import { logger } from '../config/logger.js';
import userModel from '../dao/models/user.model.js';


export const emailUserValidator = async (req, res, next) => {
  const { email } = req.body;
  try {
        // Utiliza el método findOne para buscar un usuario con el mismo email
        const user = await userModel.findOne({ email });

        if (user) {
          logger.error("El email ya existe")
          res.render('error', { messageError:'El email ya está registrado, intente con otro'});
        }
    
        // Si no hay un usuario con el mismo email, continúa con la ejecución
        next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}