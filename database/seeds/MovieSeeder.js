"use strict";
const Movie = use("App/Models/Movie");
/*
|--------------------------------------------------------------------------
| MovieSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class MovieSeeder {
  async run() {
    await Movie.create({
      title: "The Shawshank Redemption",
      description:
        "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency. ",
      artists: "Tim Robbins, Morgan Freeman, Bob Gunton",
      genres: "drama",
      watch_url:
        "https://www.imdb.com/title/tt0111161/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e31d89dd-322d-4646-8962-327b42fe94b1&pf_rd_r=JV8G37NBHNCM18P3TP6A&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_1",
      duration: 122,
      viewcount: 200,
    });

    await Movie.create({
      title: "The Godfather",
      description:
        "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
      artists: "Marlon Brando, Al Pacino, James Caan",
      genres: "crime",
      watch_url:
        "https://www.imdb.com/title/tt0111161/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e31d89dd-322d-4646-8962-327b42fe94b1&pf_rd_r=JV8G37NBHNCM18P3TP6A&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_1",
      duration: 315,
      viewcount: 160,
    });

    await Movie.create({
      title: "The Godfather: Part 2",
      description: "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.",
      artists: "Al Pacino, Robert De Niro, Robert Duvall",
      genres: "crime",
      watch_url:
        "https://www.imdb.com/title/tt0071562/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e31d89dd-322d-4646-8962-327b42fe94b1&pf_rd_r=D9SMCP246RWWBP5GHZY2&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_3",
      duration: 202,
      viewcount: 112,
    });

    await Movie.create({
      title: "The Dark Knight",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      artists: "Christian Bale, Heath Ledger, Aaron Eckhart",
      genres: "action",
      watch_url:
        "https://www.imdb.com/title/tt0468569/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e31d89dd-322d-4646-8962-327b42fe94b1&pf_rd_r=D9SMCP246RWWBP5GHZY2&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_4",
      duration: 212,
      viewcount: 229,
    });

    await Movie.create({
      title: "12 Angry Men",
      description: "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.",
      artists: "Henry Fonda, Lee J. Cobb, Martin Balsam",
      genres: "drama",
      watch_url:
        "https://www.imdb.com/title/tt0050083/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e31d89dd-322d-4646-8962-327b42fe94b1&pf_rd_r=D9SMCP246RWWBP5GHZY2&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_5",
      duration: 96,
      viewcount: 68,
    });



  }
}

module.exports = MovieSeeder;
