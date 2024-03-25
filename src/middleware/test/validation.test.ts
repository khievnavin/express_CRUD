import { Request, Response } from "express";
import   useSchema from "../../schemas/useSchema"
import { validateUserData } from "../movieValidation";
import InvalidInputError from "../invalidinput";

// import validateInput from "../validate-input";
// import InvalidInputError from "../../errors/invalid-input-error";

describe("validateInput middleware", () => {
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeAll(() => {
    res = {};
  });

  beforeEach(() => {
    next = jest.fn();
  });

  test("should pass validation and call next() for valid input", async () => {
    res = {};
    next = jest.fn();

    const req: Partial<Request> = {
      body: {
       name: "Titanic",
       released_on: "12-03-2024"
      },
    };
    await validateUserData(useSchema)(req as Request, res as Response,next);
  
    expect(next).toHaveBeenCalledTimes(1); // Ensure that next is called exactly once
  });

  test("should call next() with an InvalidInputError for invalid input", async () => {
    res = {};
    next = jest.fn();
    const req = {
      body: {
        name: "so",
        released_on: "12-03-2024"
      },
    }; // Provide invalid data for your testSchema

    await validateUserData(useSchema)(req as Request, res as Response,next);

    expect(next).toHaveBeenCalledTimes(1);
  });
});