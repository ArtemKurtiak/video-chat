import { User } from '../../entities';
export declare class AuthUser extends User {
    id: number;
    token: string;
    user: string;
}
