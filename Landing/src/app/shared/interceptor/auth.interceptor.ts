import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {TokenOutput} from '../models/user.model';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    isRefreshing = false;

    constructor(private injector: Injector,
                private userService: UserService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!this.userService) {
            this.userService = this.injector.get(UserService);
        }

        req = req.clone({
            headers: req.headers
                .set('authorization', 'Bearer ' + this.userService.getToken())
        });
        return next.handle(req);
    }

}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
}
