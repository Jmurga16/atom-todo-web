import { User } from "./user.interface";

export interface UserSearchResponse {
    userExists: boolean;
    user?: User;
}