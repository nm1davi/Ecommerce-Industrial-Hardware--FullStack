import EmailService from '../services/email.service.js';
import { logger } from '../config/logger.js';

export default class NotificationsController {
    static async sendContactMessage(data) {
        const { nombre, apellido, mail, mensaje, archivo } = data;
        const emailService = EmailService.getInstance();
        const subject = 'Nuevo mensaje de contacto';
        const html = `
            <h2>HOLA TE SALUDO DESDE EL PROYECTO DE CODERHOUSE</h2>
            <p>Mi nombre es <strong>${nombre} ${apellido}</strong></p>
            <p>Quiero darte el siguiente mensaje: <strong>${mensaje}</strong></p>
        `;
        const attachments = archivo && archivo.name ? [{ path: path.join(__dirname, './images/HELLO.gif', archivo.name) }] : [];
        try {
            await emailService.sendEmail(mail, subject, html, attachments);
            logger.info('Correo enviado correctamente');
            return { success: true, message: 'Correo enviado correctamente' };
        } catch (error) {
            logger.error('Error al enviar el correo:', error);
            return { success: false, message: 'Error al enviar el correo' };
        }
    }
    static async sendPurchaseNotification (email, ticket, user) {
        const {code , amount, purchaser} = ticket;
        const emailService = EmailService.getInstance();
        const subject = 'Compra realizada con éxito';
        const html = `
        <h2>Hola ${user.first_name} ${user.last_name}</h2>
        <p>Su compra ha sido exitosa.</p>
        <p>Detalles del ticket:</p>
        <ul>
            <li>ID del ticket: ${ticket._id}</li>
            <li>Código del ticket: ${code}</li>
            <li>Monto del ticket: $${amount}</li>
            <li>Comprador: ${purchaser}</li>
        </ul>
    `;
    try {
        await emailService.sendEmail(email, subject, html);
        logger.info('Correo de notificación de compra enviado correctamente');
    } catch (error) {
        logger.error('Error al enviar el correo de notificación de compra:', error);
    }
    }
}
