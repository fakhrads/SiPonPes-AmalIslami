import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BlogCategory from 'App/Models/BlogCategory'

export default class BlogCategoriesController {
  public async index({ view }: HttpContextContract) {
    const data = await BlogCategory.all()
    return view.render('admin/pages/blog_category', {data: data})
  }

  public async create({ view }: HttpContextContract) {
    return view.render('admin/pages/blog_category_new')
  }

  public async store({ request, session, response}: HttpContextContract) {
    const name = request.input('nama')


    try {
      await BlogCategory.create({
        category_name: name
      })
      session.flash('success', 'Data kategori blog berhasil ditambah')
      return response.redirect().back()
    } catch(e) {
      session.flash('error', e.message)
      return response.redirect().back()
    }
  }

  public async edit({ request, view, session, response }: HttpContextContract) {
    const id = request.param('category_id')

    try {
      const category = await BlogCategory.query().where('id',id).firstOrFail()
      return view.render('admin/pages/blog_category_edit', { data: category })
    } catch(e) {
      session.flash('errors', e)
      //return response.json(e)
      return response.redirect().back()
    }

  }

  public async update({ request, session, response }: HttpContextContract) {
    const id = request.input('id')
    const category_name = request.input('category_name')

    try {
      const category = await BlogCategory.findOrFail(id)

      category.category_name = category_name

      await category.save()

      session.flash('success', "Data kategori berhasil diubah")
      return response.redirect().back()
    } catch(e) {
      session.flash('errors', "Data kategori tidak berhasil diubah")
      return response.redirect().back()
    }
  }

  public async destroy({ request, session, response}: HttpContextContract) {
    const category_id = request.input('category_id')
    try {
      const category = await BlogCategory.findOrFail(category_id)
      await category.delete()
      
      session.flash('success', "Data berhasil dihapus")
      return response.redirect().back()
    } catch(e) {
      session.flash('errors', e)
      return response.redirect().back()
    }
  }
}
