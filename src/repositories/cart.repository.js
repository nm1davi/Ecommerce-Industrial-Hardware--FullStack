export default class CartRepository {
      constructor(dao){
            this.dao = dao;
      }
      async create(data){
            const cart = await this.dao.create(data);
            return cart;
      }
}