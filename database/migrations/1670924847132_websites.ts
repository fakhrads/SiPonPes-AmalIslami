import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'websites'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('judul_website')
      table.string('sejarah')
      table.string('visi')
      table.string('misi')
      table.text('sambutan_ketua_yayasan','longtext')
      table.string('photo_slide_satu')
      table.string('photo_slide_dua')
      table.string('photo_slide_tiga')


      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
