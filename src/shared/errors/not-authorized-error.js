export default class NotAuthorizedError extends Error{
    constructor(message){
        super();
        this.message = message;
        this.http_code = 403;
    }
}