import { Repository } from 'typeorm';
import { User } from '../auth/entities';
import { GetChatsArgs } from './dto/args';
import { Chat, Message } from './entities';
export declare class ChatService {
    private userRepository;
    private messageRepository;
    private chatRepository;
    constructor(userRepository: Repository<User>, messageRepository: Repository<Message>, chatRepository: Repository<Chat>);
    getChats(dto: GetChatsArgs): Promise<{
        lastMessage: Message;
        id: number;
        title: string;
        description: string;
        users: User[];
    }[]>;
    getMessagesByChat(chatId: number): Promise<{
        messages: Message[];
        id: number;
        title: string;
        description: string;
        users: User[];
    }>;
}
