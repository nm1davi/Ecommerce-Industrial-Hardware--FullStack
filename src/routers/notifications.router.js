import { Router } from 'express';
import NotificationsController from '../controllers/notifications.controllers.js';

const router = Router();

router.post('/send', async (req, res) => {
  const { nombre, apellido, mail, mensaje, archivo } = req.body;
  const data = { nombre, apellido, mail, mensaje, archivo };
  
  try {
    const result = await NotificationsController.sendContactMessage(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al enviar el correo' });
  }
});

export default router;
