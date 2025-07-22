
import NotFoundError from "../shared/errors/not-found-error.js";
import User from "./user.model.js";
export default class MongoUsersRepository{

    async add(user) {    
       const u = new User(user);
       await u.save();
    }

    async getAll(){
       let users = await User.find();
       return users;
    }

    async getById(id){
        let user =await User.findById(id);
        return user;
    }

    async updateWhole(id,updatedData){
        let user =await User.findByIdAndUpdate(id,updatedData);
        if (!user) throw new NotFoundError('User not found!');

    }

    async updatePart(id,updates){
      await this.updateWhole(id,updates);
    }

    async delete(id){
        let user =await User.findByIdAndDelete(id);
        if (!user) throw new NotFoundError('User not found!');

    }
}
