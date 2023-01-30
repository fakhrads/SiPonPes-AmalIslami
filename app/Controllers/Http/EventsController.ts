import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'

export default class EventsController {
  public async index({ view }: HttpContextContract) {
    const data = await Event.all()
    return view.render('admin/pages/event', {data: data})
  }

  public async create({ view }: HttpContextContract) {
    return view.render('admin/pages/event_new')
  }

  public async store({ request, response, session }: HttpContextContract) {
    const tanggal_mulai = request.input('tanggal_mulai')
    const tanggal_selesai = request.input('tanggal_selesai')
    const nama_event = request.input('nama_event')

    try {
      await Event.create({
        tanggal_mulai: tanggal_mulai,
        tanggal_selesai: tanggal_selesai,
        judul: nama_event
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
      const event = await Event.query().where('id',id).firstOrFail()
      return view.render('admin/pages/event_edit', {data: event})
    } catch(e) {
      session.flash('errors', e)
      //return response.json(e)
      return response.redirect().back()
    }

  }

  public async update({ request, response, session}: HttpContextContract) {
    const id = request.input('id')
    const tanggal_mulai = request.input('tanggal_mulai')
    const tanggal_selesai = request.input('tanggal_selesai')
    const nama_event = request.input('nama_event')

    try {
      const event = await Event.findOrFail(id)

      event.judul = nama_event
      event.tanggal_mulai = tanggal_mulai
      event.tanggal_selesai = tanggal_selesai

      await event.save()

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
      const event = await Event.findOrFail(id)
      await event.delete()

      session.flash('success', "Data berhasil dihapus")
      return response.redirect().back()
    } catch(e) {
      session.flash('errors', e)
      return response.redirect().back()
    }
  }
}
