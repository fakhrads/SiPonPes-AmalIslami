import Route from '@ioc:Adonis/Core/Route'

Route
  .group(() => {
    Route.get('/login', 'UsersController.index').as('admin_login')
    Route.post('/login', 'UsersController.login').as('admin_login_proccess')
    Route.get('/logout', 'UsersController.logout').as('admin_logout_proccess')
    Route.get('/dashboard', 'AdminsController.index').as('admin_dashboard').middleware('auth')

    Route.get('/website', 'AdminsController.editWebsite').as('admin_website').middleware('auth')
    Route.post('/website/update', 'AdminsController.update').as('admin_website_update').middleware('auth')

    Route.get('/prestasi', 'AchievementsController.index').as('admin_achievements').middleware('auth')
    Route.get('/prestasi/edit/:id', 'AchievementsController.edit').as('admin_achievements_edit').middleware('auth')
    Route.get('/prestasi/new', 'AchievementsController.create').as('admin_achievements_new').middleware('auth')
    Route.post('/prestasi/new', 'AchievementsController.store').as('admin_achievements_store').middleware('auth')
    Route.post('/prestasi/update', 'AchievementsController.update').as('admin_achievements_update').middleware('auth')
    Route.post('/prestasi/destroy', 'AchievementsController.destroy').as('admin_achievements_destroy').middleware('auth')

    Route.get('/karyawan', 'StaffController.index').as('admin_staff').middleware('auth')
    Route.get('/karyawan/new', 'StaffController.create').as('admin_staff_new').middleware('auth')
    Route.post('/karyawan/store', 'StaffController.store').as('admin_staff_store').middleware('auth')
    Route.get('/karyawan/edit/:nip', 'StaffController.edit').as('admin_staff_edit').middleware('auth')
    Route.post('/karyawan/delete', 'StaffController.destroy').as('admin_staff_delete').middleware('auth')

    Route.get('/blog/category/', 'BlogCategoriesController.index').as('admin_blog_category').middleware('auth')
    Route.post('/blog/category/new', 'BlogCategoriesController.store').as('admin_blog_category_store').middleware('auth')
    Route.get('/blog/category/new', 'BlogCategoriesController.create').as('admin_blog_category_create').middleware('auth')
    Route.get('/blog/category/edit/:category_id', 'BlogCategoriesController.edit').as('admin_blog_category_edit').middleware('auth')
    
    Route.get('/position', 'PositionsController.index').as('admin_position').middleware('auth')  
    Route.get('/position/new', 'PositionsController.create').as('admin_position_create').middleware('auth')    
    Route.post('/position/new/store', 'PositionsController.store').as('admin_position_store').middleware('auth')    
    Route.post('/position/delete', 'PositionsController.destroy').as('admin_position_delete').middleware('auth')    
    Route.get('/position/edit/:id', 'PositionsController.edit').as('admin_position_edit').middleware('auth')    
    Route.post('/position/edit/update', 'PositionsController.edit').as('admin_position_update').middleware('auth')    
    
    Route.get('/subjects', 'SubjectsController.index').as('admin_subjects').middleware('auth')  
    Route.get('/subjects/new', 'SubjectsController.create').as('admin_subjects_create').middleware('auth')    
    Route.post('/subjects/new/store', 'SubjectsController.store').as('admin_subjects_store').middleware('auth')    
    Route.post('/subjects/delete', 'SubjectsController.destroy').as('admin_subjects_delete').middleware('auth')    
    Route.get('/subjects/edit/:id', 'SubjectsController.edit').as('admin_subjects_edit').middleware('auth')    
    Route.post('/subjects/edit/update', 'SubjectsController.edit').as('admin_subjects_update').middleware('auth')    
    
    Route.get('/event', 'EventsController.index').as('admin_events').middleware('auth')  
    Route.get('/event/new', 'EventsController.create').as('admin_events_create').middleware('auth')    
    Route.post('/event/new/store', 'EventsController.store').as('admin_events_store').middleware('auth')    
    Route.post('/event/delete', 'EventsController.destroy').as('admin_events_delete').middleware('auth')    
    Route.get('/event/edit/:id', 'EventsController.edit').as('admin_events_edit').middleware('auth')    
    Route.post('/event/edit/update', 'EventsController.edit').as('admin_events_update').middleware('auth')    

    Route.get('/blog', 'BlogsController.index').as('admin_blog').middleware('auth')  
    Route.get('/blog/new', 'BlogsController.create').as('admin_blog_create').middleware('auth')    
    Route.post('/blog/new/store', 'BlogsController.store').as('admin_blog_store').middleware('auth')    
    Route.post('/blog/delete', 'BlogsController.destroy').as('admin_blog_delete').middleware('auth')    
    Route.get('/blog/edit/:id', 'BlogsController.edit').as('admin_blog_edit').middleware('auth')    
    Route.post('/blog/edit/update', 'BlogsController.edit').as('admin_blog_update').middleware('auth')    

    Route.get('/gallery', 'GalleriesController.index').as('admin_gallery').middleware('auth')  
    Route.get('/gallery/new', 'GalleriesController.create').as('admin_gallery_create').middleware('auth')    
    Route.post('/gallery/new/store', 'GalleriesController.store').as('admin_gallery_store').middleware('auth')    
    Route.post('/gallery/delete', 'GalleriesController.destroy').as('admin_gallery_delete').middleware('auth')    
    Route.get('/gallery/edit/:id', 'GalleriesController.edit').as('admin_gallery_edit').middleware('auth')    
    Route.post('/gallery/edit/update', 'GalleriesController.edit').as('admin_gallery_update').middleware('auth')    

  })
  .prefix('/admin')
//Route.get('/','DashboardController.index')