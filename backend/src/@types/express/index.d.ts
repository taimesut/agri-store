import { IJwtPayload } from 'src/utils/interfaces';

declare global {
  namespace Express {
    interface Request {
      user?: IJwtPayload;
    }
  }
}

export {};
