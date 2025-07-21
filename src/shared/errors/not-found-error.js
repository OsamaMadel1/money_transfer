export default class NotFoundError extends Error{
    constructor(message){
        super();
        this.message = message;
        this.http_code = 404;
    }
}