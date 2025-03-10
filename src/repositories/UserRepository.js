const knex = require("../database/knex");

class UserRepository {
    async findById(id) {
        const user = await knex("users").where({ id }).first();

        return user;
    }

    async findByEmail(email) {
        const user = await knex("users").where({ email }).first();

        return user;
    };

    async create({ name, email, password, domain_id }) {
        const [userId] = await knex("users").insert({
            name,
            email,
            password,
        });

        return { id: userId };
    };
}

module.exports = UserRepository;