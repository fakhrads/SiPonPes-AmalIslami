import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gallery from 'App/Models/Gallery'

export default class GalleriesController {
  public async index({ view }: HttpContextContract) {
    const data = await Gallery.all()
    return view.render('admin/pages/gallery', { data: data })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('admin/pages/gallery_new')
  }

  public async store({ session, request, response}: HttpContextContract) {
    const title = request.input('title')
    const content = request.input('content')
    const photo_path = request.file('photo', {
      size: '2mb',
      extnames: ['jpg', 'png', 'gif'],
    })!

    if (photo_path) {
      await photo_path.moveToDisk('photo_gallery')
    }
    try {
      await Gallery.create({
        nama_kegiatan: title,
        deskripsi: content,
        photo_path: photo_path.fileName,
      })
      session.flash('success','Data berhasil ditambah!')
      response.redirect().back()
    } catch (e) {
      session.flash('error',e.message)
      response.redirect().back()
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({ view, request }: HttpContextContract) {
    const id = request.param('id')
    const data = await Gallery.findOrFail(id)
    return view.render('admin/pages/gallery_edit', {data: data})
  }

  public async update({ request, response, session}: HttpContextContract) {
    const id = request.input('id')
    const title = request.input('title')
    const content = request.input('content')
    const photo_path = request.file('photo', {
      size: '2mb',
      extnames: ['jpg', 'png', 'gif'],
    })!

    try {
      if (photo_path) {
        await photo_path.moveToDisk('photo_gallery')
        const data_gallery = await Gallery.findOrFail(id)
        data_gallery.nama_kegiatan = title
        data_gallery.deskripsi = content
        data_gallery.photo_path = photo_path.fileName!
        data_gallery.save()
        session.flash('success','Data berhasil dirubah!')
        response.redirect().back()
      } else {
        const data_gallery = await Gallery.findOrFail(id)
        data_gallery.nama_kegiatan = title
        data_gallery.deskripsi = content
        data_gallery.save()
        session.flash('success','Data berhasil dirubah!')
        response.redirect().back()
      }
    } catch (e) {
      session.flash('error',e.message)
      response.redirect().back()
    }
  }

  public async destroy({ session, request, response}: HttpContextContract) {
    const id = request.input('id')
    try {
      const data = await Gallery.findOrFail(id)
      await data.delete()

      session.flash('success', "Data berhasil di hapus")
      return response.redirect().back()
    } catch(e) {
      session.flash('errors', e)
      return response.redirect().back()
    }
  }
}
