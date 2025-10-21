import { User } from "./user.interface";

export interface UserSearchResponse {
    exists: boolean;
    user?: User;
}