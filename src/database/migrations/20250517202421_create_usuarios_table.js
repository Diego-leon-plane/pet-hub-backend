/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('usuarios', (table) => {
        table.increments('id').primary()
        table.string('nombre').notNullable()
        table.string('email').notNullable().unique()
        table.string('password').notNullable()
        table.string('rol').defaultTo('USER')
        table.timestamps(true, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('usuarios')
};
