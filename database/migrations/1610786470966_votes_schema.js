'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VotesSchema extends Schema {
  up () {
    this.create('votes', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id').notNullable()
      table.integer('movie_id').notNullable()
    })
  }

  down () {
    this.drop('votes')
  }
}

module.exports = VotesSchema
