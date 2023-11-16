import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor (private readonly jwtService: JwtService) {}
     use(req: Request , res:Response, next: NextFunction) {

        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
           return res.status(401).json({ message: 'Unauthorized - Token not provided' });
        }

    try {
      // Verify the JWT token
      const decoded = this.jwtService.verify(token);

      // Attach the decoded user information to the request for later use in controllers
      req['user'] = decoded;
 console.log(req);
      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      // If token verification fails, send a response indicating unauthorized access
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
     }
}