import { UserDTO } from "../dto/user.dto.js";

export default class UserRepository {
    constructor(dao) {
      this.dao = dao;
    }
  
    async get(filter = {}, opts = {}) {
      const users = await this.dao.get(filter, opts);
      return users.map(user => new UserDTO(user));
    }
    
    async getAll(filter = {}, opts = {}) {
      const users = await this.dao.get(filter, opts);
      return users.map(user => new UserDTO(user));
    }

    getRaw(filter = {}, opts = {}) {
      return this.dao.get(filter, opts);
    }
  
    async getById(uid) {
      const user = await this.dao.getById(uid);
      return user ? new UserDTO(user) : null;
    }

  
    async create(data) {
      const user = await this.dao.create(data);
      return new UserDTO(user);
    }
  
    updateById(uid, data) {
      return this.dao.updateById(uid, data);
    }
  
    deleteById(uid) {
      return this.dao.deleteById(uid);
    }
  }