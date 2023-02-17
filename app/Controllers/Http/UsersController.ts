import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class UsersController {
  public async index({ view, auth, response}: HttpContextContract) {
    await auth.use('web').authenticate()
    
    if (auth.use('web').isAuthenticated == true) {
      response.redirect().back()
    } else {
      return view.render('admin/pages/auth/login')
    }

  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async logout({ response, auth }: HttpContextContract) {
    await auth.use('web').logout()
    response.redirect('/admin/login')
  }

  public async login({ auth, request, response, session }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
  
    try {
      await auth.use('web').attempt(email, password)
      response.redirect('/admin/dashboard')
    } catch(e) {
      session.flash('error', e.message)
      return response.redirect().back()
    }

  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
