import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MataPelajaran from 'App/Models/MataPelajaran'

export default class SubjectsController {
  public async index({ view }: HttpContextContract) {
    const data = await MataPelajaran.all()
    return view.render('admin/pages/subjects', {data: data})
  }

  public async create({ view }: HttpContextContract) {
    return view.render('admin/pages/subjects_new')
  }

  public async store({ request, response, session, view}: HttpContextContract) {
    const nama_pelajaran = request.input('nama_pelajaran')
    try {
      await MataPelajaran.create({
        nama_pelajaran: nama_pelajaran
      })
      session.flash('success','Data berhasil di tambah!')
      return response.redirect().back()
    } catch(e) {
      session.flash('errors', e)
      return view.render('errors/server-error')
    }
  }

  public async edit({ view, request, session, response }: HttpContextContract) {
    const id = request.param('id')
    try {
      const mata_pelajaran = await MataPelajaran.query().where('id',id).firstOrFail()
      return view.render('admin/pages/subjects_edit', { data: mata_pelajaran })
    } catch(e) {
      session.flash('errors', e)
      //return response.json(e)
      return response.redirect().back()
    }
  }

  public async update({ request, response, session}: HttpContextContract) {
    const id = request.input('id')
    const nama_pelajaran = request.input('nama_pelajaran')

    try {
      const subjects = await MataPelajaran.findOrFail(id)

      subjects.nama_pelajaran = nama_pelajaran

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
      const subjects = await MataPelajaran.findOrFail(id)
      await subjects.delete()

      session.flash('success', "Data berhasil dihapus")
      return response.redirect().back()
    } catch(e) {
      session.flash('errors', e)
      return response.redirect().back()
    }
  }
}
