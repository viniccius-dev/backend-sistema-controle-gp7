const knex = require("../database/knex");

class CountRepository {

    async findById(id) {
        const item = await knex("count").where({ id }).first();

        return item;
    }

    async deleteAll() {
        await knex("count").del();
    }

    async insertMany(data) {
        const formattedData = data.map(item => ({
            code: item.code,
            product: item.product,
            pallet: 0,   // Valores fixos
            ballast: 0,
            boxes: 0,
            units: 0
        }));

        await knex("count").insert(formattedData);
    }
    
    async getAll() {
        return await knex("count").select("*");
    }

    async updateItem(item) {
        const itemUpdated = await knex("count").update(item).where({ id: item.id });

        return itemUpdated;
    }

}

module.exports = CountRepository;