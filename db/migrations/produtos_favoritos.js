/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('produtos_favoritos ', (table) => {
        table.increments('id').primary();
        table.string('nome_produto').notNullable();
        table.decimal('preco_produto').notNullable();
        table.integer('produto_api_id').notNullable;
        table.integer('usuario_id').unsigned();

        table
            .foreign('usuario_id')
            .references('usuario.id');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('produtos_favoritos');
};
