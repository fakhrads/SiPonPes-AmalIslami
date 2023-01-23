import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Role {
  // .middleware(['auth', 'role:admin'])
  public async handle({ response, auth, session }: HttpContextContract, next: () => Promise<void>) {
    await auth.use('web').authenticate()
    if(auth.use('web').user!.level == "Operator") {
        await next()
      } else {
        session.flash({error: 'Anda tidak memiliki akses!'})
        response.redirect().back()
    }

    // code for middleware goes here. ABOVE THE NEXT CALL
    await next()
  }
}