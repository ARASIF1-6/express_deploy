export default class UserRepository {
    constructor(model) {
      this.model = model;
    }
  
    async create(userData) {
      return await this.model.create(userData);
    }
  
    async findByEmail(email) {
      return await this.model.findOne({ where: { email } });
    }

    async findAll() {
        return await this.model.findAll({
          attributes: ['id', 'email', 'created_at', 'updated_at'] // Exclude password
        });
    }
  }