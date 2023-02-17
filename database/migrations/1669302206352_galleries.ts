import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'galleries'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('users_id')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE') 
      table.string('nama_kegiatan').notNullable()
      table.text('deskripsi','longtext').notNullable()
      table.string('photo_path').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
