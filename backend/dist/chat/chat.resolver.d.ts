import { Chat } from './entities';
import { ChatService } from './chat.service';
import { GetChatsArgs } from './dto/args';
export declare class ChatResolver {
    private chatService;
    constructor(chatService: ChatService);
    getChats(args: GetChatsArgs): Promise<Chat[]>;
}
