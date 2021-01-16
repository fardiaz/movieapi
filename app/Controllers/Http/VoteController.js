'use strict'

const Movie = use("App/Models/Movie");
const Vote = use("App/Models/Vote");
const Database = use('Database')


class VoteController {


    async index({  response }) {
        /*
        SELECT COUNT(g.movie_id) AS vote_count, m.*
        FROM votes AS g
        LEFT JOIN movies AS m ON g.movie_id = m.id
        GROUP BY g.movie_id
        */
        const votes = await Database.table('votes as g').count("g.movie_id as vote_count").select('m.*').leftJoin('movies as m', 'g.movie_id', 'm.id').groupBy('g.movie_id').orderBy('vote_count', 'desc')
       
        return response.status(200).send({
            status: "success",
            code: 200,
            data :votes
          });
    }   
    async vote({ auth, params, response }) {

        try {
            const check = await auth.check();

            if (check) {
                const user = await auth.getUser();
             
                const movie = await Movie.find(params.id)
              
                if (movie) {
                   await Vote.findOrCreate(
                        { user_id: user.id , movie_id: movie.id },
                        { user_id: user.id , movie_id: movie.id }
                      )
                  return response.status(200).send({
                    status: "success",
                    code: 200,
                    message: "Success Vote",
                  });
                }else{
                    return response.status(404).send({
                        status: "error",
                        message: "movie not found",
                      });
                }
            }else{
                return response.status(401).send({
                    status: "error",
                    message: "not authorize",
                  });
            }
        } catch (error) {
            return response.status(503).send({
                status: "error",
                code: 503,
                message: "invalid jwt token",
            });
        }
    
    }

    async unvote({ auth, params, response }) {

        try {
            const check = await auth.check();

            if (check) {
                const user = await auth.getUser();
             
                const movie = await Movie.find(params.id)
              
                if (movie) {
                   const vote  = await Vote.findBy(
                        { user_id: user.id , movie_id: movie.id }
                      )
                    if(vote) {
                        await vote.delete()
                        return response.status(200).send({
                            status: "success",
                            code: 200,
                            message: "Vote deleted"
                          });
                    }else{
                        return response.status(404).send({
                            status: "error",
                            message: "vote not found",
                          });
                    }
                  
                }else{
                    return response.status(404).send({
                        status: "error",
                        message: "movie not found",
                      });
                }
            }else{
                return response.status(401).send({
                    status: "error",
                    message: "not authorize",
                  });
            }
        } catch (error) {
            return response.status(503).send({
                status: "error",
                code: 503,
                message: "invalid jwt token",
            });
        }
    
    }
}

module.exports = VoteController
