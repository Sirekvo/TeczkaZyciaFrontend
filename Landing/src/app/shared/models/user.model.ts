export class TokenOutput {
    token: string;
    firstLogin: boolean;
    constructor(public _token: string, public _firstLogin: boolean ) {
        this.token = _token;
        this.firstLogin = _firstLogin;
    }
}
