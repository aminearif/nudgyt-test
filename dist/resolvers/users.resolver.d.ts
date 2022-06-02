/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indizes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose" />
import { UsersService } from '../services/users.service';
import { CreateUserInput } from '../models/dto/create-user.input';
import { AuthService } from '../auth/auth.service';
import { LoginInput } from '../types/gql.login';
export declare class UsersResolver {
    private readonly userService;
    private authService;
    constructor(userService: UsersService, authService: AuthService);
    createUser(createUserInput: CreateUserInput): Promise<Omit<import("mongoose")._LeanDocument<any>, "save" | "validate" | "remove" | "$getAllSubdocs" | "$ignore" | "$isDefault" | "$isDeleted" | "$getPopulatedDocs" | "$isEmpty" | "$isValid" | "$locals" | "$markValid" | "$model" | "$op" | "$session" | "$set" | "$where" | "baseModelName" | "collection" | "db" | "delete" | "deleteOne" | "depopulate" | "directModifiedPaths" | "equals" | "errors" | "get" | "getChanges" | "increment" | "init" | "invalidate" | "isDirectModified" | "isDirectSelected" | "isInit" | "isModified" | "isNew" | "isSelected" | "markModified" | "modifiedPaths" | "modelName" | "overwrite" | "$parent" | "populate" | "populated" | "replaceOne" | "schema" | "set" | "toJSON" | "toObject" | "unmarkModified" | "update" | "updateOne" | "validateSync" | "$isSingleNested"> & {
        _id: any;
    }>;
    register(createUserInput: CreateUserInput): Promise<{
        token: Promise<string>;
    }>;
    login(loginInput: LoginInput): Promise<{
        token: Promise<string>;
    }>;
    findAll(): Promise<(import("../types/user").UserType & {
        _id: any;
    })[]>;
}
