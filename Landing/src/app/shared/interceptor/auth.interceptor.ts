import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import {UserService} from '../services/user.service';
import {TokenOutput} from '../models/user.model';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    isRefreshing = false;
    refreshTokenSubject = new BehaviorSubject<string>(null);
    userService: UserService;

    constructor(private injector: Injector, private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!this.userService) {
            this.userService = this.injector.get(UserService);
        }

        const user = this.userService.getLocalUser();


        return next.handle(this.addHeaders(req));
    }

    addHeaders(req: HttpRequest<any>) {
        return req.clone({
            headers: req.headers
                .set('Authorization', this.userService.getToken())
        });
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
}
