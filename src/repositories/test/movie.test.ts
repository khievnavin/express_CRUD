import { MongoMemoryServer } from "mongodb-memory-server";
import { MovieRepo } from "../movieRepo";
import mongoose from "mongoose";

let mongoServer: MongoMemoryServer;

//connect to Mongo
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri(); // Now get the URI
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Movie Integration Test", () => {
  let movieRepo: MovieRepo;

  beforeEach(() => {
    movieRepo = new MovieRepo();
  });

  it("creates a new MovieRepo", async () => {
    const movieData = {
      name: "Movie",
      released_on: "25-12-2024",
    };

    const newMovie = await movieRepo.createforMovie(movieData);

    expect(newMovie.name).toBeDefined();
    expect(newMovie.name).toBe(movieData.name);
    expect(newMovie.released_on).toBe(movieData.released_on);
    console.log(newMovie.body);
  });

  it("Get Movies", async () => {
    const movieData = [{ name: "Movie", released_on: "25-12-2024" }];
    await Promise.all(
      movieData.map(async (Movie) => {
        await movieRepo.createforMovie(Movie);
      })
    );

    const response = await movieRepo.getAllMovie({ page: 1, limit: 10 });

    const allMovies = response.movies;

    expect(allMovies.length).toEqual(2);
    expect(allMovies[0].name).toEqual(movieData[0].name);
    expect(allMovies[0].released_on).toEqual(movieData[0].released_on);
  });

  it("Update Movie", async () => {
    const movieData = {
      name: "Movie",
      released_on: "15-11-2024",
    };
    const newMovie = await movieRepo.createforMovie(movieData);
    const updateMovie = {
      ...movieData,
      name: "Movie",
    };
    const updatedMovie = await movieRepo.updateMovieID(
      newMovie._id.toString(),
      updateMovie
    );
    expect(updatedMovie).toBeDefined();
    expect(updateMovie?.name).toEqual(updatedMovie.name);
  });
});
