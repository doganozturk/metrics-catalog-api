import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ParseBeaconRequestInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        try {
            request.body = JSON.parse(request.body);
        } catch (err) {
            return throwError(new BadRequestException());
        }

        return next.handle();
    }
}
