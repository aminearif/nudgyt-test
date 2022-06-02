import { AuthService } from '../auth/auth.service';
import { UsersService } from '../services/users.service';
export declare class UserController {
    private userService;
    private authService;
    constructor(userService: UsersService, authService: AuthService);
    list(): Promise<(import("../types/user").UserType & {
        _id: any;
    })[]>;
}
