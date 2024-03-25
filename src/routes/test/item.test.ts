import request from "supertest";
import  app  from "../../App";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { ConnectOptions } from "mongoose";
import { movieRouter } from "../movie.route";
import { MovieRepo } from "../../repositories/movieRepo";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri(); // Now get the URI
  await mongoose.connect(await mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
});


describe("GET /movie", () => {

  let movie: MovieRepo;

  beforeEach(() => {
    const movie = new MovieRepo();
  }),

    

    describe("POST /movie", () => {
        let movieId: string;

        it("respond with JSON message", async () => {
            const response = await request(app).post("/movie").send({
                name: "Name_of_Movie_Upload",
                released_on: "02-07-2025",
            },
            ).expect(201);
        movieId = response.body._id;
         expect(response.body).toBeDefined();
         expect(response.body.name).toEqual("Name_of_Movie_Upload");
         expect(response.body.released_on).toEqual("02-07-2025")

        //  expect(response.body.data).toBeDefined()
        });
      
        it("should be respond movies data", async () => {
          const response = await request(app).get("/movie").expect(200);
          
          
          expect(response.body).toBeDefined()
          expect(response.body.message).toEqual("Movies list found!!!")
       
      });

        it ("should be respond a movie by using specified id", async () =>{
           const MOCK_MOVIE = { name: "Name_of_Movie_Upload", released_on: "02-07-2025"}
          const response = await request(app).get(`/movie/${movieId}`).expect(200);``
          
          expect(response.body).toBeDefined();
          expect(response.body.message).toEqual("Movie found!!!");
          expect(response.body.data.name).toEqual(MOCK_MOVIE.name)
          expect(response.body.data.released_on).toEqual(MOCK_MOVIE.released_on)

        })
    });
});


afterAll(async () => {
  // await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  await mongoServer.stop();
});

 //----------------------------------------------------------------------------------------


