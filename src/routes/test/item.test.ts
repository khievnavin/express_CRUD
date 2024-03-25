import request from "supertest";
import { app } from "../../App";
// import { afterEach, beforeAll, describe } from "node:test"; // Make sure you're importing correctly
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { ConnectOptions } from "mongoose";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri(); // Now get the URI
  await mongoose.createConnection(await mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
});



describe("GET /movie", () => {
    it("respond with JSON message", async () => {
        const response = await request(app).get("/movie");
        // expect(response.body.statusCode).toBe(200);
        console.log(response.body)
        // expect(response.body.message).toEqual("Movie Upload successfully");
    });

    describe("POST /movie", () => {
        it("respond with JSON message", async () => {
            const response = await request(app).post("/movie").send({
                name: "Name_of_Movie",
                released_on: "02-07-2025",
            });
         console.log(response.body);
        });

    });
});


afterAll(async () => {
  // await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  await mongoServer.stop();
});

 //----------------------------------------------------------------------------------------


