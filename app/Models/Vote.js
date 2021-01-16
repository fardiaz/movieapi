'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Vote extends Model {

    movies () {
        return this.hasMany('App/Models/Movie','id','movie_id')
      }
}

module.exports = Vote
