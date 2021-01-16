'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MoviesSchema extends Schema {
  up () {
    this.create('movies', (table) => {
      table.increments()
      table.timestamps()
      table.string('title',255).notNullable()
      table.text('description','mediumtext')
      table.text('artists','longtext')
      table.integer('duration').defaultTo(0)
      table.string('genres',80)
      table.string('watch_url', 255)
      table.integer('viewcount').defaultTo(0)

    })
  }

  down () {
    this.drop('movies')
  }
}

module.exports = MoviesSchema
