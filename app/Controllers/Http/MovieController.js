"use strict";

const Movie = use("App/Models/Movie");
const Database = use('Database')

class MovieController {


    async index({request, response}){
        
        const {
            page,
            perPage,
            keyword
        } = request.all();
        
        let data = null

        if(keyword === null){
             data = await Database.table('movies').select('*').orderBy('created_at', 'desc').paginate(page,perPage)
        }else{
            data = await Database.table('movies').select('*').where('title', 'LIKE', '%'+keyword+'%')
            .orWhere('description', 'LIKE', '%'+keyword+'%')
            .orWhere('artists', 'LIKE', '%'+keyword+'%')
            .orWhere('genres', 'LIKE', '%'+keyword+'%')
            .orderBy('created_at', 'desc').paginate(page,perPage)
        }
            
        return response.status(200).send({
            status: "success",
            code: 200,
            data
        });
    }
    
    /***
     * Create movie method
     *
     * @param title title of the movie
     * @param description description of movie
     * @param artists list of artist
     * @param genres genres of movie
     * @param duration duration of the movie
     * @param watch_url watch_url movie
     *
     */
    
    async create({ auth, request, response }) {

        try {
            const check = await auth.check();

            if (check) {
                const user = await auth.getUser();

                if (user.is_admin) {

                    const {
                        title,
                        description,
                        artists,
                        genres,
                        watch_url,
                        duration
                    } = request.all();

                    if (title === "") {
                        return response.status(400).send({
                            status: "error",
                            code: 400,
                            data: {
                                field: "title",
                                message: "Title is empty",
                            },
                        });
                    }

                    const movie = await Movie.create({
                        title: title,
                        description: description,
                        artists: artists,
                        genres: genres,
                        watch_url: watch_url,
                        duration: duration,
                        viewcount: 0,
                    });

                    return response.status(200).send({
                        status: "success",
                        code: 200,
                        message: "Movie successfuly created",
                        data: movie,
                    });
                } else {
                    return response.status(401).send({
                        status: "error",
                        code: 401,
                        message: "unauthorize action",
                    });
                }
            }
        } catch (error) {
            return response.status(503).send({
                status: "error",
                code: 503,
                message: "invalid jwt token",
            });
        }
    }

    /***
     * Update movie method
     *
     * @param id  id of the movie
     * @param title title of the movie
     * @param description description of movie
     * @param artists list of artist
     * @param genres genres of movie
     * @param duration duration of the movie
     * @param watch_url watch_url movie
     * @param viewcount viewcount of the movie
     *
     */

    async update({ auth, params, request, response }) {
        const check = await auth.check();

        try {
            const check = await auth.check();

            if (check) {
                const user = await auth.getUser();

                if (user.is_admin) {

                    let { title, description, artists, genres, watch_url, duration, viewcount } = request.all();

                    if (title === "" || title === null) {
                        return response.status(400).send({
                            status: "error",
                            code: 400,
                            data: {
                                field: "title",
                                message: "Title is empty",
                            },
                        });
                    }



                    const movie = await Movie.find(params.id)
                    if (movie) {

                        if (viewcount == null) {
                            viewcount = movie.viewcount
                        }

                        movie.merge({ title, description, artists, genres, watch_url, duration, viewcount })
                        await movie.save()

                        return response.status(200).send({
                            status: "success",
                            code: 200,
                            message: "Movie successfuly updated",
                            data: movie,
                        });

                    } else {
                        return response.status(404).send({
                            status: "error",
                            code: 404,
                            message: "movie not found",
                        });
                    }
                }

            } else {
                return response.status(401).send({
                    status: "error",
                    code: 401,
                    message: "unauthorize action",
                });
            }
        } catch (error) {
            return response.status(503).send({
                status: "error",
                code: 503,
                message: "invalid jwt token ",
            });
        }
    }

    async mostViewed({ request, response }){
        let { type } = request.all();

        if(type !== 'movie' && type !== 'genre'){
            return response.status(400).send({
                status: "error",
                code: 400,
                message: "please specify type either movie or genre",
            });
        }
        
        if(type === 'genre'){
            //SELECT SUM(viewcount) as counter, genres FROM `movies` GROUP BY genres order by counter DESC 
            const movie = await Database.table('movies').sum("viewcount as view_count").select('genres as genre').groupBy('genres').orderBy('view_count', 'desc').first()
            if(movie !== null ){
                return response.status(200).send({
                    status: "success",
                    code: 200,
                    data: movie
                });   
            }else{
                return response.status(200).send({
                    status: "success",
                    code: 200,
                    data:{}
                });  
            }
        }

        if(type === 'movie'){
            const movie = await Database.table('movies').select('*').orderBy('viewcount', 'desc').first()
            if(movie !== null ){
                return response.status(200).send({
                    status: "success",
                    code: 200,
                    data: movie
                });   
            }else{
                return response.status(200).send({
                    status: "success",
                    code: 200,
                    data:[]
                });
            }
        }
        
    }

}

module.exports = MovieController;
