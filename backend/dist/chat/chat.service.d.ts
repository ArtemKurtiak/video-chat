import { Repository } from 'typeorm';
import { User } from '../auth/entities';
import { GetChatsArgs } from './dto/args';
export declare class ChatService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getChats(dto: GetChatsArgs): Promise<import("./entities").Chat[]>;
}
