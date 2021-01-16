'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VotesSchema extends Schema {
  up () {
    this.create('votes', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users')
      table.integer('movie_id').notNullable().unsigned().references('id').inTable('movies')
    })
  }

  down () {
    this.drop('votes')
  }
}

module.exports = VotesSchema
