'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')


Route.group(() => {
    Route.post('auth/register', 'UserController.register')
    Route.post('auth/create', 'UserController.create')
    Route.post('auth/login', 'UserController.login')
    Route.post('auth/logout', 'UserController.logout').middleware('auth')
    Route.get('auth/current', 'UserController.current').middleware('auth')


    Route.get('movies', 'MovieController.index') //.middleware('auth')
    Route.get('movies/most', 'MovieController.mostViewed').middleware('auth')
    Route.post('movies', 'MovieController.create').middleware('auth')
    Route.put('movies/:id', 'MovieController.update').middleware('auth')
    
  }).prefix('api');
