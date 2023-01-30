import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import Website from 'App/Models/Website'

export default class AdminsController {
  public async index({ view, auth }: HttpContextContract) {
    const data_karyawan = await Database.from("karyawan").count('* as total')
    const data_prestasi = await Database.from("prestasis").count('*  as total')
    const data_blog = await Database.from("blogs").count('*  as total')
    const user = await User.findOrFail(auth.use('web').user!.id)
    return view.render('admin/home', { user: user, data_karyawan: data_karyawan, data_prestasi: data_prestasi, data_blog: data_blog })
  }

  public async editWebsite({ view }: HttpContextContract) {
    const data = await Website.findOrFail(1)
    return view.render('admin/pages/website', { data: data})
  }

  public async update({ request, response, session }: HttpContextContract) {
    const judul = request.input('judul_website')
    const visi = request.input('visi')
    const misi = request.input('misi')
    const sambutan_ketua_yayasan = request.input('sambutan_ketua_yayasan')
    const photo_ketua_yayasan = request.file('photo_ketua_yayasan', {
      size: '2mb',
      extnames: ['jpg', 'png', 'gif'],
    })!
    
    const photo_slide_satu = request.file('photo_slide_satu', {
      size: '2mb',
      extnames: ['jpg', 'png', 'gif'],
    })!
    
    const photo_slide_dua = request.file('photo_slide_dua', {
      size: '2mb',
      extnames: ['jpg', 'png', 'gif'],
    })!
    
    const photo_slide_tiga = request.file('photo_slide_tiga', {
      size: '2mb',
      extnames: ['jpg', 'png', 'gif'],
    })!


    try {
      
      if (photo_ketua_yayasan) {
        await photo_ketua_yayasan.moveToDisk('photo_ketua_yayasan')
        const website = await Website.findOrFail(1)
        website.judul_website = judul
        website.visi = visi
        website.misi = misi
        website.sambutan_ketua_yayasan = sambutan_ketua_yayasan
        website.photo_ketua_yayasan = photo_ketua_yayasan.fileName!
        website.save()
        session.flash('success','Data berhasil ditambah!')
        response.redirect().back()
      } else if (photo_slide_satu) {
        await photo_slide_satu.moveToDisk('photo_slide_satu')
        const website = await Website.findOrFail(1)
        website.judul_website = judul
        website.visi = visi
        website.misi = misi
        website.sambutan_ketua_yayasan = sambutan_ketua_yayasan
        website.photo_slide_satu = photo_slide_satu.fileName!
        website.save()
        session.flash('success','Data berhasil ditambah!')
        response.redirect().back()

      } else if (photo_slide_dua) {
        await photo_slide_dua.moveToDisk('photo_slide_dua')
        const website = await Website.findOrFail(1)
        website.judul_website = judul
        website.visi = visi
        website.misi = misi
        website.sambutan_ketua_yayasan = sambutan_ketua_yayasan
        website.photo_slide_dua = photo_slide_dua.fileName!
        website.save()
        session.flash('success','Data berhasil ditambah!')
        response.redirect().back()
        
      } else if (photo_slide_tiga) {
        await photo_slide_tiga.moveToDisk('photo_slide_tiga')
        const website = await Website.findOrFail(1)
        website.judul_website = judul
        website.visi = visi
        website.misi = misi
        website.sambutan_ketua_yayasan = sambutan_ketua_yayasan
        website.photo_slide_tiga = photo_slide_tiga.fileName!
        website.save()
        session.flash('success','Data berhasil ditambah!')
        response.redirect().back()
        
      } else {
        const website = await Website.findOrFail(1)
        website.judul_website = judul
        website.visi = visi
        website.misi = misi
        website.sambutan_ketua_yayasan = sambutan_ketua_yayasan
        website.save()
        session.flash('success','Data berhasil ditambah!')
        response.redirect().back()
    }
    } catch (e) {
      session.flash('error',e.message)
      response.redirect().back()
    }

  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
