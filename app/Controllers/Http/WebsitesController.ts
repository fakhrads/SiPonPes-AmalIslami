import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Event from 'App/Models/Event'
import Prestasi from 'App/Models/Prestasi'
import Website from 'App/Models/Website'
export default class WebsitesController {

  public async index({ view }: HttpContextContract) {
    const data = await Website.findOrFail(1)
    const data_blog = await Database
                      .from('blogs')
                      .select('blogs.id','blogs.photo_path','blogs.judul','blogs.content','blogs.created_at','blog_categories.category_name')
                      .innerJoin('blog_categories','blogs.category_id','blog_categories.id')
                      .limit(4)
    return view.render('home/welcome', { data: data, data_blog: data_blog })
  }

  public async gallery({ view }: HttpContextContract) {
    const data_gallery = await Database
                                .from('galleries')
                                .select('*')
                                .orderBy('id','asc')

    return view.render('home/gallery', { data: data_gallery})
  }

  public async blog({ view }: HttpContextContract) {
    const data_blog = await Database
                      .from('blogs')
                      .select('blogs.id','blogs.photo_path','blogs.judul','blogs.content','blogs.created_at','blog_categories.category_name')
                      .innerJoin('blog_categories','blogs.category_id','blog_categories.id')

    return view.render('home/blog', {data_blog: data_blog})
  }

  public async blogPreview({ view, request }: HttpContextContract) {
    const id = request.param('id')
    const data_blog = await Database
        .from('blogs')
        .select('blogs.id','blogs.photo_path','blogs.judul','blogs.content','blogs.created_at','blog_categories.category_name')
        .innerJoin('blog_categories','blogs.category_id','blog_categories.id')
        .where('blogs.id',id)
        .firstOrFail()

    return view.render('home/blog_p', { data: data_blog })
  }

  public async visi({ view }: HttpContextContract) {
    const data = await Website.findOrFail(1)
    return view.render('home/visi', { data: data })
  }

  public async sejarah({ view }: HttpContextContract) {
    const data = Website.find(1)
    return view.render('home/sejarah', { data: data })
  }

  public async kalender({ view }: HttpContextContract) {
    const data_kalender = await Event.query().limit(5)
    return view.render('home/kalender', { data: data_kalender })
  }

  public async prestasi({ view }: HttpContextContract) {
    const data_prestasi = await Prestasi.all()
    return view.render('home/prestasi', { data: data_prestasi })
  }

  public async struktur({ view }: HttpContextContract) {
    return view.render('home/struktur_yayasan')
  }

  public async staff({ view }: HttpContextContract) {
    const data = await Database
          .from('karyawan')
          .select('karyawan.photo_path','karyawan.id','karyawan.nama_depan','karyawan.nama_belakang','karyawan.jenis_kelamin','jabatan.nama_jabatan','mata_pelajarans.nama_pelajaran')
          .innerJoin('jabatan','karyawan.jabatan_id','jabatan.id')
          .innerJoin('mata_pelajarans','karyawan.mata_pelajaran_id','mata_pelajarans.id')

    return view.render('home/staff', {data: data})
  }
}
