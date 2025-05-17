/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('citas', (table) => {
    table.increments('id').primary()
    table.integer('mascota_id').unsigned().references('id').inTable('mascotas').onDelete('CASCADE')
    table.date('fecha').notNullable()
    table.string('descripcion').notNullable()
    table.timestamps(true, true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('citas')
};
