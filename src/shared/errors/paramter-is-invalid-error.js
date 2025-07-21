export default class ParamterIsInvalidError extends Error{
    constructor(message){
        super();
        this.message = message;
        this.http_code = 401;

    }
}