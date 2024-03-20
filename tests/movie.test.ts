import  request  from "supertest";
import {app} from "../src/App"

describe("Test the app", () => {
    it("Test the app", async () => {
        await request(app).get("/movie").expect(200);
    });
});
