import MongoTransferRepository from "../transfer/transfer.repository.js";
import MongoUsersRepository from "../users/user.repository.js";

export default function settingsRepositoryMiddlewares(request,response,next){
    request.usersRepository = new MongoUsersRepository(); 
    request.transfersRepository = new MongoTransferRepository();

    next();
}