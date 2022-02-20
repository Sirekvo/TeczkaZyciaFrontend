export class TokenOutput {
    token: string;
    constructor(public _token: string) {
        this.token = _token;
        console.log(this.token);
    }
}
