import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'WebsitesController.index').as('default')
Route.get('/galeri', 'WebsitesController.gallery').as('gallery')
Route.get('/berita', 'WebsitesController.blog').as('blogs')
Route.get('/berita/:id', 'WebsitesController.blogPreview').as('blogsP')
Route.get('/sejarah', 'WebsitesController.sejarah').as('sejarah')
Route.get('/visi', 'WebsitesController.visi').as('visi')
Route.get('/pendidik', 'WebsitesController.staff').as('staff')
Route.get('/kalender', 'WebsitesController.kalender').as('kalender')
Route.get('/prestasi', 'WebsitesController.prestasi').as('prestasi')
Route.get('/struktur', 'WebsitesController.struktur').as('struktur')

