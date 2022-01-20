import { User } from '../../auth/entities';
export declare class Chat {
    id: number;
    title: string;
    description: string;
    users: User[];
}
