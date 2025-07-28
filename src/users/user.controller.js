
import bcrypt from 'bcrypt';
import NotFoundError from '../shared/errors/not-found-error.js';

export async function addUser(request,response){
    
    request.user.password =await bcrypt.hash(request.user.password,10)
    await request.usersRepository.add(request.user) ;
     
    response.sendStatus(200);
}

export async function getAllUsers(request,response){
    const users = await request.usersRepository.getAll();
    response.json(users.map(u=> ({
        id: u._id,
        fullName: u.fullName,
        email: u.email,
        password: u.password,
        balance: u.balance  
    })));
}
 
export async function getUserById(request,response){
    const id = request.params.id;

    const user =await request.usersRepository.getById(id);

    if(!user) return response.sendStatus(404);
    response.json({
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        password: user.password,
        balance: user.balance  
    });
}

export async function getCurrentBalance(request, response, next) {
    const id = request.params.id;
    
    const user =await request.usersRepository.getById(id);

    if(!user) return response.sendStatus(404);
    response.json({
        balance: user.balance  
    });
}


export async function updateWholeUser(request,response){
        const id = request.params.id;
        const updatedData = request.body;
        await request.usersRepository.updateWhole(id,updatedData);
        response.sendStatus(200);
}

export async function updatePartUser(request,response){

    const id = request.params.id;

    const updates = request.body;
    await request.usersRepository.updatePart(id,updates);

    response.sendStatus(200);
}

export async function deleteUser(request,response){

    const id = request.params.id;

    await request.usersRepository.delete(id);

    response.sendStatus(200);
}
