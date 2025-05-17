/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('mascotas', (table) => {
    table.increments('id').primary()
    table.string('nombre').notNullable()
    table.string('tipo').notNullable()
    table.integer('usuario_id').unsigned().references('id').inTable('usuarios').onDelete('CASCADE')
    table.timestamps(true, true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('mascotas')
};
