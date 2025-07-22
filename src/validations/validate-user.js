import ParamterIsMissingError from "../shared/errors/paramter-is-missing-error.js";

export function validateWholeUser(user) {
    if (!user.fullName) {
        throw new ParamterIsMissingError('The "fullName" parameter is missing.');
    }
    if (!user.email) {
        throw new ParamterIsMissingError('The "email" parameter is missing.');
    }
    if (!user.password) {
        throw new ParamterIsMissingError('The "password" parameter is missing.');
    }
}

export function validatePartUser(user) {
    if (!user.fullName && !user.email && !user.password) {
        throw new ParamterIsMissingError("You must send at least 'fullName' or 'email' or 'password'.");
    }

}