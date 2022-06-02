import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
export declare class UsersService {
    create(createUserInput: CreateUserInput): User;
    findAll(): [User];
    findOne(id: number): User;
    update(id: number, updateUserInput: UpdateUserInput): User;
    remove(id: number): User;
}
