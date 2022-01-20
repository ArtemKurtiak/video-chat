import { Chat } from '../../chat/entities';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    password: string;
    chats: Chat[];
}
