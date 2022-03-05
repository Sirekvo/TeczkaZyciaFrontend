export class AccountOutput {
    name: string;
    lastName: string;
    email: string;

    constructor(public _name: string, public _lastName: string, public _email: string ) {
        this.name = _name
        this.lastName = _lastName;
        this.email = _email;
    }
}
