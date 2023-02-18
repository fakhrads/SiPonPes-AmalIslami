import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Jabatan from 'App/Models/Jabatan'
import Karyawan from 'App/Models/Karyawan'
import MataPelajaran from 'App/Models/MataPelajaran'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class StaffController {
  public async index({ view, auth }: HttpContextContract) {
    const user = await User.findOrFail(auth.use('web').user!.id)
    const data = await Database
                              .from('karyawan')
                              .select('karyawan.id','karyawan.nama_depan','karyawan.nama_belakang','karyawan.jenis_kelamin','jabatan.nama_jabatan','mata_pelajarans.nama_pelajaran')
                              .innerJoin('jabatan','karyawan.jabatan_id','jabatan.id')
                              .innerJoin('mata_pelajarans','karyawan.mata_pelajaran_id','mata_pelajarans.id')
    return view.render('admin/pages/karyawan', {user: user, data: data})
  }

  public async create({ view, auth }: HttpContextContract) {
    const user = await User.findOrFail(auth.use('web').user!.id)
    const data_jabatan = await Jabatan.all()
    const data_pelajaran = await MataPelajaran.all()
    return view.render('admin/pages/karyawan_new', {user: user, data_jabatan:data_jabatan, data_pelajaran:data_pelajaran})
  }

  public async store({ request, response, session, auth }: HttpContextContract) {
    const id_matapelajaran = request.input('id_matapelajaran')
    const id_jabatan = request.input('id_jabatan')
    const nama_depan = request.input('nama_depan')
    const nama_belakang = request.input('nama_belakang')
    const jenis_kelamin = request.input('jenis_kelamin')
    const photo_path = request.file('gambar', {
      size: '2mb',
      extnames: ['jpg', 'png', 'gif'],
    })!


    try {
      await photo_path.moveToDisk('photo_staff')
      await Karyawan.create({
        users_id: auth.use('web').user!.id,
        jabatan_id: id_jabatan,
        mata_pelajaran_id: id_matapelajaran,
        nama_depan: nama_depan,
        nama_belakang: nama_belakang,
        jenis_kelamin: jenis_kelamin,
        photo_path: photo_path.fileName,
      })
      session.flash('success','Data Karyawan Berhasil Ditambah!')
      response.redirect().back()
    } catch (e) {
      session.flash('error',e.message)
      response.redirect().back()
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({ view, request, session, response, auth }: HttpContextContract) {
    const user = await User.findOrFail(auth.use('web').user!.id)
    const id = request.param('id')
    
    try {
      const karyawan = await Database
                      .from('karyawan')
                      .select('karyawan.id as k_id','karyawan.nama_depan','karyawan.nama_belakang','karyawan.jenis_kelamin','jabatan.id as j_id','mata_pelajarans.id as m_id','jabatan.nama_jabatan','mata_pelajarans.nama_pelajaran')
                      .innerJoin('jabatan','karyawan.jabatan_id','jabatan.id')
                      .innerJoin('mata_pelajarans','karyawan.mata_pelajaran_id','mata_pelajarans.id')
                      .where('karyawan.id',id).firstOrFail()
      const data_jabatan = await Jabatan.all()
      const data_pelajaran = await MataPelajaran.all()
      return view.render('admin/pages/karyawan_edit', {user: user, data: karyawan, data_jabatan: data_jabatan, data_pelajaran: data_pelajaran})
    } catch(e) {
      console.log(e)
      session.flash('errors', e)
      //return response.json(e)
      return response.redirect().back()
    }

  }

  public async update({ request, response, session}: HttpContextContract) {
    const id = request.input('id')
    const id_jabatan = request.input('id_jabatan')
    const id_matapelajaran = request.input('id_matapelajaran')
    const nama_depan = request.input('nama_depan')
    const nama_belakang = request.input('nama_belakang')
    const jenis_kelamin = request.input('jenis_kelamin')
    const photo_path = request.file('gambar', {
      size: '25mb',
      extnames: ['jpg', 'png', 'gif'],
    })!

    try {
      if (photo_path) {
        await photo_path.moveToDisk('photo_staff')
        const karyawan = await Karyawan.findOrFail(id)
        console.log(karyawan)

        karyawan.jabatan_id = id_jabatan
        karyawan.mata_pelajaran_id = id_matapelajaran
        karyawan.nama_depan = nama_depan
        karyawan.nama_belakang = nama_belakang
        karyawan.jenis_kelamin = jenis_kelamin
        karyawan.photo_path = photo_path.fileName!

        await karyawan.save()

        session.flash('success', "Data berhasil diubah")
        return response.redirect().back()
      } else {
        const karyawan = await Karyawan.findOrFail(id)

        karyawan.jabatan_id = id_jabatan
        karyawan.mata_pelajaran_id = id_matapelajaran
        karyawan.nama_depan = nama_depan
        karyawan.nama_belakang = nama_belakang
        karyawan.jenis_kelamin = jenis_kelamin

        await karyawan.save()

        session.flash('success', "Data berhasil diubah")
        return response.redirect().back()
      }
      
    } catch(e) {
      console.log(e)
      session.flash('errors', "Data tidak berhasil diubah")
      return response.redirect().back()
    }
  }

  public async destroy({ request, session, response}: HttpContextContract) {    
    const id = request.input('id')
    try {
      const subjects = await Karyawan.findOrFail(id)
      await subjects.delete()

      session.flash('success', "Data berhasil dihapus")
      return response.redirect().back()
    } catch(e) {
      session.flash('errors', e)
      return response.redirect().back()
    }
  }

}
