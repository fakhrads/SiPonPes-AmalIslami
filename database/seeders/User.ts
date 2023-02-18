import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        nama: 'Admin Yayasan',
        email: 'operator.amalislami@gmail.com',
        password: 'Op15islami',
        level: "Operator",
      },
      {
        nama: 'TU',
        email: 'tu.amalislami@gmail.com',
        password: 'Tu15Islami',
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
