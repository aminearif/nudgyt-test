import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserInput: CreateUserInput): User;
    findAll(): [User];
    findOne(id: number): User;
    updateUser(updateUserInput: UpdateUserInput): User;
    removeUser(id: number): User;
}
