import { Payload } from '../types/payload';
import { UsersService } from '../services/users.service';
export declare class AuthService {
    private userService;
    constructor(userService: UsersService);
    signPayload(payload: Payload): Promise<string>;
    validateUser(payload: Payload): Promise<import("../types/user").UserType & {
        _id: any;
    }>;
}
