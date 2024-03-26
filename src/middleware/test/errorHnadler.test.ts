import {Request, Response, NextFunction} from 'express'
import errorhandler from '../errorHandler'
import { BaseCustomError } from '../../utils/conts/BaseError';

describe('errorHandler', () => {
   
    it('should handle BaseCustomError and send appropriate response', () => {
      // Creating a mock BaseCustomError instance with a message and status code
      const mockError = new BaseCustomError('Test error', 404);
      
      
      const mockRequest = {} as Request;
      const mockResponse = {
        status: jest.fn().mockReturnThis(), // Mocking the status method of response
        json: jest.fn(), // Mocking the json method of response
      } as unknown as Response;
      const mockNext = jest.fn() as NextFunction; // Mocking the NextFunction
  
      // Calling the errorHandler function with the mock objects
      errorhandler(mockError, mockRequest, mockResponse, mockNext);
  
      // Asserting that the status and json methods of response were called with the expected arguments
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        statusCode: 404,
        message: 'Test error',
      });
      expect(mockNext).toHaveBeenCalled(); // Asserting that next() was not called
    });
  
  
    it('should call next if error is not an instance of BaseCustomError', () => {
      // Creating a regular Error instance
      const mockError = new Error('Test error');
      const mockRequest = {} as Request; 
      const mockResponse = {} as Response; 
      const mockNext = jest.fn() as NextFunction; 
  
      // Calling the errorHandler function with the mock objects
      errorhandler(mockError, mockRequest, mockResponse, mockNext);
  
      // next for error has call
      expect(mockNext).toHaveBeenCalled();
    });
  });