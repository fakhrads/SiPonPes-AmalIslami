import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Prestasi from 'App/Models/Prestasi'

export default class AchievementsController {
    public async index({ view }: HttpContextContract) {
        const data = await Prestasi.all()
        return view.render('admin/pages/achievements', { data: data })
    }
    
    public async create({ view }: HttpContextContract) {
        return view.render('admin/pages/achievements_new')
    }

    public async store({ request, session, response }: HttpContextContract) {
        const judul = request.input('judul')
        const deskripsi = request.input('deskripsi')
        const photo_path = request.file('photo', {
          size: '2mb',
          extnames: ['jpg', 'png', 'gif'],
        })!

        try {
          if (photo_path) {
              await photo_path.moveToDisk('photo_prestasi')
          }
          await Prestasi.create({
            users_id: 1,
            title: judul,
            description: deskripsi,
            photo_path: photo_path.fileName
          })
            session.flash('success','Data Prestasi Berhasil Ditambah!')
            response.redirect().back()
        } catch (e) {
          session.flash('error',e.message)
          response.redirect().back()
        }
    }

    public async show({}: HttpContextContract) {}

    public async edit({ request, view}: HttpContextContract) {
      const id = request.param('id')
      const data = await Prestasi.findOrFail(id)
      return view.render('admin/pages/achievements_edit', { data: data })
    }

    public async update({ request, response, session}: HttpContextContract) {   
      const id = request.input('id')     
      const judul = request.input('judul')
      const deskripsi = request.input('deskripsi')
      const photo_path = request.file('photo', {
        size: '2mb',
        extnames: ['jpg', 'png', 'gif'],
      })!

      try {
        if (photo_path) {
          await photo_path.moveToDisk('photo_prestasi')
          const update = await Prestasi.findOrFail(id)
          update.title = judul
          update.description = deskripsi
          update.photo_path = photo_path.fileName!
          await update.save()
          session.flash('success','Data Prestasi Berhasil Diubah!')
          response.redirect().back()
        } else {
          const update = await Prestasi.findOrFail(id)
          update.title = judul
          update.description = deskripsi
          await update.save()
          session.flash('success','Data Prestasi Berhasil Diubah!')
          response.redirect().back()
        }
      } catch (e) {
        session.flash('error',e.message)
        response.redirect().back()
      }
    }

    public async destroy({ request, session, response}: HttpContextContract) {    
        const id = request.input('id')
        try {
          const data = await Prestasi.findOrFail(id)
          await data.delete()
    
          session.flash('success', "Data berhasil dihapus")
          return response.redirect().back()
        } catch(e) {
          session.flash('errors', e)
          return response.redirect().back()
        }
      }
}
