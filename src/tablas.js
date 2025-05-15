const db = require('./config/knex');

async function createTables() {
    try{
        //Tabla Usuarios
        await db.schema.createTable('usuarios', (table) => {
            table.increments('id').primary();
            table.string('nombre').notNullable();
            table.string('email').notNullable().unique();
            table.string('password').notNullable();
            table.string('rol').defaultTo('USER');
            table.timestamps(true, true);
        })

        //Tabla de roles 
        await db.schema.createTable('roles', (table) => {
            table.increments('id').primary();
            table.string('nombre').notNullable(); //nombre del rol.
        })

        //Tabla de mascotas 
        await db.schema.createTable('mascotas', (table) => {
            table.increments('id').primary();
            table.string('nombre').notNullable();
            table.string('tipo').notNullable();
            table.integer('usuario_id').unsigned().references('id').inTable('usuarios');
            table.timestamps(true, true);
        })

        //Tabla de citas 
        await db.schema.createTable('citas', (table) => {
            table.increments('id').primary();
            table.integer('mascota_id').unsigned().references('id').inTable('mascotas');
            table.date('fecha').notNullable(); //fecha de la cita 
            table.string('descripcion').notNullable();
            table.timestamps(true, true); //fecha de creacion y actualizacion
        })

        console.log('Tablas creadas correctamente')

    } catch(error){
        console.log('Error creando las tablas: ', error)
    }
}

createTables();