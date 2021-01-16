'use strict'
const User = use("App/Models/User");

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class UserSeeder {
  async run () {

    //create user admin
    await User.create({
      email :'test@test.com',
      password:'test',
      username: 'test@test.com',
      is_admin: 1,
    });

    //create regular user
    await User.create({
      email :'test1@test.com',
      password:'test',
      username: 'test1@test.com',
      is_admin: 0,
    });
  }
}

module.exports = UserSeeder
