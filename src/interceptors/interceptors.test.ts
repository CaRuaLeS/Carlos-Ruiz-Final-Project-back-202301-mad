import { NextFunction, Response } from 'express';
import { Auth } from '../services/auth';
import { ExtraRequest } from '../services/extra-request';
import { Interceptors } from './interceptors';

jest.mock('../services/auth');

describe('Given the interceptors class (LOGGED)', () => {
  const mockReq = {
    get: jest.fn(),
  } as unknown as ExtraRequest;

  const resp = {} as Response;

  const next = jest.fn() as unknown as NextFunction;

  describe('when !authHeaderInfo', () => {
    (mockReq.get as jest.Mock).mockReturnValue(undefined);
    test('then it should call next error', () => {
      Interceptors.logged(mockReq, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('when authHeaderInfo not start with Bearer', () => {
    test('then it should call next error', () => {
      (mockReq.get as jest.Mock).mockReturnValue('Bear');
      Interceptors.logged(mockReq, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('when authHeaderInfo is Ok', () => {
    test('then it should call the next function passing by the Auth verification', () => {
      (mockReq.get as jest.Mock).mockReturnValue('Bearer testToken');
      Interceptors.logged(mockReq, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
