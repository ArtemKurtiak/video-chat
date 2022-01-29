import { ChatService } from './chat.service';
import { User } from '../auth/entities';
import { GetChatsArgs, GetMessagesArgs } from './dto/args';
export declare class ChatResolver {
    private chatService;
    constructor(chatService: ChatService);
    getChats(args: GetChatsArgs): Promise<{
        lastMessage: import("./entities").Message;
        id: number;
        title: string;
        description: string;
        users: User[];
    }[]>;
    getMessages(args: GetMessagesArgs): Promise<import("./entities").Message[]>;
}
