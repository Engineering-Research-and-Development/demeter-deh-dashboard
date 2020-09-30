export class Account {
    constructor(
        public id?: string,
        public email?: string,
        public username?: string,
        public tokenExpiration?: number,
        public token?: string,
        public roles?: string[],
    ) { }
}
