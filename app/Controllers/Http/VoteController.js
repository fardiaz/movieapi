'use strict'

const Movie = use("App/Models/Movie");
const Vote = use("App/Models/Vote");
const Database = use('Database')


class VoteController {

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
