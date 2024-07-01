import Ticket from '../dao/models/ticket.model.js';

export default class TicketsService {
  static async create(data) {
    try {
      const ticket = await Ticket.create(data);
      return ticket;
    } catch (error) {
      throw new Error(`Error al crear el ticket: ${error.message}`);
    }
  }
}