exports.up = knex => knex.schema.createTable("count", table => {
    table.increments("id");
    table.integer("code");
    table.text("product");
    table.integer("pallet");
    table.integer("ballast");
    table.integer("boxes");
    table.integer("units");
});

exports.down = knex => knex.schema.dropTable("count");