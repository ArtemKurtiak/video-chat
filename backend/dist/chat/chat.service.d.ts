import { Repository } from 'typeorm';
import { User } from '../auth/entities';
import { GetChatsArgs } from './dto/args';
import { Message } from './entities';
export declare class ChatService {
    private userRepository;
    private messageRepository;
    constructor(userRepository: Repository<User>, messageRepository: Repository<Message>);
    getChats(dto: GetChatsArgs): Promise<{
        lastMessage: Message;
        id: number;
        title: string;
        description: string;
        users: User[];
    }[]>;
    getMessagesByChat(chatId: number): Promise<Message[]>;
}
