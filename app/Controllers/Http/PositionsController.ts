import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Jabatan from 'App/Models/Jabatan'

export default class PositionsController {
  public async index({ view }: HttpContextContract) {
    const data = await Jabatan.all()
    return view.render('admin/pages/position', {data: data})
  }

  public async create({ view }: HttpContextContract) {
    return view.render('admin/pages/position_new')
  }

  public async store({ request, response, session }: HttpContextContract) {
    const nama_jabatan = request.input('nama_jabatan')

    try {
      await Jabatan.create({
        nama_jabatan: nama_jabatan
      })
      session.flash('success','Data berhasil ditambah!')
      response.redirect().back()
    } catch (e) {
      session.flash('error',e.message)
      response.redirect().back()
    }
  }

  public async edit({ view, request, session, response }: HttpContextContract) {
    const id = request.param('id')
    
    try {
      const position = await Jabatan.query().where('id',id).firstOrFail()
      return view.render('admin/pages/position_edit', {data: position})
    } catch(e) {
      session.flash('errors', e)
      //return response.json(e)
      return response.redirect().back()
    }

  }

  public async update({ request, response, session}: HttpContextContract) {
    const id = request.input('id')
    const nama_jabatan = request.input('nama_jabatan')

    try {
      const subjects = await Jabatan.findOrFail(id)

      subjects.nama_jabatan = nama_jabatan

      await subjects.save()

      session.flash('success', "Data berhasil diubah")
      return response.redirect().back()
    } catch(e) {
      session.flash('errors', "Data tidak berhasil diubah")
      return response.redirect().back()
    }
  }


  public async destroy({ request, session, response}: HttpContextContract) {    
    const id = request.input('id')
    try {
      const subjects = await Jabatan.findOrFail(id)
      await subjects.delete()

      session.flash('success', "Data berhasil di hapus")
      return response.redirect().back()
    } catch(e) {
      session.flash('errors', e)
      return response.redirect().back()
    }
  }
}
