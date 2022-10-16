import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as hbs from 'hbs';

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        return next.handle().pipe(
            tap((proc_time) => {
                const res = context.switchToHttp().getResponse();
                proc_time = Date.now() - now;
                const ms = randomIntFromInterval(1, 500);
                proc_time = proc_time + ms;
                res.header('Proc', proc_time);
                hbs.registerHelper('processing-time', function () {
                    return proc_time;
                });
            }),
        );
    }
}