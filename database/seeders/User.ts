import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        nama: 'Admin Yayasan',
        email: 'operator.amalislami@gmail.com',
        password: '89o7igultsdgnjkl',
        level: "Operator",
      },
      {
        nama: 'TU',
        email: 'tu.amalislami@gmail.com',
        password: '90np8yahfbsedofa',
        level: "TU",
      },
      {
        nama: 'Ji Kun',
        email: 'jikun@gmail.com',
        password: 'secret',
        level: "TU",
      },
    ])
  }
}
